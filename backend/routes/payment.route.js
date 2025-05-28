const express = require("express");
const {
  payment,
  callback,
  tranStatus,
} = require("../controllers/payment.controller");
const router = express.Router();

router.post("/MomoMethod", payment);
router.post("/callback", callback);
router.post("/transaction-status", tranStatus);

module.exports = router;
