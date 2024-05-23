const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyUserRole = require("../middleware/verifyUserRole");

router
  .route("/category")
  .post(verifyJWT, verifyUserRole("ADMIN"), categoryController.createCategory);

router
  .route("/category/:id")
  .all(verifyJWT, verifyUserRole("ADMIN"))
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

router
  .route("/categories")
  .get(categoryController.getCategories)
  .post(
    verifyJWT,
    verifyUserRole("ADMIN"),
    categoryController.addManyCategories
  );

module.exports = router;
