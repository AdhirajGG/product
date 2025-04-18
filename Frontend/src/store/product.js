import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // Create Product
  createProduct: async (productData, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to create product" };
      }

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Fetch Products
  fetchProducts: async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch products" };
      }

      set({ products: Array.isArray(data.data) ? data.data : [] });
      return { success: true, data: data.data };

    } catch (error) {
      console.error("Error fetching products:", error);
      return { success: false, message: "Failed to fetch products" };
    }
  },

  // Delete Product
  deleteProduct: async (pid, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${pid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to delete product" };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: "Product deleted successfully" };

    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Failed to delete product" };
    }
  },

  // Update Product
  updateProduct: async (pid, updatedProduct, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to update product" };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };

    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Failed to update product" };
    }
  },
}));