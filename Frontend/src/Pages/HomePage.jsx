
// import React, { useEffect, useState } from 'react';
// import { Container, SimpleGrid, Text, VStack, Box, Spinner } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
// import { useProductStore } from '../store/product';
// import ProductCard from '../Components/ProductCard.jsx';
// import { useAuth } from '../Context/AuthContext.jsx';

// const HomePage = () => {
//   const { fetchProducts, products, error } = useProductStore();
//   const { token } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         await fetchProducts(token);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     if (token) loadProducts();
//   }, [fetchProducts, token]);

//   return (
//     <Container maxW="container.xl" py={12}>
//       <VStack spacing={8}>
//         <Text
//           fontSize="3xl"
//           fontWeight="bold"
//           bgGradient="linear(to-r, blue.400, blue.600)"
//           bgClip="text"
//           textAlign="center"
//         >
//           Current Products 🚀
//         </Text>

//         {isLoading ? (
//           <Box textAlign="center" py={10}>
//             <Spinner size="xl" color="blue.500" />
//             <Text mt={4} color="gray.500">Loading products...</Text>
//           </Box>
//         ) : error ? (
//           <Text color="red.500" textAlign="center">
//             {error} -{' '}
//             <Link to="/" style={{ color: 'blue.500' }}>Try refreshing</Link>
//           </Text>
//         ) : products?.length > 0 ? (
//           <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
//             {products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </SimpleGrid>
//         ) : (
//           <Text fontSize="xl" textAlign="center" color="gray.500">
//             No products found 😢{' '}
//             <Link to="/create" style={{ color: 'blue.500' }}>
//               Create your first product
//             </Link>
//           </Text>
//         )}
//       </VStack>
//     </Container>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import { Container, SimpleGrid, Text, VStack, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../Components/ProductCard';
import { Atom } from 'react-loading-indicators';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore(); // Ensure products is initially an array!
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30px"
          fontWeight="bold"
          bgGradient="linear-gradient(to right, #00B5D8, #3182CE)"
          bgClip="text"
          textAlign="center"
        >
          Current Products 🚀
        </Text>

        {isLoading ? (
          <Box textAlign="center" py={10}>
            <Atom color="#3182CE" size="medium" />
            <Text mt={4} color="gray.500">
              Loading products...
            </Text>
          </Box>
        ) : (
          <>
            {products && products.length > 0 ? (
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={10}
                w="full"
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </SimpleGrid>
            ) : (
              <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                No products found 😢{" "}
                <Link to="/create">
                  <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                    Create a product
                  </Text>
                </Link>
              </Text>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;