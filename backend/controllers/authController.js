const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const {
  generateToken,
  generateTokenAndSetCookie,
} = require("../utils/generateToken");
const {
  sendVerificationEmailForRegisteredUser,
  sendForgotPasswordMail,
} = require("../utils/emailHelper");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email)
    return res
      .status(400)
      .json({ message: "Username, password and email are required" });
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "user already exists" }); // confilct
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
    });
    const token = generateToken({ userId: newUser._id }, "30m");
    sendVerificationEmailForRegisteredUser(newUser, token);
    res
      .status(201)
      .json({ message: "User created. verification message sent to mail" });
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!user.verified) {
      const token = generateToken({ userId: user._id, role: user.role }, "30m");
      sendVerificationEmailForRegisteredUser(user, token);
      return res.status(403).send({
        message:
          "Before logging in, please verify your email by clicking the link sent to your inbox",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    generateTokenAndSetCookie(user._id, user.role, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send({ message: "Error logging in" });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.jwtSecretKey);
    const { userId } = decoded;
    const user = await User.findByIdAndUpdate(userId, { verified: true });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // res.send({ message: "Email verified successfully" });
    return res.redirect(302, `${process.env.FRONT_END_PORT}/login`);
  } catch (error) {
    res.status(500).send({ message: "Error verifying email" });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const token = generateToken({ userId: user._id, role: user.role }, "30m");
    sendForgotPasswordMail(user, token);
    res.status(200).json({ message: "verification link sent your mail" });
  } catch (error) {
    res.status(500).send({ message: "Somthing went wrong" });
  }
};

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.jwtSecretKey);
    const { userId } = decoded;
    const user = await User.findOne({ _id: userId }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password Updated sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal sever error" });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
};
