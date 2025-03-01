const Train = require("../models/train.model");

exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find(); //lấy tất cả các chuyến tàu
    res.status(200).json({ trains });
  } catch (error) {
    console.error("Error fetching trains: ", error);
    res
      .status(500)
      .json({ message: "Failed to fetch trains", error: error.message });
  }
};

exports.registerTrip = async (req, res) => {
  try {
    const {
      trainId,
      vessel,
      capacity,
      departureStation,
      arrivalStation,
      departureTime,
      arrivalTime,
      regularSeats,
      specialSeats,
    } = req.body;

    const existingTrip = await Train.findOne({
      vessel,
      departureStation,
      arrivalStation,
    });

    if (existingTrip) {
      return res.status(400).json({ message: "Trip already existed" });
    }
    const newTrip = new Train({
      trainId,
      vessel,
      capacity,
      departureStation,
      arrivalStation,
      departureTime,
      arrivalTime,
      regularSeats,
      specialSeats,
    });

    const savedTrip = await newTrip.save();
    res
      .status(201)
      .json({ message: "New Trip added successfully", trip: savedTrip });
  } catch (error) {
    console.error("Error: ", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.lastestId = async(req,res)=>{
  try{
    const lastestTrain = await Train.findOne().sort({trainId: -1}); //lấy trainid mới nhất
    if(lastestTrain){
      res.json({trainId: lastestTrain.trainId});

    }else{
      res.json({trainId:"T000"});

    }
  }catch(error){
      console.error("Lỗi lấy trainId newest: ", error);
      res.status(500).json({error:"Lỗi server"});
  }
}

exports.deleteTrain = async(req,res)=>{
  try{
    const {trainId} = req.params;
    const train = await Train.findOne({trainId});
    if(!train){
      return res.status(404).json({message:"Không tìm thấy train"});
    }

    await Train.deleteOne({trainId});
    return res.status(200).json({message:"Xóa train thành công"});
  }catch(error){
    console.error("Lỗi khi xóa train: ", error);
    return res.status(500).json({message:"Lỗi server: ",error: error.message});

  }
}