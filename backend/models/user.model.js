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
  },
  { collection: "User" }
);

userSchema.plugin(mongooseSequence, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);
