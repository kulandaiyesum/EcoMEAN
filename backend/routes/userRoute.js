const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyUserRole = require("../middleware/verifyUserRole");

router.route("/").get(userController.getUserByToken);
router.route("/resetpassword").post(userController.resetpassword);
router.route("/all").get(verifyUserRole("ADMIN"), userController.getAllUsers);

module.exports = router;
