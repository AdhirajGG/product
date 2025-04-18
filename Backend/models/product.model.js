// import mongoose, { Schema } from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

// }, { timestamps: true })//createdAT , updatedAT

// const Product = mongoose.model('Product',productSchema)//create a model"Product" by looking at 
// //the schema of productSchema

// export default Product
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }
}, { timestamps: true });

// Correct default export
const Product = mongoose.model('Product', productSchema);
export default Product;  // This is correct