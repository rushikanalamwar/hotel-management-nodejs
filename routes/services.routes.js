var express = require('express');
const services = require('../controllers/service.controller')

var router = express.Router();

//food categories
router.post('/add', services.addservice);
router.post('/update/:id', services.updateservice);
router.post('/delete/:id', services.deleteservice);
router.get('/all', services.getAllservice);
router.get('/allCount', services.totalService);

module.exports = router;
