var express = require('express');
const hotel = require('../controllers/hotel.controller')

var router = express.Router();

//food categories
router.post('/add', hotel.hotelAdd);
router.post('/update/:id', hotel.updateservice);
router.post('/delete/:id', hotel.deletehotel);
router.get('/all', hotel.getAllHotel);
router.get('/countService/:id', hotel.totalServiceHotel);

module.exports = router;
