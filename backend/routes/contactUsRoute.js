const express = require("express");
const router = express.Router();
const contactUsController = require("../controllers/contactUsController");
const { protectRoute } = require("../middleware/verifyJWT");
const verifyUserRole = require("../middleware/verifyUserRole");

router
  .route("/")
  .post(contactUsController.postContactUsMessage)
  .get(
    protectRoute,
    verifyUserRole("ADMIN"),
    contactUsController.getAllContactUsMessages
  );

module.exports = router;
