var HttpResponse = require("../middlewares/http-response")
const Service = require("../models/service.model");


//ADDING SERVICE DETAILS :-
const addservice = async (req, res) => {
    const { service , itemCount } = req.body;
    console.log(req.body);
    const singleservice = new Service({
        service, itemCount
      });
      console.log(singleservice)
      try {
        await singleservice.save();
      } catch (err) {
        console.log(err);
        const error = new HttpResponse(err, 500);
        return res.status(500).json({ response: error });
      }
      res.status(201).json({
        serviceId: singleservice.id,
        service: singleservice.service,
        itemCount: singleservice.itemCount,
        status: singleservice.status
        
        
    });
    
};



// UPDATING HOME
const updateservice = async (req, res) => {
  let services; 
  const { service, itemCount } = req.body;
  console.log(req.body);
  try {
    services = await Service.updateOne({ _id:req.params.id},{
   $set:{ service: service, itemCount: itemCount } });
  } catch (err) {
    const error = new HttpResponse("Updating failed, please try again later.", 500 );
    return res.json({ result: error });
  }
  console.log(services);
  return res.json({ result: services });
};


//DELETING HOME
const deleteservice = async (req, res) => {
    let singleservice;  
    try{  
      singleservice = await Service.findOneAndUpdate({ _id:req.params.id }, {$set: {status: false}})
      console.log(singleservice);
    }
    catch(err) {  
      const error = new HttpResponse("Couldn.t find your singleservice", 404)
      return res.status(404).json({ result: error })
    }
    console.log(singleservice);
    return res.status(200).json({deleted: true})
    
    
};




const getAllservice = async (req, res) => {
    let users;
    try {
      users = await Service.find({status: true});
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

const totalService = async (req, res) => {
    let allServices;
    try {
      allServices = await Service.find({status: true});
    } catch (err) {
      const error = new HttpResponse(
        "Fetching allServices failed, please try again later.",
        500
      );
      return res.json({ result: error });
    }
    console.log(allServices);
    return res.json({ result: Object.keys(allServices).length });
};

  
exports.getAllservice = getAllservice;
exports.addservice = addservice;
exports.deleteservice = deleteservice;
exports.updateservice = updateservice;
exports.totalService = totalService;
