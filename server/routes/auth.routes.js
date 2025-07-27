const express = require('express');
const router = express.Router();
const { signup, login } = require('../controller/auth.controller');

// POST /api/auth/signup - Register new user
router.post('/signup', signup);

// POST /api/auth/login - Login user by phone number
router.post('/login', login);

module.exports = router; 