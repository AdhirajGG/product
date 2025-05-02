// path: Frontend/src/Components/ProductList.jsx
import React, { createContext, useContext, useState } from "react";
import { useProductStore } from "../store/product";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token); // Store token
    setUser(userData);
  };

 
  const { resetProducts } = useProductStore(); 
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Clear token
    resetProducts();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

