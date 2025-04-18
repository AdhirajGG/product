import React, { createContext, useContext, useState, useEffect } from "react";
import { useProductStore } from "../store/product.js"; // Add this import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      
      if (storedToken && storedUser) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        // Auto-fetch products on initial load
        await useProductStore.getState().fetchProducts(storedToken);
      }
    };
    initializeAuth();
  }, []);

  const login = async (userData, authToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
    // Fetch products after login
    await useProductStore.getState().fetchProducts(authToken);
  };

  const logout = () => {
    // Clear all storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("products");
    
    // Reset state
    setUser(null);
    setToken(null);
    
    // Clear product store
    useProductStore.getState().setProducts([]);
    
    // Force refresh
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);