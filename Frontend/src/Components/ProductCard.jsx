import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiX, FiCheck } from "react-icons/fi";
import Modal from "react-modal";
import { useProductStore } from "../store/product.js";
import { Atom } from "react-loading-indicators";

Modal.setAppElement("#root");

const ProductCard = ({ product }) => {
  const colors = {
    textLight: "#4a5568",
    textDark: "#e2e8f0",
    bgLight: "#ffffff",
    bgDark: "#1a202c",
    blue: "#3182ce",
    red: "#e53e3e",
    gray200: "#e2e8f0"
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  useEffect(() => {
    setUpdatedProduct(product);
  }, [isModalOpen, product]);

  // const handleDeleteProduct = async (pid) => {
  //   const { success, message } = await deleteProduct(pid);
  //   toast[success ? "success" : "error"](message);
  // };
  const handleDeleteProduct = async (pid) => {
    setIsLoading(true);
    try {
      const { success, message } = await deleteProduct(pid);
      toast[success ? "success" : "error"](message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const { success, message } = await updateProduct(
        product._id,
        updatedProduct
      );

      if (success) {
        toast.success(message || "Product updated successfully!");
        setIsModalOpen(false);
      } else {
        toast.error(message || "Failed to update product");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const CustomCard = ({ children }) => (
    <div style={{
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      margin: '0.5rem',
      padding: '1rem',
      backgroundColor: colors.bgLight,
      minHeight: '420px'
    }}>
      {children}
    </div>
  );

  const CustomInput = ({ label, ...props }) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: colors.textLight,
        marginBottom: '0.5rem'
      }}>
        {label}
      </label>
      <input style={{
        width: '100%',
        padding: '0.75rem',
        borderRadius: '0.375rem',
        border: `1px solid ${colors.gray200}`,
        fontSize: '1rem',
        transition: 'border-color 0.2s',
        outline: 'none'
      }} {...props} />
    </div>
  );

  return (
    <CustomCard>
      <Toaster position="bottom-center" reverseOrder={false} />

      <img
        src={product.image}
        alt={product.name}
        style={{
          height: '16rem',
          width: '100%',
          objectFit: 'cover',
          borderRadius: '0.375rem',
          minHeight: '250px'
        }}
        onError={(e) => {
          e.target.onerror = null; // prevent infinite loop if fallback fails
          e.target.src = "https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9hcmR8ZW58MHx8MHx8fDA%3D";
        }}
      />

      <div style={{ padding: '1rem' }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          color: colors.textLight
        }}>
          {product.name}
        </h3>

        <p style={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          color: colors.textLight,
          marginBottom: '1rem'
        }}>
          ${product.price}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: colors.blue,
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FaEdit />
          </button>
          {/* <button
            onClick={() => handleDeleteProduct(product._id)}
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: colors.red,
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FaTrash />
          </button> */}
          <button
            onClick={() => handleDeleteProduct(product._id)}
            disabled={isLoading}
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              color: 'white',
              border: 'none',
              // ... existing styles
              backgroundColor: isLoading ? '#a0aec0' : colors.red,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <Atom color="#ffffff" size="small" />
            ) : (
              <FaTrash />
            )}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Product"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            zIndex: 1500,
          },
          content: {
            maxWidth: "500px",
            width: "90%",
            margin: "auto",
            padding: "0",
            borderRadius: "16px",
            border: "none",
            backgroundColor: "#f8fafc",
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.18)",
            transform: "scale(1)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            maxHeight: "90vh",
            overflowY: "auto"
          },
        }}
      >
        <div style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <FaEdit style={{ width: '2rem', height: '2rem', color: colors.blue }} />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: colors.textLight,
              margin: '1rem 0'
            }}>
              Edit Product
            </h3>
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: colors.gray200,
              margin: '1rem 0'
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <CustomInput
              label="Product Name"
              placeholder="Enter product name"
              value={updatedProduct.name}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
            />

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: colors.textLight,
                marginBottom: '0.5rem'
              }}>
                Price
              </label>
              <div style={{ display: 'flex' }}>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#f7fafc',
                  border: `1px solid ${colors.gray200}`,
                  borderRight: 'none',
                  borderTopLeftRadius: '0.375rem',
                  borderBottomLeftRadius: '0.375rem'
                }}>
                  $
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  value={updatedProduct.price}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${colors.gray200}`,
                    borderLeft: 'none',
                    borderTopRightRadius: '0.375rem',
                    borderBottomRightRadius: '0.375rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <CustomInput
              label="Image URL"
              placeholder="https://example.com/image.jpg"
              value={updatedProduct.image}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
            />

            {updatedProduct.image && (
              <div style={{
                marginTop: '0.75rem',
                height: '250px',
                borderRadius: '0.375rem',
                border: `1px solid ${colors.gray200}`,
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src={updatedProduct.image}
                  alt="Product preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '2rem',
            position: 'sticky',
            bottom: '0',
            background: '#f8fafc',
            padding: '1rem 0',
            borderTop: `1px solid ${colors.gray200}`
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: '0.75rem 1.5rem',
                border: `1px solid ${colors.gray200}`,
                borderRadius: '0.375rem',
                backgroundColor: 'white',
                color: colors.textLight,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                ':hover': {
                  backgroundColor: '#f8fafc'
                }
              }}
            >
              <FiX /> Cancel
            </button>
            {/* <button
              onClick={handleUpdateProduct}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: colors.blue,
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: '#2b6cb0'
                }
              }}
            >
              <FiCheck /> Save Changes */}
            <button
              onClick={handleUpdateProduct}
              disabled={isLoading}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isLoading ? '#a0aec0' : colors.blue,
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: isLoading ? '#a0aec0' : '#2b6cb0'
                }
              }}
            >
              {isLoading ? (
                <Atom color="#ffffff" size="small" />
              ) : (
                <>
                  <FiCheck /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </CustomCard>
  );
};

export default ProductCard;