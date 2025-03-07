const mongoose = require("mongoose");
const journeyStatus = require("../middlewares/journeyStatus");

const trainSchedule = new mongoose.Schema(
  {
    journeyId: { type: String, unique: true },
    trainId: { type: String, required: true, ref: "Train" },
    departureStation: { type: String },
    arrivalStation: { type: String },
    departureTime: { type: String },
    arrivalTime: { type: String },
    departureDate: { type: Date },
    arrivalDate: { type: Date },
    regularSeats: { type: Number },
    specialSeats: { type: Number },
    regularTicketPrice: { type: Number },
    specialTicketPrice: { type: Number },
    status: {
      type: String,
      enum: ["active", "inactive", "in progress"],
      default: "active",
    },
    regularTicketBooked: { type: Number, default: 0 },
    specialTicketBooked: { type: Number, default: 0 },
    regularTicketPaid: { type: Number, default: 0 },
    specialTicketPaid: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    seatBooked: [
      {
        contactData: {
          name: { type: String, required: true },
          phone: { type: String },
          address: { type: String },
          email: { type: String },
          company: { type: String },
          taxCode: { type: String },
        },
        passengerData: [
          {
            seat: { type: String, required: true },
            type: { type: String, enum: ["regular", "special"], required: true },
            name: { type: String },
            phone: { type: String },
            idCard: { type: String },
            country: { type: String },
            gender: { type: String },
            birthYear: { type: String },
            price: { type: Number },
          },
        ],
      },
    ],
    reservedSeats: [{ type: String }], // Thêm trường mới: mảng các ghế đã đặt
  },
  { collection: "trainSchedule" }
);

// Middleware để cập nhật reservedSeats trước khi save
trainSchedule.pre("save", function (next) {
  const reservedSeats = this.seatBooked
    .flatMap((booking) => booking.passengerData.map((passenger) => passenger.seat));
  this.reservedSeats = [...new Set(reservedSeats)]; // Loại bỏ trùng lặp
  next();
});

// Middleware để cập nhật trạng thái hành trình
trainSchedule.pre("find", async function (next) {
  await journeyStatus(this.model);
  next();
});

module.exports = mongoose.model("trainSchedule", trainSchedule);