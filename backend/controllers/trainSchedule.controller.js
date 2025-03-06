const Train = require("../models/train.model");
const trainSchedule = require("../models/trainSchedule.model");

// tạo hành trình mới
exports.newTrainSchedule = async (req, res) => {
  try {
    const {
      trainId,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      regularSeats,
      specialSeats,
      specialTicketPrice,
      regularTicketPrice,
    } = req.body;
    //kiểm tra xem trainId có tồn tại không
    const train = await Train.findOne({ trainId });
    if (!train) {
      console.error(error);
      return res.status(404).json({ message: "Train không tồn tại" });
    }

    const journeyId = `J${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Kiểm tra journeyId có hợp lệ không
    if (!journeyId) {
      console.error("Lỗi khi tạo journeyId");
      return res.status(500).json({ message: "Lỗi khi tạo journeyId" });
    }

    //Tạo hành trình mới
    const newJourney = new trainSchedule({
      journeyId,
      trainId: train.trainId,
      departureStation: train.departureStation,
      arrivalStation: train.arrivalStation,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      regularSeats,
      specialSeats,
      specialTicketPrice,
      regularTicketPrice,
      status: "active",
    });

    await newJourney.save();
    return res.status(201).json({ message: "Tạo hành trình mới thành công!" });
  } catch (error) {
    console.error("Lỗi khi tạo hành trình: ", error);
    return res.status(500).json({ message: "Lỗi server", error });
  }
};

//get all hành trình
exports.getAllTrainSchedules = async (req, res) => {
  try {
    const trainSchedules = await trainSchedule.find();
    res.status(200).json({ trainSchedules });
  } catch (error) {
    console.error("lỗi khi get trainSchedule: ", error);
    res
      .status(500)
      .json({ message: "lỗi get trainSchedules", error: error.message });
  }
};

//get 1 hành trình
exports.getOneTrainSchedule = async (req, res) => {
  try {
    const { journeyId } = req.params; // Lấy journeyId từ URL

    // Kiểm tra nếu journeyId bị thiếu
    if (!journeyId) {
      return res.status(400).json({ message: "Thiếu journeyId." });
    }

    // Tìm hành trình bằng journeyId thay vì _id của MongoDB
    const journey = await trainSchedule.findOne({ journeyId: journeyId });

    if (!journey) {
      return res.status(404).json({ message: "Không tìm thấy hành trình." });
    }

    res.status(200).json({message:"get thành công", journey});
  } catch (error) {
    console.error("Lỗi khi lấy hành trình:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

//delete hành trình
exports.deleteTrainSchedule = async (req, res) => {
  try {
    const { journeyId } = req.params;

    // Kiểm tra xem hành trình có tồn tại không
    const journey = await trainSchedule.findOne({ journeyId });
    if (!journey) {
      return res.status(404).json({ message: "Hành trình không tồn tại" });
    }

    // Xóa hành trình
    await trainSchedule.deleteOne({ journeyId });

    return res.status(200).json({ message: "Xóa hành trình thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa hành trình: ", error);
    return res.status(500).json({ message: "Lỗi server", error });
  }
};

// update hành trình
exports.updateTrainSchedule = async (req, res) => {
  try {
    const { journeyId } = req.params;
    const updateData = req.body;

    //kiểm tra journey id có tồn tại không
    const journey = await trainSchedule.findOne({ journeyId });
    if (!journey) {
      return res.status(404).json({ message: "Không tìm thấy hành trình: " });
    }

    // Cập nhật ngày giờ mới
    journey.departureDate = new Date(updateData.departureDate);
    journey.arrivalDate = new Date(updateData.arrivalDate);

    // Xử lý cập nhật trạng thái
    const now = new Date();
    if (now < journey.departureDate) {
      journey.status = "active";
    } else if (now >= journey.departureDate && now <= journey.arrivalDate) {
      journey.status = "in progress";
    } else {
      journey.status = "inactive";
    }

    // Lưu vào DB
    await journey.save();

    return res.status(200).json({ message: "Cập nhật hành trình thành công" });
  } catch (error) {
    console.error("Lỗi không cập nhật được hành trình: ", error);
    return res.status(500).json({ message: "Lỗi server: ", error });
  }
};

//update seat booked by user
exports.bookSeats = async (req, res) => {
  const { journeyId } = req.params;
  const { seatBooked, regularTicketBooked, specialTicketBooked } = req.body;

  try {
    const journey = await trainSchedule.findOne({ journeyId });
    if (!journey) {
      return res.status(404).json({ message: "Không tìm thấy hành trình!" });
    }

    // Kiểm tra số lượng vé còn lại
    const availableRegular = journey.regularSeats - journey.regularTicketBooked;
    const availableSpecial = journey.specialSeats - journey.specialTicketBooked;

    if (regularTicketBooked > availableRegular || specialTicketBooked > availableSpecial) {
      return res.status(400).json({ message: "Không đủ ghế trống để đặt!" });
    }

    // Thêm slot mới vào mảng seatBooked
    journey.seatBooked.push({
      contactData: seatBooked.contactData,
      passengerData: seatBooked.passengerData,
    });
    journey.regularTicketBooked += regularTicketBooked;
    journey.specialTicketBooked += specialTicketBooked;

    await journey.save();
    res.status(200).json({ message: "Đặt vé thành công!" });
  } catch (error) {
    console.error("Lỗi khi đặt vé:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};