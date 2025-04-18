import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React frontend app
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.route.js";
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend","dist", "index.html"));
});

// Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});