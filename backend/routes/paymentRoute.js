const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/verifyJWT");
const {
  createOrder,
  verifyAndPlaceOrder,
} = require("../controllers/paymentController");

router.post("/create-order", protectRoute, createOrder);
router.post("/verify-order", protectRoute, verifyAndPlaceOrder);

module.exports = router;
