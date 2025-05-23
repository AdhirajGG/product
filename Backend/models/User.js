// path: Backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, "Password is required"] 
  }
}, {
  timestamps: true
});

export default mongoose.model("User", UserSchema);