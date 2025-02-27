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
    // departureTime: { type: String, required: true },
    // arrivalTime: { type: String, required: true },
    // departureDate: { type: Date },
    capacity: { type: Number, required: true },
    vessel: { type: String, required: true },
  },
  { collection: "Train" }
);

module.exports = mongoose.model("Train", trainSchema);
