const express = require('express');
const sessionController = require('../controllers/session.controller');
const {createSession, getSession, updatePassengers, updateSeats} = require('../controllers/session.controller');
const router = express.Router();

// Route để tạo session
router.post('/seats', createSession);

// Route để lấy thông tin session
router.get('/:sessionId', getSession);

// Route để cập nhật thông tin hành khách
router.post('/passengers', sessionController.updatePassengers);

router.post('/update-seats', sessionController.updateSeats);

module.exports = router;
