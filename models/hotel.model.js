const mongoose = require("mongoose")
// const serviceSchema = require("./service.model")
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    service: { type: String, required: true},
    itemsCount: { type: String},
    status: {type: Boolean, default: true}    
});

const hotelSchema = new Schema({
    userId:{type: Schema.Types.ObjectId},
    hotel: { type: String, required: true},
    location: { type: String},
    hotelService:[serviceSchema],
    status: {type: Boolean, default: true}    
});

module.exports = mongoose.model("hotel", hotelSchema);
// module.exports = mongoose.model("serviceSchema", serviceSchema);