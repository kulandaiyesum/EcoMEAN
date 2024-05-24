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

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Invalid Token" });
    }

    const decoded = jwt.verify(token, process.env.jwtSecretKey);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid Token" });
    }

    // const user = await User.findById(decoded.userId).select("-password");

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    // req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { verifyJWT, protectRoute };
