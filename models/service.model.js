const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    service: { type: String, required: true},
    itemsCount: { type: String},
    status: {type: Boolean, default: true}    
});

module.exports = mongoose.model("service", serviceSchema);