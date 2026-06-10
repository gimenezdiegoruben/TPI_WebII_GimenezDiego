const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.get('/login', authController.loginForm);
router.get('/register', authController.registerForm);
router.post('/register', authController.registerSubmit);

module.exports = router;
