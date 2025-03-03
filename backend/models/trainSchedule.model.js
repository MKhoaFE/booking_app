const mongoose = require("mongoose");
const journeyStatus = require("../middlewares/journeyStatus");

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
    regularTicketPrice: { type: Number }, // Giá vé
    specialTicketPrice: { type: Number }, // Giá vé
    status: {
      type: String,
      enum: ["active", "inactive", "in progress"],
      default: "active",
    }, // Trạng thái hành trình
    regularTicketBooked:{type: Number, default: 0},
    specialTicketBooked:{type: Number, default: 0},
    regularTicketPaid:{type: Number, default: 0},
    specialTicketPaid:{type: Number, default: 0},
    createdAt: { type: Date, default: Date.now }, // Ngày tạo hành trình
  },
  { collection: "trainSchedule" }
);

trainSchedule.pre("find", async function (next) {
  await journeyStatus(this.model); // Gọi middleware cập nhật trạng thái
  next();
});

module.exports = mongoose.model("trainSchedule", trainSchedule);
