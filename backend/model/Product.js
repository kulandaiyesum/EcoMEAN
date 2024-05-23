const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  actualPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  quantity: { type: Number, required: true },
  images: { type: [String] },
  createdAt: { type: Date, default: Date.now },
});
// productSchema.virtual("category", {
//   ref: "Category",
//   localField: "category",
//   foreignField: "_id",
//   justOne: true,
//   options: { select: "name" },
// });
module.exports = mongoose.model("Product", productSchema);
