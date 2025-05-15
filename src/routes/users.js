var express = require('express');
var router = express.Router();
const { login, register, store, profile, processLogin, logout, update, deleteUser } = require('../controllers/usersController');
const registerValidator = require('../validations/registerValidator');

//const validationLogin = require('../middleware/loginVerify');
const loginValidator = require('../validations/loginValidator');
const loginVerify = require('../middleware/loginVerify');

/* GET users listing. */
router.get('/login', login);
router.post('/login', loginValidator, processLogin);
router.get('/logout', logout);


router.get('/register', register);
router.post('/register', registerValidator, store);

router.get('/profile', loginVerify, profile);
router.put('/profile/:id', update);
router.delete('/remove/:id', deleteUser);

module.exports = router;
