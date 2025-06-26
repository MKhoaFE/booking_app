const Ticket = require("../models/ticket.model");
const trainSchedule = require("../models/trainSchedule.model");
const axios = require("axios");
const cron = require("node-cron");
const dotenv = require("dotenv");
const crypto = require("crypto");
const User = require("../models/user.model");
const redisClient = require("../utils/redisClient");

dotenv.config();
const accessKey = process.env.ACCESS_KEY_MOMO;
const secretKey = process.env.SECRECT_KEY_MOMO;

//chạy mỗi 2p để update status
cron.schedule("*/1 * * * *", async () => {
  console.log(`[Cron] Kiểm tra vé hết hạn tại ${new Date().toLocaleString()}`);
  console.log("Now:", new Date());

  const now = new Date();

  const expiredTickets = await Ticket.find({
    status: "pending",
    "paymentInfo.method": "momo",
    "paymentInfo.paymentStatus": "not yet",
    "paymentInfo.expiresAt": { $lt: now },
  });

  console.log("[Cron] Số vé hết hạn:", expiredTickets.length);
  if (expiredTickets.length > 0) {
    console.log(
      "ExpiresAt of 1 ticket:",
      expiredTickets[0]?.paymentInfo.expiresAt
    );
  }

  for (const ticket of expiredTickets) {
    const orderId = ticket.paymentInfo.transactionId;

    // Kiểm tra lại với MoMo trước khi đánh dấu thất bại
    try {
      const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
      const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

      const momoRes = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/query",
        {
          partnerCode: "MOMO",
          requestId: orderId,
          orderId: orderId,
          signature,
          lang: "vi",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const resultCode = momoRes.data.resultCode;

      if (resultCode === 0) {
        // Đã thanh toán, xác nhận vé
        ticket.status = "confirmed";
        ticket.paymentInfo.paymentStatus = "success";
        await ticket.save();

        //cập nhập bookings user
        await User.updateOne(
          { userId: ticket.userId, "bookings.ticketId": ticket._id },
          { $set: { "bookings.$.paymentStatus": "success" } }
        );
        console.log(`[Cron] Vé ${ticket.ticketId} được xác nhận từ MoMo.`);
        continue; // bỏ qua huỷ giữ chỗ
      }
    } catch (err) {
      console.error(
        `[Cron] Lỗi kiểm tra trạng thái MoMo cho ${orderId}:`,
        err.message
      );
    }

    // Nếu thực sự chưa thanh toán, tiến hành huỷ giữ chỗ
    ticket.status = "expired";
    ticket.paymentInfo.paymentStatus = "failed";
    await ticket.save();
    await User.updateOne(
      {
        userId: ticket.userId,
        "bookings.ticketId": ticket._id,
      },
      { $set: { "bookings.$.paymentStatus": "failed" } }
    );
    console.log(`[Cron] Vé ${ticket.ticketId} bị huỷ do hết hạn.`);

    const journey = await trainSchedule.findOne({
      journeyId: ticket.journeyId,
    });

    if (journey) {
      // Xoá ghế trong reservedSeats
      journey.reservedSeats = journey.reservedSeats.filter(
        (seat) => !ticket.seatNumber.includes(seat)
      );

      // Xoá dữ liệu trong seatBooked
      journey.seatBooked = journey.seatBooked.filter(
        (booking) =>
          !booking.passengerData.some((p) => ticket.seatNumber.includes(p.seat))
      );

      await journey.save();
      console.log(
        `[Cron] Đã xoá giữ chỗ vé ${ticket.ticketId} khỏi hành trình.`
      );
    }
  }

  console.log(`[Cron] Hoàn tất xử lý ${expiredTickets.length} vé hết hạn.`);
});

exports.postTicket = async (req, res) => {
  try {
    const {
      userId,
      journeyId,
      seats,
      paymentMethod,
      passengerData,
      contactData,
    } = req.body;

    // Kiểm tra đầu vào
    if (
      !userId ||
      !journeyId ||
      !Array.isArray(seats) ||
      seats.length === 0 ||
      !passengerData ||
      !contactData
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Lấy thông tin hành trình
    const journey = await trainSchedule.findOne({ journeyId });
    if (!journey) return res.status(404).json({ error: "Journey not found" });

    // Kiểm tra ghế đã bị giữ chưa (reservedSeats)
    const reserved = journey.reservedSeats || [];
    const isOccupied = seats.some((seat) => reserved.includes(seat));
    if (isOccupied) {
      return res.status(400).json({ error: "Some seats already reserved." });
    }

    // Gắn seat vào từng passenger
    if (passengerData.length !== seats.length) {
      return res
        .status(400)
        .json({ error: "Passenger and seat count mismatch." });
    }
    passengerData.forEach((p, i) => {
      p.seat = seats[i];
    });

    // Tính tổng giá vé
    let totalPrice = 0;
    for (const p of passengerData) {
      totalPrice +=
        p.type === "regular"
          ? journey.regularTicketPrice
          : journey.specialTicketPrice;
    }

    // Tạo ticketId, transactionId, expiresAt
    const ticketId = "TICKET_" + Date.now();
    const transactionId = "TXN_" + Date.now();
    const expiresAt =
      paymentMethod === "momo"
        ? new Date(Date.now() + 10 * 60 * 1000)
        : new Date(new Date(journey.departureDate).getTime() - 60 * 10 * 1000);

    // Cập nhật trainSchedule
    journey.reservedSeats.push(...seats);
    journey.seatBooked.push({
      contactData,
      passengerData,
    });
    await journey.save();

    // Tạo ticket
    const ticket = await Ticket.create({
      ticketId,
      userId,
      trainId: journey.trainId,
      journeyId: journey.journeyId,
      seatNumber: seats,
      bookingDate: new Date(),
      status: "pending",
      price: totalPrice,
      paymentInfo: {
        method: paymentMethod,
        transactionId,
        expiresAt,
      },
    });

    // Cập nhật User booking
    await User.findOneAndUpdate(
      { userId },
      {
        $push: {
          bookings: {
            paymentInfo: {
              method: paymentMethod,
              transactionId,
              expiresAt,
            },
            paymentStatus: "not yet",
            ticketId: ticket._id,
            journeyId,
            contactData,
            passengerData,
            departureDate: journey.departureDate,
            departureStation: journey.departureStation,
            arrivalStation: journey.arrivalStation,
          },
        },
      }
    );

    // Thanh toán MoMo
    if (paymentMethod === "momo") {
      const response = await axios.post(
        "http://localhost:5000/api/paymentmethod/MomoMethod",
        {
          amount: totalPrice,
          orderId: transactionId,
        }
      );
      return res.status(200).json({ ticketId, momoQr: response.data.payUrl });
    }

    // Thanh toán tiền mặt
    if (paymentMethod === "byCash") {
      return res.status(200).json({ ticketId, status: "waiting for payment" });
    }

    // Trường hợp phương thức thanh toán không hợp lệ
    return res.status(400).json({ error: "Invalid payment method" });
  } catch (error) {
    console.error("Create ticket error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// redis lock seats khi bị chọn trùng seats
exports.lockseat = async (req, res) => {
  try {
    const { journeyId, userId, seat } = req.body;
    console.log("Body: ", req.body);

    const redisKey = `lock:seat:${journeyId}:${seat}`;

    const isLocked = await redisClient.get(redisKey);
    if (isLocked) {
      return res
        .status(409)
        .json({ message: "Ghế đã được giữ bởi người khác." });
    }

    await redisClient.set(redisKey, userId, {
      EX: 600, // thời gian giữ 10 phút
      NX: true, // chỉ đặt nếu key chưa tồn tại
    });

    return res
      .status(200)
      .json({ message: "Đã giữ ghế thành công trong 600 giây." });
  } catch (error) {
    console.error("Lỗi lock ghế:", error);
    return res.status(500).json({ error: "Lỗi hệ thống Redis." });
  }
};

exports.getLockedSeats = async (req, res) => {
  try {
    const { journeyId } = req.params;
    const pattern = `lock:seat:${journeyId}:*`;
    const keys = await redisClient.keys(pattern);

    const lockedSeats = keys.map((key) => key.split(":").pop());
    console.log("Radis key: ", keys);
    return res.status(200).json({ lockedSeats });
  } catch (error) {
    console.error("Lỗi không lấy được danh sách lock seat.", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//api giải phóng lock nếu thanh toán thành công
exports.releaseLock = async (req, res) => {
  try {
    const { journeyId, userId, seat, paymentMethod } = req.body;
    const lockKey = `lock:seat:${journeyId}:${seat}`;

    const lockHolder = await redisClient.get(lockKey);
    if (lockHolder !== userId) {
      return res
        .status(409)
        .json({ message: "Bạn không giữ ghế hoặc đã hết hạn giữ ghế." });
    }

    const journey = await trainSchedule.findOne({ journeyId });
    if (!journey)
      return res.status(404).json({ error: "Không tìm thấy hành trình." });

    const ticketId = "TICKET_" + Date.now();
    const transactionId = "TXN_" + Date.now();
    const totalPrice = journey.regularTicketPrice; // hoặc tính động

    const expiresAt =
      paymentMethod === "momo"
        ? new Date(Date.now() + 10 * 60 * 1000)
        : new Date(new Date(journey.departureDate).getTime() - 60 * 10 * 1000); //hết hạn trong 10p

    await Ticket.create({
      ticketId,
      userId,
      trainId: journey.trainId,
      journeyId,
      seatNumber: seat,
      bookingDate: new Date(),
      status: "pending",
      price: totalPrice,
      paymentInfo: {
        method: paymentMethod,
        transactionId,
        expiresAt,
      },
    });

    await redisClient.del(lockKey);

    return res
      .status(200)
      .json({ message: "Thanh toán thành công và giữ ghế vĩnh viễn." });
  } catch (error) {
    console.error("Lỗi khi xác nhận thanh toán:", error);
    return res.status(500).json({ error: "Lỗi hệ thống khi lưu vé." });
  }
};
