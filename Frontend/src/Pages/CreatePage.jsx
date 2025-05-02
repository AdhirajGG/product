// // path: Frontend/src/Pages/CreatePage.jsx
// import React, { useState } from "react";
// import { Container, Box, Heading, VStack, Button } from "@chakra-ui/react";
// import toast, { Toaster } from "react-hot-toast";
// import { useColorModeValue } from "../Components/ui/color-mode";
// import { useProductStore } from "../store/product";
// import { useAuth } from "../Context/AuthContext.jsx"; // Adjust the path as needed
// import { Input } from "@chakra-ui/react";

// const CreatePage = () => {
//   const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
//   const { createProduct } = useProductStore();
//   const { user } = useAuth(); // Retrieve the logged-in user

//   const handleAddProduct = async () => {
//     if (!user) {
//       toast.error("You must be logged in to create a product.");
//       return;
//     }

//     // Attach userId to the product data so it is associated with the current user
//     // const productData = { ...newProduct, userId: user.id };
//     const productData = { ...newProduct };

//     try {
//       const { success, message } = await createProduct(productData);

//       if (!success) {
//         toast.error(message);
//       } else {
//         toast.success(message);
//       }
//     } catch (error) {
//       console.error("Error creating product:", error);
//       toast.error("Error creating product. Please try again.");
//     }
//   };

//   return (
//     <Container maxW="container.sm">
//       <Toaster position="bottom-center" reverseOrder={false} />
//       <VStack spacing={8}>
//         <Heading as="h1" size="2xl" textAlign="center" mb={8}>
//           Create New Product
//         </Heading>
//         <Box
//           w="full"
//           bg={useColorModeValue("white", "gray.900")}
//           p={6}
//           rounded="lg"
//           shadow="md"
//         >
//           <VStack spacing={4}>
//             <Input
//               placeholder="Product Name"
//               value={newProduct.name}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, name: e.target.value })
//               }
//             />
//             <Input
//               placeholder="Price"
//               type="number"
//               value={newProduct.price}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, price: e.target.value })
//               }
//             />
//             <Input
//               placeholder="Image"
//               value={newProduct.image}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, image: e.target.value })
//               }
//             />
//             <Button colorScheme="blue" onClick={handleAddProduct} w="full">
//               Add Product
//             </Button>
//           </VStack>
//         </Box>
//       </VStack>
//     </Container>
//   );
// };

// export default CreatePage;

import React, { useState } from "react";
import { Container, Box, Heading, VStack, Button, Text } from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { useColorModeValue } from "../Components/ui/color-mode";
import { useProductStore } from "../store/product";
import { useAuth } from "../Context/AuthContext.jsx";
import { Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    price: "", 
    image: "" 
  });
  
  const { createProduct } = useProductStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    if (!user) {
      toast.error("You must be logged in to create a product.");
      return;
    }

    if (!newProduct.image) {
      toast.error("Please provide an image URL");
      return;
    }

    try {
      const { success, message } = await createProduct(newProduct);

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error creating product. Please try again.");
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setNewProduct({...newProduct, image: url});
  };

  return (
    <Container maxW="container.sm">
      <Toaster position="bottom-center" reverseOrder={false} />
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.900")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />

            <Input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleImageUrlChange}
            />

            {/* Image Preview Section */}
            <Box
              w="100%"
              h="400px"
              border="2px dashed"
              borderColor={useColorModeValue("gray.200", "gray.600")}
              borderRadius="lg"
              overflow="hidden"
              position="relative"
              mt={4}
            >
              {newProduct.image ? (
                <img 
                  src={newProduct.image}
                  alt="Product preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "8px"
                  }}
                />
              ) : (
                <Box
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={useColorModeValue("gray.500", "gray.400")}
                >
                  Enter an image URL to see preview
                </Box>
              )}
            </Box>

            <Button 
              colorScheme="blue" 
              onClick={handleAddProduct} 
              w="full"
              mt={6}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;