import { create } from "zustand";

// Correct environment variable usage
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useProductStore = create((set) => ({
  createProduct: async (productData, token) => {
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // MUST include this
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Fetch Products
  fetchProducts: async (token) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        set({ products: [] });
        return { success: false, message: data.message };
      }

      set({ products: data.data });
      return { success: true };
    } catch (error) {
      set({ products: [] });
      return { success: false, message: "Network error" };
    }
  },

  // Delete Product
  deleteProduct: async (pid, token) => {
    try {
      const response = await fetch(`${API_URL}/products/${pid}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid)
      }));
      return { success: true };
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  },

  // Update Product
  updateProduct: async (pid, updatedProduct, token) => {
    try {
      const response = await fetch(`${API_URL}/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        )
      }));
      return { success: true };
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  },
}));