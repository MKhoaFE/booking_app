// const mongoose = require("mongoose");
// const mongooseSequence = require("mongoose-sequence")(mongoose);

// // Định nghĩa schema cho User
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true },
//     passwordHash: { type: String, required: true },
//     registeredAt: { type: Date, default: Date.now },
//     tokens: [{ type: Object }],
//     resetPasswordToken: { type: String }, // Token để reset mật khẩu
//     resetPasswordExpires: { type: Date }, // Thời gian hết hạn của token
//     bookings: [
//       {
//         journeyId: { type: String, required: true },
//         contactData: {
//           name: { type: String, required: true },
//           phone: { type: String },
//           address: { type: String },
//           email: { type: String },
//           company: { type: String },
//           taxCode: { type: String },
//         },
//         passengerData: [
//           {
//             seat: { type: String, required: true },
//             type: {
//               type: String,
//               enum: ["regular", "special"],
//               required: true,
//             },
//             name: { type: String },
//             phone: { type: String },
//             idCard: { type: String },
//             country: { type: String },
//             gender: { type: String },
//             birthYear: { type: String },
//             price: { type: Number },
//           },
//         ],
//         bookingDate: { type: Date, default: Date.now },
//         departureDate: { type: Date, required: true }, // Ngày khởi hành
//         departureStation: { type: String, required: true }, // Nơi khởi hành
//         arrivalStation: { type: String, required: true }, // Nơi đến
//       },
//     ],
//   },
//   { collection: "User" }
// );

// userSchema.plugin(mongooseSequence, { inc_field: "userId" });

// module.exports = mongoose.model("User", userSchema);


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