const jwt = require("jsonwebtoken");

const verifyUserRole = (role) => {
  return (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.jwtSecretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          const userRole = decoded.role;
          if (userRole === role) {
            next();
          } else {
            return res.status(403).json({ message: "Forbidden" });
          }
        }
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

module.exports = verifyUserRole;
