var express = require('express');
var router = express.Router();
let loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');



router.get('/', profileController.index);


    module.exports = router;
