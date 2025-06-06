const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, ref: 'User' },
  trainId: { type: String, required: true, ref: 'Train' },
  journeyId: { type: String, required: true, ref: 'trainSchedule' },
  seatNumber: [{ type: String, required: true }],
  bookingDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'expired'],
    default: 'pending',
  },
  price: { type: Number, required: true },
  paymentInfo: {
    method: { type: String, enum: ['momo', 'byCash'], required: true },
    transactionId: { type: String },
    paymentStatus: {
      type: String,
      enum: ['not yet', 'success', 'failed'],
      default: 'not yet',
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    confirmedByStaff: { type: Boolean, default: false },
  },
}, { collection: "Ticket" });

module.exports = mongoose.model('Ticket', ticketSchema);
