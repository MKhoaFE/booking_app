const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainId: { type: String,  ref: 'Train' },
  selectedSeats: {
    type: Map, // Sử dụng Map để lưu key-value
    of: String, // Giá trị của mỗi key là một chuỗi (ví dụ: "regular", "special")
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed', 'expired'], default: 'pending' }
});

module.exports = mongoose.model('Session', sessionSchema);
