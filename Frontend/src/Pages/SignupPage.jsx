// import React, { useState } from "react";
// import { Container, Box, Typography, Button, Grid, Link } from "@mui/material";
// import { useNavigate, Link as RouterLink } from "react-router-dom";
// import { Input } from "@chakra-ui/react";
// import { useAuth } from "../Context/authContext.jsx";

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
//       const response = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json" 
//         },
//         body: JSON.stringify({ 
//           name, 
//           email, 
//           password 
//         }),
//       });
  
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || "Signup failed");
//       }
  
//       console.log("Signup successful:", data);
//       toast.success("Account created successfully! Please login");
//       navigate("/login");
  
//     } catch (error) {
//       console.error("Signup error:", error);
//       toast.error(error.message || "Failed to create account");
//     }
//   };
  

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, p: 4, border: "1px solid #ccc", borderRadius: "8px", boxShadow: 3 }}>
//         <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
//           Sign Up
//         </Typography>
//         <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
//           <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} mb={4} w="100%" />
//           <Input placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} mb={4} w="100%" />
//           <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} mb={4} w="100%" />
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
import { Container, Box, Typography, Button, Grid, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { useAuth } from "../Context/authContext.jsx";
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