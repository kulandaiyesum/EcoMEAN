const express = require("express");
const router = express.Router();
const productController = require("../controllers/productContoller");
const verifyJWT = require("../middleware/verifyJWT");
const verifyUserRole = require("../middleware/verifyUserRole");

router.route("/products").get(productController.getProductByPages);
router.route("/products/all").get(productController.getAllProducts);
router.route("/products/:id").get(productController.getProductById);

router.use(verifyJWT, verifyUserRole("ADMIN"));

router.route("/products").post(productController.createProduct);
router.route("/products/bulk").post(productController.createProductsBulk);
router
  .route("/products/:id")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
