const jwt = require("jsonwebtoken");

const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.jwtSecretKey, { expiresIn });
};

const generateTokenAndSetCookie = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, process.env.jwtSecretKey, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = { generateToken, generateTokenAndSetCookie };
