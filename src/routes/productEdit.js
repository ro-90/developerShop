var express = require('express');
var router = express.Router();
let productEditController = require('../controllers/productEditController');


router.get('/', productEditController.index);
      
module.exports = router;