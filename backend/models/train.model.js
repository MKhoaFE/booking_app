const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String },
  status: { type: String, enum: ["available", "booked"], default: "available" },
  bookedBy: { type: String, ref: "User" }, // References the userId from User collection
});

const trainSchema = new mongoose.Schema(
  {
    trainId: { type: String, required: true, unique: true },
    departureStation: { type: String, required: true },
    arrivalStation: { type: String, required: true },
    //time với date để ở trang tạo chuyến đi ( 1 tàu có nhiều chuyến đi)
    // departureTime: { type: String, required: true },
    // arrivalTime: { type: String, required: true },
    // departureDate: { type: Date },
    capacity: { type: Number, required: true },
    vessel: { type: String, required: true },
    // regularSeats: {type: Number, required:true}, 
    // specialSeats: {type: Number, required:true}, 
    // availableSeats: [seatSchema],
  },
  { collection: "Train" }
);

module.exports = mongoose.model("Train", trainSchema);
