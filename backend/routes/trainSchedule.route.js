const express = require("express");
const {
  newTrainSchedule,
  getAllTrainSchedules,
  deleteTrainSchedule,
} = require("../controllers/trainSchedule.controller");
const router = express.Router();

router.post("/addJourney", newTrainSchedule); // tạo hành trình mới
router.get("/", getAllTrainSchedules); // lấy tất cả hành trình
router.delete("/deleteJourney/:journeyId", deleteTrainSchedule); //Xóa hành trình
// update hành trình
// xóa hành trình

module.exports = router;
