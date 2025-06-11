const express = require("express");
const {
  postTicket,
  lockseat,
  releaseLock,
} = require("../controllers/ticket.controller");

const router = express.Router();

router.post("/ticket", postTicket);
router.post("/lock-seat", lockseat);
router.post("/release-lock", releaseLock);
module.exports = router;
