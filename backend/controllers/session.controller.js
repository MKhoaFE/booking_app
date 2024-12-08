const Session = require('../models/session.model');

// Tạo session mới
exports.createSession = async (req, res) => {
  try {
    const { userId, trainId, selectedSeats, expiresAt } = req.body;

    if (!userId || !trainId || !selectedSeats || !expiresAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newSession = new Session({
      sessionId: `session_${Date.now()}`,
      userId,
      trainId,
      selectedSeats, // selectedSeats là một object JSON
      expiresAt,
    });

    await newSession.save();
    res.status(201).json({
      message: 'Session created successfully',
      sessionId: newSession.sessionId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create session' });
  }
};


// Lấy thông tin session
exports.getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
};
exports.updateSeats = async (req, res) => {
  try {
    const { sessionId, selectedSeats } = req.body;

    if (!sessionId || !selectedSeats) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const session = await Session.findOneAndUpdate(
      { sessionId },
      { selectedSeats }, // Cập nhật toàn bộ selectedSeats
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.status(200).json({
      message: 'Seats updated successfully',
      session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update seats' });
  }
};


// Cập nhật thông tin hành khách
exports.updatePassengers = async (req, res) => {
  try {
    const { sessionId, passengers } = req.body;

    if (!sessionId || !passengers) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const session = await Session.findOneAndUpdate(
      { sessionId },
      { passengers }, // Thêm thông tin hành khách
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.status(200).json({
      message: 'Passengers updated successfully',
      session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update passengers' });
  }
};
