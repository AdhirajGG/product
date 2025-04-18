
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

    setIsSubmitting(true);

    try {
      const { success, message } = await createProduct({
        ...newProduct,
        userId: user.id
      }, token);

      if (success) {
        toast.success(message);
        setNewProduct({ name: "", price: "", image: "" });
        // Redirect after successful creation
        navigate("/", {
          state: { refresh: true }, // Optional: Trigger data refresh
          replace: true
        });
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error creating product. Please try again.");
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