const express = require("express");
const {
  newTrainSchedule,
  getAllTrainSchedules,
  deleteTrainSchedule,
  updateTrainSchedule,
  getOneTrainSchedule,
  bookSeats,
} = require("../controllers/trainSchedule.controller");
const isAuth = require("../middlewares/authentication.mdw");
const router = express.Router();

router.post("/addJourney", newTrainSchedule); // tạo hành trình mới
router.get("/", getAllTrainSchedules); // lấy tất cả hành trình
router.delete("/deleteJourney/:journeyId", deleteTrainSchedule); //Xóa hành trình
router.put("/updateJourney/:journeyId", updateTrainSchedule); //update hành trình
router.get("/getJourneyById/:journeyId", getOneTrainSchedule);
router.put("/bookSeats/:journeyId", isAuth, bookSeats);
// update hành trình
// xóa hành trình

module.exports = router;
