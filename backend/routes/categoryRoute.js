const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { protectRoute } = require("../middleware/verifyJWT");
const verifyUserRole = require("../middleware/verifyUserRole");

router
  .route("/category")
  .post(
    protectRoute,
    verifyUserRole("ADMIN"),
    categoryController.createCategory
  );

router
  .route("/category/:id")
  .all(protectRoute, verifyUserRole("ADMIN"))
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

router
  .route("/categories")
  .get(categoryController.getCategories)
  .post(
    protectRoute,
    verifyUserRole("ADMIN"),
    categoryController.addManyCategories
  );

module.exports = router;
