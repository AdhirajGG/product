import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
    try {
      // Use "new" to create an ObjectId from req.user._id
      const products = await Product.find({ userId: new mongoose.Types.ObjectId(req.user._id) });
      console.log("Fetching products for user:", req.user._id);
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
export const createProduct = async (req, res) => {
    const productData = {
        ...req.body,
        userId: req.user._id
    };

    if (!productData.name || !productData.price || !productData.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log("Error in creating product", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product ID' });
    }

    try {
        const product = await Product.findOne({ _id: id, userId: req.user._id });
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found or unauthorized' 
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            productData, 
            { new: true, runValidators: true }
        );
        
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product ID' });
    }

    try {
        const product = await Product.findOne({ _id: id, userId: req.user._id });
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found or unauthorized' 
            });
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};