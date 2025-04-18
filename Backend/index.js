//   import express from "express";
//   import dotenv from "dotenv";
//   import connectDB from "./config/db.js";
//   import cors from "cors";
//   import path from "path";
//   import productRoutes from "./routes/product.route.js";

//   dotenv.config();

//   const app = express();
//   const PORT = process.env.PORT || 5000;
//   const URL = process.env.URL || "http://localhost:5173"

//   // Serve static files from the React frontend app
//   const __dirname = path.resolve();

//   // Middleware
//   app.use(express.json());
//   app.use(cors({
//     origin: import.meta.env.VITE_CLIENT_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"]
//   }));

//   // Routes
//   import authRoutes from "./routes/auth.js";
//   import productRoutes from "./routes/product.route.js";
//   app.use("/api/auth", authRoutes);
//   app.use("/api/products", productRoutes);

//   app.use(express.static(path.join(__dirname, "Frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "Frontend","dist", "index.html"));
//   });

//   // Backend/index.js (after routes)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error"
//   });
// });

//   // Database connection
//   connectDB();

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/product.route.js";  // Single import
import authRoutes from "./routes/auth.js";  // Import authRoutes here

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL  || "http://localhost:5173";

// Middleware
app.use(express.json());
app.use(cors({
  origin: CLIENT_URL,  // Use Node.js environment variable
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

// Error handling middleware (should come after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

// Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});