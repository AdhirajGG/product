// import React, { useState } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Link,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// // Using Chakra UI's Input for styling purposes
// import { Input } from "@chakra-ui/react";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch("/api/auth/signup", { // Updated endpoint
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });
  
//       const data = await response.json();
  
//       if (!response.ok || !data.success) {
//         // Handle signup error (e.g., display a message)
//         console.error("Signup failed:", data.message || response.statusText);
//         return;
//       }
  
//       console.log("Signup successful:", data);
//       // Navigate to login page after successful signup
//       navigate("/login");
//     } catch (error) {
//       console.error("Error during signup:", error);
//     }
//   };
  
//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           mt: 8,
//           p: 4,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           boxShadow: 3,
//         }}
//       >
//         <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
//           Sign Up
//         </Typography>
//         <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1, width: "100%" }}>
//           <Input
//             placeholder="Name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             mb={4}  // Chakra spacing prop
//             w="100%"
//           />
//           <Input
//             placeholder="Email Address"
//             type="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             isRequired
//           />
//           <Input
//             placeholder="Password"
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             isRequired
//             minLength={6}
//           />

//           <Button
//             type="submit"
//             colorScheme="blue"
//             isLoading={isSubmitting}
//             loadingText="Creating Account..."
//           >
//             Sign Up
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link
//                 component="button"
//                 variant="body2"
//                 onClick={() => navigate("/login")}
//                 sx={{ textDecoration: "none" }}
//               >
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
import { Container, Box, Typography, Button, Grid, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext.jsx";
import toast, { Toaster } from "react-hot-toast";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Account created successfully! Please login");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account");
    }
  };

  return (
    <Container maxWidth="sm">
      <Toaster position="top-center" />
      <Box sx={{ mt: 8, p: 4, border: "1px solid #ccc", borderRadius: "8px", boxShadow: 3 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
          <Input 
            placeholder="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={4}
            w="100%"
          />
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;