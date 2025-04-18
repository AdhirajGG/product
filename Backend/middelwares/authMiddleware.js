// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   let token;
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

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
  
//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const token = authHeader.split(' ')[1];
  
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Forbidden' });
//     req.user = decoded;
//     next();
//   });
// };
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;
  
  // Check both Authorization header and cookies
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Not authorized, no token" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach full user object to request
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ 
      success: false, 
      message: "Not authorized, token failed" 
    });
  }
};