const Cart = require("../model/Cart");
const Product = require("../model/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, updateType } = req.body;
    const user = req.userId;

    if (!productId || !quantity || !updateType) {
      return res.status(400).json({ message: "productId, quantity and updateType are required" });
    }

    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({ user, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      if (updateType === 'increment') {
        cart.products[productIndex].quantity += quantity;
      } else if (updateType === 'absolute') {
        cart.products[productIndex].quantity = quantity;
      }
      if (cart.products[productIndex].quantity <= 0) {
        cart.products.splice(productIndex, 1);
      }
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    const createdProduct = await Product.findById(productId);
    const responseProduct = {
      product: createdProduct,
      quantity: productIndex > -1 ? cart.products[productIndex].quantity : quantity,
    };

    res.status(200).json({
      message: "Product added to cart successfully",
      product: responseProduct,
    });
  } catch (error) {
    console.log("Error in addToCart controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const user = req.userId;
    // Check if the user is logged in or authenticated
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const cart = await Cart.findOne({ user }).populate("products.product");

    if (!cart) {
      return res.status(200).json([]);
    }

    res.status(200).json({
      message: "Cart retrieved successfully",
      products: cart.products,
    });
  } catch (error) {
    console.log("Error in getCart controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    // If cart not found, return 404
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.log("Error in removeFromCart controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
