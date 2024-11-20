import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Box } from '@chakra-ui/react';
import ProductForm from './Products/ProductForm.jsx';
import ProductList from './Products/ProductList';
import {productService} from '@/services/productsService.jsx';
import SidebarWithHeader from "@/components/shared/SideBar.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchProducts = async () => {
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSave = async (product) => {
        try {
            if (currentProduct) {
                await productService.updateProduct({ ...currentProduct, ...product });
                setProducts(products.map(p => p.id === currentProduct.id ? { ...currentProduct, ...product } : p));
            } else {
                const newProduct = await productService.createProduct(product);
                setProducts([...products, newProduct]);
            }
            setCurrentProduct(null);
            onClose();
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        onOpen();
    };

    const handleDelete = async (product) => {
        try {
            await productService.deleteProduct(product.id);
            fetchProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const handleAddProduct = () => {
        setCurrentProduct(null);
        onOpen();
    };

    return (
        <SidebarWithHeader>
            <Box m={8}>
                <h1>Painel produtos</h1>
                <Button my={4} colorScheme="blue" onClick={handleAddProduct}>Add Product</Button>
                <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete}/>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>{currentProduct ? 'Edit Product' : 'Add Product'}</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <ProductForm product={currentProduct} onSave={handleSave} onClose={onClose}/>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </SidebarWithHeader>
    );
};

export default Products;