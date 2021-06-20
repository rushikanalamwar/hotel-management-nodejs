var HttpResponse = require("../middlewares/http-response")
// const Service = require("../models/service.model");
const hotelModel = require("../models/hotel.model")


//ADDING hotel DETAILS :-

const hotelAdd = async(req, res)=>{
    const{hotel,location, hotelService, userId}=req.body;
    const newHotel = new hotelModel({hotel,location,hotelService, userId})

    try {
        await newHotel.save();
    } catch (err) {
        const error = new HttpResponse("cannot add hotel ", 500);
        return res.status(500).json({ response: error });
    }
    res.status(201).json({
        hotelId:newHotel.id,
        userId: newHotel.userId,
        hotel: newHotel.hotel,
        location: newHotel.location     ,
        hotelService: newHotel.hotelService,  
    });
}



// UPDATING HOME
const updateservice = async (req, res) => {
  let services; 
  const { hotel, location, hotelService } = req.body;
  console.log(req.body);
  try {
    services = await hotelModel.updateOne({ _id:req.params.id},{
   $set:{ hotel: hotel, location: location ,hotelService: hotelService } });
  } catch (err) {
    const error = new HttpResponse("Updating failed, please try again later.", 500 );
    return res.json({ result: error });
  }
  console.log(services);
  return res.json({ result: services });
};


//DELETING HOME
const deletehotel = async (req, res) => {
    let singlehotel;  
    try{  
      singlehotel = await hotelModel.findOneAndUpdate({ _id:req.params.id }, {$set: {status: false}})
      console.log(singlehotel);
    }
    catch(err) {  
      const error = new HttpResponse("Couldn.t find your singlehotel", 404)
      return res.status(404).json({ result: error })
    }
    console.log(singlehotel);
    return res.status(200).json({deleted: true})
    
    
};




const getAllHotel = async (req, res) => {
    let users;
    try {
      users = await hotelModel.find({status: true});
    } catch (err) {
      const error = new HttpResponse(
        "Fetching users failed, please try again later.",
        500
      );
      return res.json({ result: error });
    }
    console.log(users);
    return res.json({ result: users });
};

const totalServiceHotel = async (req, res) => {
    let allHotel;
    try {
      allHotel = await hotelModel.find({_id:req.params.id});
    } catch (err) {
      const error = new HttpResponse(
        "Fetching allServices failed, please try again later.",
        500
      );
      return res.json({ result: error });
    }
    
    return res.json({ result:allHotel});

};

  
exports.getAllHotel = getAllHotel;
exports.hotelAdd = hotelAdd;
exports.deletehotel = deletehotel;
exports.updateservice = updateservice;
exports.totalServiceHotel = totalServiceHotel;

