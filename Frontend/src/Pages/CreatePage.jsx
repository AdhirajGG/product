import React, { useState } from "react";
import { Container, Box, Heading, VStack } from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { useColorModeValue } from "../Components/ui/color-mode";
import { useProductStore } from "../store/product";
import { useAuth } from "../Context/AuthContext.jsx"; // Get the logged-in user
import { Input } from "@chakra-ui/react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const { createProduct } = useProductStore();
  const { user } = useAuth(); // Retrieve current user from auth context

  const handleAddProduct = async () => {
    if (!user) {
      toast.error("You must be logged in to create a product.");
      return;
    }

    try {
      // Attach userId to the product details
      const productData = { ...newProduct, userId: user.id };
      const { success, message } = await createProduct(productData);

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error creating product. Please try again.");
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
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Image"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
