const jwt = require("jsonwebtoken");

const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.jwtSecretKey, { expiresIn });
};
module.exports = { generateToken };
