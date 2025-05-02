
// import express from "express";
// import { 
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct
// } from "../controller/product.controller.js"; // Verify exact file name case
// import { protect } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Use controller functions directly
// router.get("/products", protect, getProducts);
// router.post("/", protect, createProduct);
// router.put("/:id", protect, updateProduct);
// router.delete("/:id", protect, deleteProduct);

// export default router;

import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";
// import { protect } from "../middelwares/authMiddleware.js";\
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router()


router.get("/", protect, getProduct);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

// router.get("/", (req, res) => {
//     console.log("GET /api/products called");
//     res.json({ message: "Products fetched" });
//   });

export default router