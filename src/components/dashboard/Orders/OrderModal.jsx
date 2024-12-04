// src/components/dashboard/Orders/OrderModal.jsx
import React from 'react';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

const OrderModal = ({ isOpen, onClose, selectedOrder }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Order Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {selectedOrder && (
                        <Box p={4} borderWidth="1px" borderRadius="lg">
                            <Text fontWeight="bold">Order ID: {selectedOrder.id}</Text>
                            <Text>Status: {selectedOrder.status}</Text>
                            <Text>Total: ${selectedOrder.total}</Text>
                            <Text>Created At: {new Date(selectedOrder.created_at).toLocaleString()}</Text>
                            <Text>Note: {selectedOrder.note}</Text>
                            <Text>Type: {selectedOrder.type}</Text>
                            <Text>Variety: {selectedOrder.variety}</Text>
                            <Text>Products:</Text>
                            {Array.isArray(selectedOrder.products) ? (
                                selectedOrder.products.map((product) => (
                                    <Box key={product.id} p={2} borderWidth="1px" borderRadius="lg" mb={2}>
                                        <Text>Name: {product.name}</Text>
                                        <Text>Size: {product.size}</Text>
                                        <Text>Price: ${product.price}</Text>
                                        <Text>Quantity: {product.quantity}</Text>
                                    </Box>
                                ))
                            ) : (
                                <Box p={2} borderWidth="1px" borderRadius="lg" mb={2}>
                                    <Text>Name: {selectedOrder.products.name}</Text>
                                    <Text>Image: <img src={selectedOrder.products.image} alt={selectedOrder.products.name} /></Text>
                                    <Text>Price: ${selectedOrder.products.price}</Text>
                                    <Text>Variety: {selectedOrder.products.variety}</Text>
                                    <Text>Description: {selectedOrder.products.description}</Text>
                                    <Text>Periodicity: {selectedOrder.products.periodicity_string}</Text>
                                </Box>
                            )}
                            {selectedOrder.receipt_url && (
                                <Text>
                                    <a href={selectedOrder.receipt_url} target="_blank" rel="noopener noreferrer">View Receipt</a>
                                </Text>
                            )}
                        </Box>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default OrderModal;