const express = require('express');

const {Router} = express;
const router = new Router();

const usercontroller = require('../controller/users_controller');


// User Service
router.route('/api/user_signup').post(usercontroller.createUser);
router.route('/api/user_login').post(usercontroller.userLogin);




module.exports = router;



