import React, { useState } from 'react';
import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Tag,
    VStack,
    Td, HStack
} from '@chakra-ui/react';
import { FaCheck } from "react-icons/fa";
import OrderModal from '../Orders/OrderModal';
import {green} from "vite-plugin-pwa/dist/chunk-UB6OAFZF.js";

const UserModal = ({ isOpen, onClose, selectedUser, orders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setIsOrderModalOpen(true);
    };

    const closeOrderModal = () => {
        setSelectedOrder(null);
        setIsOrderModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="4xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Informações do Usuário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedUser && (
                            <Box p={4} borderWidth="1px" borderRadius="lg">
                                <Text fontWeight="bold">Nome: {selectedUser.name}</Text>
                                <Text>Email: {selectedUser.email}</Text>
                                <Text>
                                    Endereço: {selectedUser.address ? `${selectedUser.address.line1}, ${selectedUser.address.line2}, ${selectedUser.address.city}, ${selectedUser.address.country}, ${selectedUser.address.postal_code}` : 'Nenhum endereço disponível'}
                                </Text>
                                <Text>NIF: {selectedUser.nif || 'Não disponível'}</Text>
                                <Text>Tipo: {selectedUser.role.join(', ')}</Text>
                                <HStack alignContent={"center"}>
                                    <FaCheck color={"green"} />
                                    <Text>Comunicação por email?</Text>
                                </HStack>
                            </Box>
                        )}
                        <VStack align="stretch" mt={4}>
                            {orders.map((order) => (
                                <Box key={order.id} p={2} borderWidth="1px" borderRadius="lg" onClick={() => handleOrderClick(order)} cursor="pointer">
                                    <Text>Pedido #{order.id}</Text>
                                    <Tag colorScheme="blue">{order.status}</Tag>
                                </Box>
                            ))}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <OrderModal
                isOpen={isOrderModalOpen}
                onClose={closeOrderModal}
                selectedOrder={selectedOrder}
            />
        </>
    );
};

export default UserModal;