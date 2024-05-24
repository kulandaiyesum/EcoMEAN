const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");
const { protectRoute } = require("../middleware/verifyJWT");
const verifyUserRole = require("../middleware/verifyUserRole");

router
  .route("/")
  .post(protectRoute, verifyUserRole("USER"), addToCart)
  .get(protectRoute, verifyUserRole("USER"), getCart);

router.delete(
  "/:productId",
  protectRoute,
  verifyUserRole("USER"),
  removeFromCart
);

module.exports = router;
