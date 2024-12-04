import React from 'react';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const OrderModal = ({ isOpen, onClose, selectedOrder }) => {
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('orderModal.header')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {selectedOrder && (
                        <Box p={4} borderWidth="1px" borderRadius="lg">
                            <Text fontWeight="bold">{t('orderModal.orderId')}: {selectedOrder.id}</Text>
                            <Text>{t('orderModal.status')}: {selectedOrder.status}</Text>
                            <Text>{t('orderModal.total')}: €{selectedOrder.total}</Text>
                            <Text>{t('orderModal.createdAt')}: {new Date(selectedOrder.created_at).toLocaleString()}</Text>
                            <Text>{t('orderModal.note')}: {selectedOrder.note}</Text>
                            <Text>{t('orderModal.type')}: {selectedOrder.type}</Text>
                            <Text>{t('orderModal.variety')}: {selectedOrder.variety}</Text>
                            <Text>{t('orderModal.products')}:</Text>
                            {Array.isArray(selectedOrder.products) ? (
                                selectedOrder.products.map((product) => (
                                    <Box key={product.id} p={2} borderWidth="1px" borderRadius="lg" mb={2}>
                                        <Text>{t('orderModal.productName')}: {product.name}</Text>
                                        <Text>{t('orderModal.productSize')}: {product.size}</Text>
                                        <Text>{t('orderModal.productPrice')}: €{product.price}</Text>
                                        <Text>{t('orderModal.productQuantity')}: {product.quantity}</Text>
                                    </Box>
                                ))
                            ) : (
                                <Box p={2} borderWidth="1px" borderRadius="lg" mb={2}>
                                    <Text>{t('orderModal.productName')}: {selectedOrder.products.name}</Text>
                                    <Text>{t('orderModal.productImage')}: <img src={selectedOrder.products.image} alt={selectedOrder.products.name} /></Text>
                                    <Text>{t('orderModal.productPrice')}: €{selectedOrder.products.price}</Text>
                                    <Text>{t('orderModal.productVariety')}: {selectedOrder.products.variety}</Text>
                                    <Text>{t('orderModal.productDescription')}: {selectedOrder.products.description}</Text>
                                    <Text>{t('orderModal.productPeriodicity')}: {selectedOrder.products.periodicity_string}</Text>
                                </Box>
                            )}
                            {selectedOrder.receipt_url && (
                                <Text>
                                    <a href={selectedOrder.receipt_url} target="_blank" rel="noopener noreferrer">{t('orderModal.viewReceipt')}</a>
                                </Text>
                            )}
                        </Box>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        {t('orderModal.closeButton')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default OrderModal;