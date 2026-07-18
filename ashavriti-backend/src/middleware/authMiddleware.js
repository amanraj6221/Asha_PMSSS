// 📂 src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "No token provided. Please login.",
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "mySecretKey"
      );

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${requiredRole}`,
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired. Please login again.",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }
  };
};

export default authMiddleware;