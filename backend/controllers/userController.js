const User = require("../model/User");
const bcrypt = require("bcrypt");

const getUserByToken = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById({ _id: userId }).select("-password");
    if (!user) {
      return res.status(204).json({ message: `No Users matches ID ${userId}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const resetpassword = async (req, res) => {
  const userId = req.userId;
  const { newPassword, oldPassword } = req.body;

  try {
    const user = await User.findById({ _id: userId }).exec();
    if (!user) {
      return res.status(204).json({ message: `No Users matches ID ${userId}` });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res
      .status(200)
      .json({ message: "Password has been updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "ADMIN" } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUserByToken, resetpassword, getAllUsers };
