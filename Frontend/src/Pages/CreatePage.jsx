
import React, { useState } from "react";
import { Container, Box, Heading, VStack, Button } from "@chakra-ui/react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createProduct } = useProductStore();
  const { user, token } = useAuth();
  const navigate = useNavigate(); // Add navigate hook

  const handleAddProduct = async () => {
    if (!user || !token) {
      toast.error("You must be logged in to create a product.");
      return;
    }
  
    // Add input validation
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill all fields");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const numericPrice = parseFloat(newProduct.price);
      if (isNaN(numericPrice)) {
        throw new Error("Invalid price format");
      }
  
      const { success, data } = await createProduct(
        { ...newProduct, 
          price: numericPrice,
          userId: user._id },
        token // Pass token explicitly
      );
  
      if (success) {
        toast.success("Product created successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
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
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              colorScheme="blue"
              onClick={handleAddProduct}
              w="full"
              isLoading={isSubmitting} // Use dedicated loading state
              loadingText="Creating..."
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