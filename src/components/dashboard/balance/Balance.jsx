import React, { useState } from 'react';
import { Input, Stack, Button, Text, Box, Heading, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, List, ListItem, Tag, Select } from "@chakra-ui/react";
import { formatCurrency } from "@/components/utilities/formatCurrency.jsx";
import { useAuth } from "@/context/AuthContext.jsx";

const Balance = ({ balanceData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { customer } = useAuth();
    const [formData, setFormData] = useState({
        id: '',
        orderId: '',
        userId: customer.id,
        date: '',
        description: '',
        amount: '',
        type: 'INCOME',
        category: ''
    });
    const [balanceState, setBalanceData] = useState(balanceData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDetails = [...balanceState.details, { ...formData, id: balanceState.details.length + 1 }];
        setBalanceData({ ...balanceState, details: updatedDetails });
        setFormData({
            id: '',
            orderId: '',
            userId: customer.id,
            date: '',
            description: '',
            amount: '',
            type: 'INCOME',
            category: ''
        });
        onClose();
    };

    const handleEdit = (detail) => {
        setFormData(detail);
        onOpen();
    };

    const handleDelete = (id) => {
        const updatedDetails = balanceState.details.filter(detail => detail.id !== id);
        setBalanceData({ ...balanceState, details: updatedDetails });
    };

    return (
        <Stack>
            <Text textAlign={"center"}><Heading>Caixa</Heading></Text>
            <HStack columns={{ sm: 3, md: 4, lg: 5 }} alignSelf="center" alignItems="center" spacing={4}>
                <Box>
                    <Box bgColor={`green.50`} borderColor={`green.500`} borderWidth={"3px"} p={4} borderRadius="md">
                        <Heading size='md' color={`green.500`}>Entradas</Heading>
                        <Box fontSize={"4xl"} fontWeight={"semibold"} color={`green.500`}>
                            {formatCurrency(balanceState.expenses/100)}
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box bgColor={`red.50`} borderColor={`red.500`} borderWidth={"3px"} p={4} borderRadius="md">
                        <Heading size='md' color={`red.500`}>Saídas</Heading>
                        <Box fontSize={"4xl"} fontWeight={"semibold"} color={`red.500`}>
                            {formatCurrency(balanceState.income/100)}
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box bgColor={`blue.50`} borderColor={`blue.500`} borderWidth={"3px"} p={4} borderRadius="md">
                        <Heading size='md' color={`blue.500`}>Balanço</Heading>
                        <Box fontSize={"4xl"} fontWeight={"semibold"} color={`blue.500`}>
                            {formatCurrency(balanceState.balance/100)}
                        </Box>
                    </Box>
                </Box>
            </HStack>
            <Text textAlign={"center"}><Heading>Lançamentos</Heading></Text>
            <Button onClick={onOpen} size={"sm"} colorScheme="blue" my={4}>Add Balance Change</Button>
            <List spacing={3}>
                {balanceState.details.map(detail => (
                    <ListItem key={detail.id} px={4} >
                        <HStack justifyContent="space-between" borderBottom="1px solid #ccc">
                            <Box>
                                <Text fontWeight="bold">{detail.description}</Text>
                                <Text>{detail.date} - {formatCurrency(detail.amount/100)} - {detail.category}</Text>
                            </Box>
                            <Tag colorScheme={detail.type === 'EXPENSE' ? 'red' : 'green'}>
                                {detail.type}
                            </Tag>
                            <Button size={"sm"} onClick={() => handleEdit(detail)} colorScheme="blue">Edit</Button>
                            <Button size={"sm"} onClick={() => handleDelete(detail.id)} colorScheme="red">Delete</Button>
                        </HStack>
                    </ListItem>
                ))}
            </List>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add/Edit Balance</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <Input type="text" name="orderId" value={formData.orderId} onChange={handleInputChange} placeholder="Order ID" mb={2} />
                            <Input type="date" name="date"  value={formData.date} onChange={handleInputChange} placeholder="Date" mb={2} required />
                            <Input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" mb={2} required />
                            <Input type="number" name="amount" value={formData.amount} onChange={handleInputChange} placeholder="Amount" mb={2} required/>
                            <Select name="type" value={formData.type} onChange={handleInputChange} mb={2}>
                                <option value="INCOME">INCOME</option>
                                <option value="EXPENSE">EXPENSE</option>
                            </Select>
                            <Input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" mb={2} required/>
                            <Button type="submit" colorScheme="blue" mt={4}>Add/Update</Button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    );
};

export default Balance;