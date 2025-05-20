const express = require('express');
const { payment } = require('../controllers/payment.controller');
const router = express.Router();

router.post("/MomoMethod", payment);

module.exports = router;