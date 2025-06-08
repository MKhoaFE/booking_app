const Ticket = require("../models/ticket.model");
const trainSchedule = require("../models/trainSchedule.model");
const axios = require("axios");
const cron = require("node-cron");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();
const accessKey = process.env.ACCESS_KEY_MOMO;
const secretKey = process.env.SECRECT_KEY_MOMO;

//chạy mỗi 2p để update status
cron.schedule("*/2 * * * *", async () => {
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
    console.log("ExpiresAt of 1 ticket:", expiredTickets[0]?.paymentInfo.expiresAt);
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
        console.log(`[Cron] Vé ${ticket.ticketId} được xác nhận từ MoMo.`);
        continue; // bỏ qua huỷ giữ chỗ
      }

    } catch (err) {
      console.error(`[Cron] Lỗi kiểm tra trạng thái MoMo cho ${orderId}:`, err.message);
    }

    // Nếu thực sự chưa thanh toán, tiến hành huỷ giữ chỗ
    ticket.status = "expired";
    ticket.paymentInfo.paymentStatus = "failed";
    await ticket.save();
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
          !booking.passengerData.some((p) =>
            ticket.seatNumber.includes(p.seat)
          )
      );

      await journey.save();
      console.log(`[Cron] Đã xoá giữ chỗ vé ${ticket.ticketId} khỏi hành trình.`);
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

    //Lấy thông tin hành trình
    const journey = await trainSchedule.findOne({ journeyId });
    if (!journey) return res.status(404).json({ error: "Journey not found" });

    //kiểm tra xem ghế có đang bị giữ không
    const reserved = journey.reservedSeats || [];
    const isOccupied = seats.some((seat) => reserved.includes(seat));
    if (isOccupied) {
      return res.status(400).json({ error: "Some seats already reserved." });
    }

    //Tính tổng giá vé
    let totalPrice = 0;
    for (const p of passengerData) {
      totalPrice +=
        p.type === "regular"
          ? journey.regularTicketPrice
          : journey.specialTicketPrice;
    }

    //Tạo ticketId TransactionId expiresAt
    const ticketId = "TICKET_" + Date.now();
    const transactionId = "TXN_" + Date.now();
    const expiresAt =
      paymentMethod === "momo"
        ? new Date(Date.now() + 10 * 60 * 1000)
        : new Date(new Date(journey.departureDate).getTime() - 60 * 10 * 1000);

    //Cập nhập trainSchedule.reservedSeats và seatBooked
    journey.reservedSeats.push(...seats);
    journey.seatBooked.push({ contactData, passengerData });
    await journey.save();

    //Tạo db Ticket mongodb
    await Ticket.create({
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

    //Thanh toán momo: => QR
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

    //thanh toan byCash
    if (paymentMethod === "byCash") {
      return res.status(200).json({ ticketId, status: "waiting for payment" });
    }
  } catch (error) {
    console.error("Create ticket error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
