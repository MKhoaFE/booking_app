const express = require('express');
const { newTrainSchedule } = require('../controllers/trainSchedule.controller');
const router = express.Router();

// tạo hành trình mới
router.post("/addJourney", newTrainSchedule);
// update hành trình
// xóa hành trình

module.exports = router;