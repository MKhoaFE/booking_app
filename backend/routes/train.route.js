const express = require("express");
const router = express.Router();
const {getAllTrains, registerTrip, lastestId} = require("../controllers/train.controller");

router.get("/", getAllTrains);
router.post("/addTrips", registerTrip);
router.get("/lastestId", lastestId);
module.exports = router;

