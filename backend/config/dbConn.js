const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/mail-sender");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;