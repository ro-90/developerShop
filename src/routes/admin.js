var express = require('express');
var router = express.Router();
let adminController = require('../controllers/adminController');



router.get('/',adminController.index);


    module.exports = router;
