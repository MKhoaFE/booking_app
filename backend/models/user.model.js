
const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");
const validator = require("validator"); // Thêm để validate email, phone

const userSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true }, // Tự động tăng bởi mongoose-sequence
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,

    },
    phone: {
      type: String,
      required: true,

    },
    passwordHash: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    tokens: [{ type: Object }], // Có thể bỏ nếu không dùng
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    bookings: [
      {
        journeyId: {
          type: String,
          required: true,
          ref: "trainSchedule", // Tham chiếu tới trainSchedule
        },
        contactData: {
          name: { type: String, required: true, trim: true },
          phone: { type: String },
          address: { type: String },
          email: { type: String },
          company: { type: String },
          taxCode: { type: String },
        },
        passengerData: [
          {
            seat: { type: String, required: true },
            type: {
              type: String,
              enum: ["regular", "special"],
              required: true,
            },
            name: { type: String },
            phone: { type: String },
            idCard: { type: String },
            country: { type: String },
            gender: { type: String, enum: ["male", "female", "other"] }, // Giới hạn giá trị
            birthYear: {
              type: String,
            },
            price: { type: Number },
          },
        ],
        bookingDate: { type: Date, default: Date.now },
        departureDate: { type: Date, required: true },
        departureStation: { type: String, required: true },
        arrivalStation: { type: String, required: true },
      },
    ],
  },
  { collection: "User" }
);


// Plugin để tự động tăng userId
userSchema.plugin(mongooseSequence, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);