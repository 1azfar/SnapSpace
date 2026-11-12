const authController = require("../Controllers/auth.Controller");
const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();


router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser)

module.exports = router;