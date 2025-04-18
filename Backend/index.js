import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.URL

// Serve static files from the React frontend app
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.URL || "http://localhost:5173", // Allow both prod and dev
  credentials: true, // Required for cookies/auth headers
}));

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.route.js";
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(express.static(path.join(__dirname, "Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend","dist", "index.html"));
});

// Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});