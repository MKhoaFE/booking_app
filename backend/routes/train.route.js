const express = require("express");
const router = express.Router();
const {getAllTrains, registerTrip} = require("../controllers/train.controller");

router.get("/", getAllTrains);
router.post("/addTrips", registerTrip);

module.exports = router;

