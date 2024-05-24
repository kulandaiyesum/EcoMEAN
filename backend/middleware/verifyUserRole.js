const jwt = require("jsonwebtoken");

const verifyUserRole = (role) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.jwtSecretKey);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const userRole = decoded.role;
    if (userRole === role) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = verifyUserRole;
