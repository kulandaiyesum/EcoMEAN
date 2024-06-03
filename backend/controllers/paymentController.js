const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../model/Order");
const Cart = require("../model/Cart");

var razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Math.random()}`,
    };
    const order = await razorpayInstance.orders.create(options);
    if (!order) return res.status(500).send("Some error occurred");
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};
 
const verifyAndPlaceOrder = async (req, res) => {
  try {
    const {
      order,
      isSingleProductCheckout,
      original_order_id,
      razorpay_signature,
    } = req.body;
    const user = req.userId;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${original_order_id}|${order.paymentId}`);
    const digest = shasum.digest("hex");

    if (digest === razorpay_signature) {
      const newOrder = new Order({
        user,
        products: order.products,
        totalPrice: order.totalPrice,
        address: order.address,
        paymentId: order.paymentId,
        status: "placed",
      });

      await newOrder.save();

      if (
        isSingleProductCheckout === true ||
        isSingleProductCheckout === "true"
      ) {
        // Emplty block
      } else {
        await Cart.findOneAndUpdate({ user }, { products: [] });
      }

      res.status(200).json({ message: "Order placed successfully" });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error in verifyAndPlaceOrder controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    if (!orders) {
      return res.status(200).json([]);
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getOrderDetails controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const markAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.body;
    const status = "completed";

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error in markAsDelivered controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  verifyAndPlaceOrder,
  getOrderDetails,
  markAsDelivered,
};
