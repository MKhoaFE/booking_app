const express = require("express");
const router = express.Router();
const {
  getAllTrains,
  registerTrip,
  lastestId,
  deleteTrain,
} = require("../controllers/train.controller");

router.get("/", getAllTrains);
router.post("/addTrips", registerTrip);
router.get("/lastestId", lastestId);
router.delete("/deleteTrain/:trainId", deleteTrain);

module.exports = router;
