const express = require('express');
const sessionController = require('../controllers/session.controller');

const router = express.Router();

// Route để tạo session
router.post('/seats', sessionController.createSession);

// Route để lấy thông tin session
router.get('/:sessionId', sessionController.getSession);

// Route để cập nhật thông tin hành khách
router.post('/passengers', sessionController.updatePassengers);

module.exports = router;
