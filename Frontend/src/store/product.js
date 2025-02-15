import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      console.log("Token in createProduct:", token); // Debug: Should log a valid token string

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(newProduct),
      });
      
      // Attempt to parse the response as JSON
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, message: data.message || "Failed to create product." };
      }
      
      // Update products state (ensure state.products is an array)
      set((state) => ({
        products: [...(Array.isArray(state.products) ? state.products : []), data.data],
      }));
      
      return { success: true, message: "Product Created Successfully." };
    } catch (error) {
      console.error("Error in createProduct:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  },

  fetchProducts: async () => {
    try {
      const token = localStorage.getItem("token")?.trim();
      console.log("Token in fetchProducts:", token); // Debug: Should log a valid token string
      const res = await fetch(`/api/products/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
      });
      const data = await res.json();
      set({ products: Array.isArray(data.data) ? data.data : [] });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ products: [] });
    }
  },

  deleteProduct: async (pid) => {
    try {
      const token = localStorage.getItem("token")?.trim();
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "An error occurred" };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const token = localStorage.getItem("token")?.trim();
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Server Error" };
    }
  },
}));
