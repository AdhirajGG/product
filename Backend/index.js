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
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
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
const PORT = process.env.PORT || 5000;

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

// Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});