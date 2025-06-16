const express = require("express");
const {
  postTicket,
  lockseat,
  releaseLock,
  getLockedSeats,
} = require("../controllers/ticket.controller");

const router = express.Router();

router.post("/ticket", postTicket);
router.post("/lock-seat", lockseat);
router.post("/release-lock", releaseLock);
router.get("/getLockedSeats/:journeyId", getLockedSeats);

module.exports = router;
