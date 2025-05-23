// path: Backend/index.js

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // ✅ Already present
  exposedHeaders: ["set-cookie"], // Add if needed
  allowedHeaders: ["Content-Type", "Authorization"], // Add this  
}));

// Add this code ABOVE your routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.route.js";
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Handle client-side routing - return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
// Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
