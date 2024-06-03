const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/verifyJWT");
const {
  createOrder,
  verifyAndPlaceOrder,
  getOrderDetails,
  markAsDelivered,
} = require("../controllers/paymentController");
const verifyUserRole = require("../middleware/verifyUserRole");

router.post("/create-order", protectRoute, createOrder);
router.post("/verify-order", protectRoute, verifyAndPlaceOrder);
router.get("/order", protectRoute, verifyUserRole("ADMIN"), getOrderDetails);
router.put("/order", protectRoute, verifyUserRole("ADMIN"), markAsDelivered);

module.exports = router;
