const Product = require("../model/Product");
const Category = require("../model/Category");
// const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  try {
    const { name, actualPrice, category, images, brand, discountedPrice } =
      req.body;
    if (
      !name ||
      !actualPrice ||
      !category ||
      !images ||
      !brand ||
      !discountedPrice
    ) {
      return res.status(400).json({
        message: "Fill all the details",
      });
    }

    const product = await Product.create(req.body);
    await product.populate("category");
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createProductsBulk = async (req, res) => {
  const products = req.body;
  try {
    await Product.insertMany(products);
    const createdProducts = await Product.find().populate("category");
    res.status(201).json(createdProducts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const getProductByPages = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find()
      .populate("category")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments();

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductsBulk,
  getProductByPages
};
