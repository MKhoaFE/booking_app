const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence")(mongoose);

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    passwordHash: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    tokens: [{ type: Object }],
    bookings: [
      {
        journeyId: { type: String, required: true },
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
            type: {
              type: String,
              enum: ["regular", "special"],
              required: true,
            },
            name: { type: String },
            phone: { type: String },
            idCard: { type: String },
            country: { type: String },
            gender: { type: String },
            birthYear: { type: String },
            price: { type: Number },
          },
        ],
        bookingDate: { type: Date, default: Date.now },
        departureDate: { type: Date, required: true }, // Ngày khởi hành
        departureStation: { type: String, required: true }, // Nơi khởi hành
        arrivalStation: { type: String, required: true }, // Nơi đến
      },
    ],
  },
  { collection: "User" }
);

userSchema.plugin(mongooseSequence, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);
