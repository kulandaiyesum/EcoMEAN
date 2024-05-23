const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    console.log(authHeader);
    return res.sendStatus(401);
  }
  // console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.jwtSecretKey, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" }); // invalid token
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyJWT;
