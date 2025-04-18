// import express from "express";
// import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";
// import { protect, verifyToken } from "../middelwares/authMiddleware.js";

// const router = express.Router()


// // router.get("/", protect, getProduct);
// router.get('/products', verifyToken, async (req, res) => {
//     try {
//       const products = await Product.find({ user: req.user.id });
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
// router.post("/", protect, createProduct);
// router.put("/:id", protect, updateProduct);
// router.delete("/:id", protect, deleteProduct);

// export default router
import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} from "../controller/product.controller.js";
import { protect } from "../middlewares/authMiddleware.js"; // Fix typo in "middlewares"
import {Product} from "../models/product.model.js"; // Ensure Product model is imported

const router = express.Router();

// Get all products for logged-in user
router.get("/products", protect, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Create new product
router.post("/", protect, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      user: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({
      success: false,
      message: "Invalid product data"
    });
  }
});

// Update product
router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({
      success: false,
      message: "Error updating product"
    });
  }
});

// Delete product
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

export default router;