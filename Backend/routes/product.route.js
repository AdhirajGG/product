import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";
import { protect } from "../middelwares/authMiddleware.js";

const router = express.Router()


// router.get("/", protect, getProduct);
router.get('/products', verifyToken, async (req, res) => {
    try {
      const products = await Product.find({ user: req.user.id });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router