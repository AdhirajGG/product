// path: Backend/models/product.model.js
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use a secure secret in production
export const protect = (req, res, next) => {
  let token;
  // Extract token from headers
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
    console.log("[Middleware] Token extracted from header:", token); // ✅ Debug
  }

  if (!token) {
    console.error("[Middleware] No token provided"); // ✅ Debug
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("[Middleware] Decoded Token Payload:", decoded); // ✅ Debug
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    console.error("[Middleware] Token verification failed:", error.message); // ✅ Debug
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};

