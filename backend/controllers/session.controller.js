// In session.controller.js
exports.createSessionAndRedirect = async (req, res) => {
  try {
    const { userId, trainId, selectedSeats, expiresAt } = req.body;

    if (!userId || !trainId || !selectedSeats || !expiresAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Kiểm tra userId từ cookie
    const userIdFromCookies = req.cookies.userId;
    if (!userIdFromCookies) {
      return res.status(400).json({ error: 'User not authenticated' });
    }

    // Tạo session mới
    const sessionId = `session_${Date.now()}`;
    const newSession = new Session({
      sessionId,
      userId: userIdFromCookies,
      trainId,
      selectedSeats,
      expiresAt,
    });

    await newSession.save();

    // Redirect tới trang /booking/seats
    res.redirect(`/booking/seats?sessionId=${sessionId}`);
  } catch (error) {
    console.error('Error Details:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
};
