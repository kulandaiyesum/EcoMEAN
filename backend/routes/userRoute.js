const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/").get(userController.getUserByToken);
router.route("/resetpassword").post(userController.resetpassword);

module.exports = router;
