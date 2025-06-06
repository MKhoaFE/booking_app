const Ticket = require("../models/ticket.model");
const trainSchedule = require("../models/trainSchedule.model");
const axios = require("axios");

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
