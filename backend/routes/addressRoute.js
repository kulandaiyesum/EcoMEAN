const express = require("express");
const router = express.Router();
const {
  saveAddress,
  getAllAddresses,
  editAddress,
  deleteAddress,
} = require("../controllers/addressController");
const { protectRoute } = require("../middleware/verifyJWT");

router
  .route("/")
  .post(protectRoute, saveAddress)
  .get(protectRoute, getAllAddresses);
router
  .route("/:id")
  .put(protectRoute, editAddress)
  .delete(protectRoute, deleteAddress);

module.exports = router;
