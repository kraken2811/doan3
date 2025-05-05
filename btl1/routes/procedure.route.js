const express = require('express');
const router = express.Router();
const authController = require('../controllers/procedure.controller');

// Route đăng nhập: POST /auth/login
router.post('/login', authController.login);

module.exports = router;
