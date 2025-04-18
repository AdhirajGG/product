// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import cors from "cors";
// import path from "path";
// import productRoutes from "./routes/product.route.js";  // Single import
// import authRoutes from "./routes/auth.js";  // Import authRoutes here

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"]
// }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);

// // Serve static files
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "Frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
// });

// // Error handling middleware (should come after routes)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error"
//   });
// });

// // Database connection
// connectDB();
// console.log("Environment:", process.env.NODE_ENV);
// console.log("JWT Secret:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ Missing");
// console.log("MongoDB URI:", process.env.MONGODB_URI?.substring(0, 25) + "...");

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// Backend/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

// Database connection
connectDB();

// Debug logs
console.log("Environment:", process.env.NODE_ENV);
console.log("JWT Secret:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ Missing");
console.log("MongoDB URI:", process.env.MONGODB_URI?.substring(0, 25) + "...");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});