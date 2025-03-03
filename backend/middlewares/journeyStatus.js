
const journeyStatus = async (trainScheduleModel) => {
    const currentTime = new Date(); // Lấy thời gian hiện tại
  
    // Cập nhật trạng thái của các hành trình đang diễn ra
    await trainScheduleModel.updateMany(
      {
        departureDate: { $lte: currentTime }, // Đã khởi hành hoặc bằng thời gian hiện tại
        arrivalDate: { $gte: currentTime },   // Chưa kết thúc
      },
      { $set: { status: "in progress" } }
    );
  
    // Cập nhật trạng thái của các hành trình đã kết thúc
    await trainScheduleModel.updateMany(
      {
        arrivalDate: { $lt: currentTime }, // Nếu đã kết thúc
      },
      { $set: { status: "inactive" } }
    );
  };
  
  module.exports = journeyStatus;
  