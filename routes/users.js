const userControllers = require('../controllers/users');
const express = require('express');
const router = express.Router();
const {verify, verifyAdmin} = require('../auth.js');

// 1) Register User
router.post('/register', userControllers.registerUser);

// 2) Login User
router.post('/login', userControllers.loginUser);

// 3) Get User Details
router.get('/details', verify, userControllers.getUserDetails);

// 4) Get Specific User Detail
router.get('/details/:userId', verify, userControllers.getSpecificDetail); 

module.exports = router;