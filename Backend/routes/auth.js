// import express from "express";
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// // Signup Endpoint
// router.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // Check if a user with the email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     // Generate a JWT token (optional)
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // auth.js (corrected login route)
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
    
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid credentials" 
//       });
//     }

//     // Debug: Confirm JWT_SECRET is loaded
//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is missing!");
//       throw new Error("JWT secret not configured");
//     }
   
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { 
//       expiresIn: "1h" 
//     });

//     res.json({ 
//       success: true, 
//       token, 
//       user: { id: user._id, name: user.name, email: user.email } 
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal server error - " + error.message 
//     });
//   }
// });

// // Logout Endpoint (JWT-based logout is handled on the client)
// router.post("/logout", (req, res) => {
//   res.json({ success: true, message: "Logged out successfully" });
// });

// export default router;


import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_SECRET = "your_jwt_secret"; // Ensure this matches the secret used in your middleware
// Signup Endpoint
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error during signup"
    });
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Generated Token:", token); // Debug
    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Logout Endpoint (JWT-based logout is handled on the client)
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
