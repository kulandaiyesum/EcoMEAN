const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify/:token", authController.verifyEmail);
router.post("/forgotpassword", authController.forgotPassword);
router.post("/password_reset", authController.resetPassword);
router.post("/logout", authController.logout);

module.exports = router;
