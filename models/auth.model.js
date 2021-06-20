var mongoose = require('mongoose')
const hotels = require('./hotel.model') 
const Schema = mongoose.Schema;

var quaolityAuth = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    hotels:[hotels.schema]
});

module.exports = mongoose.model('auth', quaolityAuth);
