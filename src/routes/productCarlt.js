var express = require('express');
var router = express.Router();
let productCarltController = require('../controllers/productCarltController');




router.get('/', productCarltController.index);

    module.exports = router;