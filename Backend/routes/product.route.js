import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";
import { protect } from "../middelwares/authMiddleware.js";

const router = express.Router()


router.get('/', getProduct)

router.post("/", protect, createProduct);

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)
export default router