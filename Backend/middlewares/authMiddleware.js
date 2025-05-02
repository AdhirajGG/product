import jwt from "jsonwebtoken";
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Must match!
const JWT_SECRET = "your_jwt_secret";
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
    const decoded = jwt.verify(token, "your_jwt_secret");
    console.log("[Middleware] Decoded Token Payload:", decoded); // ✅ Debug
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    console.error("[Middleware] Token verification failed:", error.message); // ✅ Debug
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};

// export const protect = (req, res, next) => {
//   let token;
//   console.log("Extracted Token:", token);   // Debug: Check if token is extracted correctly
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies && req.cookies.token) {
//     token = req.cookies.token;
//   }

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
//     req.user = { _id: decoded.userId }; // Make sure your token payload has 'userId'
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return res.status(401).json({ success: false, message: "Not authorized, token failed" });
//   }
// };