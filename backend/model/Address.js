const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    addresslineOne: { type: String, required: true },
    addressLineTwo: { type: String },
    phoneNumber: { type: String, required: true },
    alternativePhoneNumber: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    landMark: { type: String },
    addressType: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
