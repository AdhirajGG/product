// import React, { useState } from "react";
// import { Container, Box, Typography, Button, Grid, Link } from "@mui/material";
// import { useNavigate, Link as RouterLink } from "react-router-dom";
// import { Input } from "@chakra-ui/react";
// import { useAuth } from "../Context/AuthContext.jsx";
// import toast, { Toaster } from "react-hot-toast";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const SignupPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSignup = async (e) => {
//     e.preventDefault();
    
//     if (!name || !email || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/api/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || "Signup failed");
//       }

//       toast.success("Account created successfully! Please login");
//       navigate("/login");
//     } catch (error) {
//       console.error("Signup error:", error);
//       toast.error(error.message || "Failed to create account");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Toaster position="top-center" />
//       <Box sx={{ mt: 8, p: 4, border: "1px solid #ccc", borderRadius: "8px", boxShadow: 3 }}>
//         <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
//           Sign Up
//         </Typography>
//         <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
//           <Input 
//             placeholder="Full Name" 
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             mb={4}
//             w="100%"
//           />
//           <Input 
//             placeholder="Email Address" 
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             mb={4}
//             w="100%"
//           />
//           <Input 
//             placeholder="Password" 
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             mb={4}
//             w="100%"
//           />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//             Sign Up
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link component={RouterLink} to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
//                 Already have an account? Login
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default SignupPage;
import React, { useState } from "react";
import { Container, Box, Button, Stack, Link, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import toast, { Toaster } from "react-hot-toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || "Registration failed");

      toast.success("Account created successfully!");
      await login({ email: formData.email, password: formData.password });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.sm" py={8}>
      <Toaster position="top-center" />
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="md"
        bg="white"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
          Create New Account
        </Text>

        <Stack as="form" spacing={4} onSubmit={handleSubmit}>
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            isRequired
          />

          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            isRequired
          />

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            isRequired
            minLength={6}
          />

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Creating Account..."
          >
            Sign Up
          </Button>

          <Text textAlign="center" mt={4}>
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="blue.500">
              Log in here
            </Link>
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignupPage;