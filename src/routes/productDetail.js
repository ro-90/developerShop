var express = require('express');
var router = express.Router();
let productDetailController = require('../controllers/productDetailController');


router.get('/', productDetailController.index);

    module.exports = router;