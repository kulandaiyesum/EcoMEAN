const express = require("express");
const router = express.Router();
const productController = require("../controllers/productContoller");
const { protectRoute } = require("../middleware/verifyJWT");
const verifyUserRole = require("../middleware/verifyUserRole");

router.route("/products").get(productController.getProductByPages);
router.route("/products/all").get(productController.getAllProducts);
router.route("/products/:id").get(productController.getProductById);

router
  .route("/products")
  .post(protectRoute, verifyUserRole("ADMIN"), productController.createProduct);
router
  .route("/products/bulk")
  .post(
    protectRoute,
    verifyUserRole("ADMIN"),
    productController.createProductsBulk
  );
router
  .route("/products/:id")
  .put(protectRoute, verifyUserRole("ADMIN"), productController.updateProduct)
  .delete(
    protectRoute,
    verifyUserRole("ADMIN"),
    productController.deleteProduct
  );

module.exports = router;
