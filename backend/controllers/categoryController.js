const Category = require("../model/Category");

const Product = require("../model/Product");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addManyCategories = async (req, res) => {
  try {
    const categories = req.body;
    const savedCategories = await Category.insertMany(categories);
    res.status(201).json({
      message: "Categories saved successfully",
      categories: savedCategories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    // Check if category is associated with any products
    const associatedProducts = await Product.find({ category: category._id });
    if (associatedProducts.length > 0) {
      return res.status(400).json({
        message: "Category cannot be deleted as it is associated with products",
      });
    }
    await Category.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  addManyCategories,
  getCategories,
  updateCategory,
  deleteCategory,
};
