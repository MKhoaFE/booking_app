const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'expired', 'completed'], default: 'active' }
});

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  passwordHash: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
  sessions: [sessionSchema]
},{collection:"User"});

module.exports = mongoose.model('User', userSchema);
