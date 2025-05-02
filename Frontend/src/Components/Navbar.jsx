// // Navbar.jsx
// import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
// import React from "react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { FaPlusSquare } from "react-icons/fa";
// import { useCustomTheme } from "../hooks/useCustomTheme";
// import { useColorModeValue } from "./ui/color-mode.jsx";
// import { useAuth } from "../Context/AuthContext.jsx"; // Ensure the correct path

// const Navbar = () => {
//   const { theme, toggleTheme } = useCustomTheme();
//   const bg = useColorModeValue("gray.200", "gray.900");
//   const navigate = useNavigate();
//   const { user, logout } = useAuth(); // Get user state and logout function

//   const handleLogout = () => {
//     // Clear all auth-related data
//     logout();
    
//     // Clear any product-related local storage
//     localStorage.removeItem("products");

//     // Clear React Query cache (if using)
//     // queryClient.clear();
    
//     // Force hard redirect to clear all cached data
//     window.location.assign("/login");
//   };

//   return (
//     <Container maxW="full" px={4} bg={bg}>
//       <Flex
//         h={16}
//         alignItems="center"
//         justifyContent="space-between"
//         flexDir={{ base: "column", sm: "row" }}
//       >
//         <Text
//           fontSize={{ base: "22px", sm: "28px" }}
//           fontWeight="bold"
//           textAlign="center"
//           textTransform="uppercase"
//           bgGradient="linear-gradient(to right, #00B5D8, #3182CE)"
//           textColor="transparent"
//           bgClip="text"
//         >
//           <RouterLink to="/">ToBuyProducts 🛒</RouterLink>
//         </Text>

//         <HStack spacing={2} alignItems="center">
//           <RouterLink to="/create">
//             <Button variant="outline">
//               <FaPlusSquare size={20} />
//             </Button>
//           </RouterLink>

//           {user ? (
//             <>
//               <Text>{`Hello, ${user.name}`}</Text>
//                <Button 
//                 onClick={handleLogout} 
//                 colorScheme="red"
//               >
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button as={RouterLink} to="/login" variant="solid" colorScheme="blue">
//                 Login
//               </Button>
//               <Button as={RouterLink} to="/signup" variant="solid" colorScheme="blue">
//                 Sign Up
//               </Button>
//             </>
//           )}

//           <Button onClick={toggleTheme}>
//             {theme === "dark" ? "🌙" : "☀️"}
//           </Button>
//         </HStack>
//       </Flex>
//     </Container>
//   );
// };

// export default Navbar;

// Navbar.jsx
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { useCustomTheme } from "../hooks/useCustomTheme";
import { useColorModeValue } from "./ui/color-mode.jsx";
import { useAuth } from "../Context/authContext.jsx"; // Ensure the correct path

const Navbar = () => {
  const { theme, toggleTheme } = useCustomTheme();
  const bg = useColorModeValue("gray.200", "gray.900");
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user state and logout function

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxW="full" px={4} bg={bg}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
          bgGradient="linear-gradient(to right, #00B5D8, #3182CE)"
          textColor="transparent"
          bgClip="text"
        >
          <RouterLink to="/">ToBuyProducts 🛒</RouterLink>
        </Text>

        <HStack spacing={2} alignItems="center">
          <RouterLink to="/create">
            <Button variant="outline">
              <FaPlusSquare size={20} />
            </Button>
          </RouterLink>

          {user ? (
            <>
              <Text>{`Hello, ${user.name}`}</Text>
              <Button onClick={handleLogout} colorScheme="red">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" variant="solid" colorScheme="blue">
                Login
              </Button>
              <Button as={RouterLink} to="/signup" variant="solid" colorScheme="blue">
                Sign Up
              </Button>
            </>
          )}

          <Button onClick={toggleTheme}>
            {theme === "dark" ? "🌙" : "☀️"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
