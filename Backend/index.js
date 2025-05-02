// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import path from "path";
// import cors from "cors";
// import authRoutes from "./routes/auth.js";
// import productRoutes from "./routes/product.route.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// app.use(express.json()); // Allow JSON data in req.body
// app.use(cors());

// // Mount routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);

// // Serve static files in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/Frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
//   });
// }

// // Debug logs
// console.log("Environment:", process.env.NODE_ENV);
// console.log("JWT Secret:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ Missing");
// console.log("MongoDB URI:", process.env.MONGODB_URI?.substring(0, 25) + "...");

// app.listen(PORT, () => {
//   connectDB();
//   console.log("Server connected to:" + PORT);
// });


import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // ✅ Already present
  exposedHeaders: ["set-cookie"], // Add if needed
  allowedHeaders: ["Content-Type", "Authorization"], // Add this
}));

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.route.js";
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5000;
// Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
