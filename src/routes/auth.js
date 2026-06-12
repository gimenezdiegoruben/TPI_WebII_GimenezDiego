const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.get('/login', authController.loginForm);
router.post('/login', authController.loginSubmit);

router.get('/register', authController.registerForm);
router.post('/register', authController.registerSubmit);

router.get('/logout', authController.logout);

module.exports = router;