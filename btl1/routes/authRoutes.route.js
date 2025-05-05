const express = require("express");
const AuthController = require("../controllers/AuthController.controller");

const router = express.Router();

// Route đăng ký người dùng
router.post("/register", AuthController.register);

module.exports = router;
