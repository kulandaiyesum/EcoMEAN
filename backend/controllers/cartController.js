const Cart = require("../model/Cart");
const Product = require("../model/Product");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.userId;
    if (!productId) {
      return res.status(400).json({ message: "productId and user required" });
    }

    let cart = await Cart.findOne({ user });
    //  checking cart is already available for this user
    if (!cart) {
      cart = new Cart({ user, products: [] });
    }

    // Check if the product already exists in the cart
    if (cart.products.includes(productId)) {
      return res.status(400).json({ message: "Product already exists in cart" });
    } else {
      cart.products.push(productId);
    }
    await cart.save();
    const createdProduct = await Product.findById(productId);
    // await cart.populate("products.productId");
    res.status(200).json({ message: "Product added to cart successfully",product:createdProduct});
  } catch (error) {
    // eslint-disable-next-line no-console
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

    const cart = await Cart.findOne({ user }).populate("products");

    if (!cart) {
      return res.status(200).json([]);
    }

    res
      .status(200)
      .json({
        message: "Cart retrieved successfully",
        products: cart.products,
      });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getCart controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId } = req;
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
      (product) => product.toString() !== productId
    );
    await cart.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in removeFromCart controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
