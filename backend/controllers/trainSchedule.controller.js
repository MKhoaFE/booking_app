const Train = require("../models/train.model"); 
const trainSchedule = require("../models/trainSchedule.model");

// tạo hành trình mới
exports.newTrainSchedule = async (req,res)=>{
    try{
        const {trainId, departureDate, arrivalDate, departureTime, arrivalTime, regularSeats, specialSeats, ticketPrice} = req.body;
        //kiểm tra xem trainId có tồn tại không
        const train = await Train.findOne({trainId});
        if(!train){
            console.error(error);
            return res.status(404).json({message:"Train không tồn tại"});
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
            departureStation : train.departureStation,
            arrivalStation : train.arrivalStation,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            regularSeats,
            specialSeats,
            ticketPrice,
            status : "active",
        });
        
        await newJourney.save();
        return res.status(201).json({message:"Tạo hành trình mới thành công!", })
    } catch(error){
        console.error("Lỗi khi tạo hành trình: ",error);
        return res.status(500).json({message:"Lỗi server",error});
    }
};


//get all hành trình
exports.getAllTrainSchedules = async(req, res)=>{
    try{
        const trainSchedules = await trainSchedule.find();
        res.status(200).json({trainSchedules});
    }catch(error){
        console.error("Error fetching trainSchedules: ",error);
        res.status(500).json({message:"Failed to fetch trains", error: error.message});
    }
};