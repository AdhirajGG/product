// path: Frontend/src/Components/ProductList.jsx
import { useEffect } from 'react';
import { 
  Container,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { useAuth } from '../Context/AuthContext.jsx';
import { useProductStore } from '../store/product.js';
import ProductCard from './ProductCard';

const ProductList = () => {
  const toast = useToast();
  const { token } = useAuth();
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    const loadProducts = async () => {
      if (token) {
        const { success, message } = await fetchProducts(token);
        if (!success) {
          toast({
            title: 'Error loading products',
            description: message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };
    loadProducts();
  }, [token, fetchProducts, toast]);

  const handleRefreshProducts = () => {
    fetchProducts(token);
  };

  if (isLoading) {
    return (
      <Container maxW="container.lg" mt={8}>
        <Flex justify="center" mt={8}>
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" mt={8}>
      <Heading mb={6} textAlign="center">Your Products</Heading>
      
      {products.length === 0 ? (
        <Text textAlign="center" fontSize="xl" color="gray.500">
          No products found. Add your first product!
        </Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {products.map((product) => (
            <ProductCard 
              key={product._id}
              product={product}
              onDeleteSuccess={handleRefreshProducts}
              onUpdateSuccess={handleRefreshProducts}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default ProductList;