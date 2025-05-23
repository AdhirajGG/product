// path: Frontend/src/Pages/LoginPage.jsx

import React, { useState } from "react";
import { Container, Box, Typography, Button, Grid, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useColorModeValue } from "../Components/ui/color-mode";
import { Input } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext.jsx";
import toast, { Toaster } from "react-hot-toast"; // Add toast import

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        login(data.user,data.token);
        console.log("Received Token:", data.token); // Debug: Check if token is received
        toast.success("Login successful!"); // Success notification
        navigate("/");
      } else {
        const errorMessage = data.message || "Invalid email or password";
        toast.error(errorMessage); // Error notification
        console.error("Login failed:", errorMessage);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Network error - failed to connect"); // Network error notification
    }
  };

  return (
    <Container maxWidth="sm">
      <Toaster position="top-center" /> {/* Add Toaster component */}
      <Box
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1, p: 2 }}>
          <Input
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
            w="100%"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb={4}
            w="100%"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
