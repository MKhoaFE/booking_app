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
    regularSeats: { type: Number }, // Số lượng ghế thường
    specialSeats: { type: Number }, // Số lượng ghế đặc biệt
    regularTicketPrice: { type: Number }, // Giá vé thường
    specialTicketPrice: { type: Number }, // Giá vé đặc biệt
    status: {
      type: String,
      enum: ["active", "inactive", "in progress"],
      default: "active",
    }, // Trạng thái hành trình
    regularTicketBooked: { type: Number, default: 0 },
    specialTicketBooked: { type: Number, default: 0 },
    regularTicketPaid: { type: Number, default: 0 },
    specialTicketPaid: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }, // Ngày tạo hành trình
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
          },
        ],
      },
    ], 
  },
  { collection: "trainSchedule" }
);

trainSchedule.pre("find", async function (next) {
  await journeyStatus(this.model);
  next();
});

module.exports = mongoose.model("trainSchedule", trainSchedule);