const Train = require("../models/train.model");
const trainSchedule = require("../models/trainSchedule.model");
const User = require("../models/user.model");
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

    res.status(200).json({ message: "get thành công", journey });
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
  const userId = req.user._id;

  try {
    const journey = await trainSchedule.findOne({ journeyId });
    if (!journey) {
      return res.status(404).json({ message: "Không tìm thấy hành trình!" });
    }

    // Kiểm tra giá vé có tồn tại không
    if (!journey.regularTicketPrice || !journey.specialTicketPrice) {
      return res.status(500).json({ message: "Giá vé chưa được thiết lập trong hành trình!" });
    }

    const availableRegular = journey.regularSeats - journey.regularTicketBooked;
    const availableSpecial = journey.specialSeats - journey.specialTicketBooked;

    if (regularTicketBooked > availableRegular || specialTicketBooked > availableSpecial) {
      return res.status(400).json({ message: "Không đủ ghế trống để đặt!" });
    }

    // Thêm giá tiền vào passengerData
    const updatedPassengerData = seatBooked.passengerData.map((passenger) => ({
      ...passenger,
      price: passenger.type === "regular" ? journey.regularTicketPrice : journey.specialTicketPrice,
    }));

    journey.seatBooked.push({
      contactData: seatBooked.contactData,
      passengerData: updatedPassengerData,
    });
    journey.regularTicketBooked += regularTicketBooked;
    journey.specialTicketBooked += specialTicketBooked;

    await journey.save();

    const bookingData = {
      journeyId,
      contactData: seatBooked.contactData,
      passengerData: updatedPassengerData,
      bookingDate: new Date(),
      departureDate: journey.departureDate,
      departureStation: journey.departureStation,
      arrivalStation: journey.arrivalStation,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { bookings: bookingData } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Lỗi khi cập nhật thông tin người dùng!" });
    }

    // Trả về dữ liệu đầy đủ để frontend sử dụng
    res.status(200).json({
      message: "Đặt vé thành công!",
      bookingData: {
        journeyId,
        contactData: seatBooked.contactData,
        passengerData: updatedPassengerData,
        departureDate: journey.departureDate,
        departureStation: journey.departureStation,
        arrivalStation: journey.arrivalStation,
      },
    });
  } catch (error) {
    console.error("Lỗi khi đặt vé:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};


exports.bookSeat = async(req,res)=>{
  const { journeyId } = req.params;
  const { contactData, passengerData } = req.body;

  try {
    const journey = await trainSchedule.findOne({ journeyId });
    if (!journey) {
      return res.status(404).json({ error: "Journey not found" });
    }

    // Kiểm tra passengerData
    if (!Array.isArray(passengerData) || passengerData.length === 0) {
      return res.status(400).json({ error: "passengerData must be a non-empty array" });
    }

    // Thêm booking mới
    journey.seatBooked.push({ contactData, passengerData });
    
    // Cập nhật số vé đã đặt
    passengerData.forEach((passenger) => {
      if (passenger.type === "regular") {
        journey.regularTicketBooked += 1;
      } else if (passenger.type === "special") {
        journey.specialTicketBooked += 1;
      }
    });

    await journey.save(); // Middleware pre("save") sẽ tự động cập nhật reservedSeats
    res.json({ journey });
  } catch (error) {
    console.error("Error booking seat:", error);
    res.status(500).json({ error: "Failed to book seat" });
  }
}