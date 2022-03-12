const express = require('express');

const {Router} = express;
const router = new Router();

const usercontroller = require('../controller/users_controller');


// User Service
router.route('/api/counselor_signup').post(usercontroller.createUser);




module.exports = router;



