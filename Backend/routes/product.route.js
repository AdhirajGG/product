// import express from "express";
// import {
//   createProduct,
//   deleteProduct,
//   getProducts,
//   updateProduct
// } from "../controller/product.controller.js";
// import { protect } from "../middlewares/authMiddleware.js"; // Fix typo in "middlewares"
// import Product from "../models/product.model.js";  // Match exact file name case

// const router = express.Router();

// // Get all products for logged-in user
// router.get("/products", protect, async (req, res) => {
//   try {
//     const products = await Product.find({ user: req.user._id });
//     res.status(200).json({
//       success: true,
//       data: products
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// });

// // Create new product
// router.post("/", protect, async (req, res) => {
//   try {
//     const product = await Product.create({
//       ...req.body,
//       user: req.user._id
//     });
    
//     res.status(201).json({
//       success: true,
//       data: product
//     });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(400).json({
//       success: false,
//       message: "Invalid product data"
//     });
//   }
// });

// // Update product
// router.put("/:id", protect, async (req, res) => {
//   try {
//     const product = await Product.findOneAndUpdate(
//       { _id: req.params.id, user: req.user._id },
//       req.body,
//       { new: true }
//     );

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product
//     });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(400).json({
//       success: false,
//       message: "Error updating product"
//     });
//   }
// });

// // Delete product
// router.delete("/:id", protect, async (req, res) => {
//   try {
//     const product = await Product.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user._id
//     });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully"
//     });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// });

// export default router;

// product.route.js
import express from "express";
import { 
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controller/product.controller.js"; // Verify exact file name case
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Use controller functions directly
router.get("/products", protect, getProducts);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;