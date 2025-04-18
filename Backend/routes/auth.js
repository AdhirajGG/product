import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

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
      { id: savedUser._id }, // 👈 Changed key from 'userId' to 'id'
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

// auth.js (corrected login route)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    // Debug: Confirm JWT_SECRET is loaded
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing!");
      throw new Error("JWT secret not configured");
    }
   
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { 
      expiresIn: "1h" 
    });

    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error - " + error.message 
    });
  }
});

// Logout Endpoint (JWT-based logout is handled on the client)
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
