const mongoose = require("mongoose");

const trainSchedule = new mongoose.Schema(
  {
    journeyId: { type: String, unique: true }, // ID của hành trình
    trainId: { type: String, required: true, ref: "Train" }, // Liên kết với chuyến xe (Train)
    departureStation: { type: String }, // Nơi khởi hành
    arrivalStation: { type: String }, // Nơi đến
    departureTime: { type: String }, // Giờ khởi hành
    arrivalTime: { type: String }, // Giờ đến
    departureDate: { type: Date }, // Ngày khởi hành
    arrivalDate: { type: Date }, // Ngày đến
    regularSeats: { type: Number, }, // Số lượng ghế thường
    specialSeats: { type: Number }, // Số lượng ghế đặc biệt
    ticketPrice: { type: Number }, // Giá vé
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    }, // Trạng thái hành trình
    createdAt: { type: Date, default: Date.now }, // Ngày tạo hành trình
  },
  { collection: "trainSchedule" }
);

module.exports = mongoose.model("trainSchedule", trainSchedule);
