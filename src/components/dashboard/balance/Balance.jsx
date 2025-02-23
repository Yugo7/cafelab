import React, {useEffect, useState} from 'react';
import {
    Input,
    Stack,
    Button,
    Text,
    Box,
    Heading,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    List,
    ListItem,
    Tag,
    Select,
    Spinner,
    Grid,
    GridItem, SimpleGrid
} from "@chakra-ui/react";
import {FaRegSquarePlus} from "react-icons/fa6";
import {formatCurrency} from "@/components/utilities/formatCurrency.jsx";
import {useAuth} from "@/context/AuthContext.jsx";
import AnalyticsService from "@/services/AnalyticsService.jsx";
import BalanceService from "@/services/balanceService.js";
import BalanceEditModal from "@/components/dashboard/balance/BalanceEditModal.jsx";

const Balance = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {customer} = useAuth();
    const [formData, setFormData] = useState({
        id: '',
        orderId: '',
        date: '',
        description: '',
        amount: '',
        type: 'INCOME',
        category: ''
    });
    const [balances, setBalances] = useState(null);
    const [dateRange, setDateRange] = useState({startDate: new Date(), endDate: new Date()});
    const [loading, setLoading] = useState(true);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await BalanceService.updateBalance(formData);
            } else {
                await BalanceService.createBalance(formData);
            }
            await fetchBalance(); // Fetch balances again after editing
            setFormData({
                id: '',
                orderId: '',
                date: '',
                description: '',
                amount: '',
                type: 'INCOME',
                category: ''
            });
            onClose();
        } catch (error) {
            console.error('Failed to update balance detail:', error);
        }
    };

    const handleEdit = (detail) => {
        setFormData(detail);
        onOpen();
    };

    const handleDelete = async (id) => {
        try {
            await BalanceService.deleteBalance(id);
            await fetchBalance()
        } catch (error) {
            console.error('Failed to delete balance detail:', error);
        }
    };

    const fetchBalance = async () => {
        setLoading(true);
        try {
            console.log('Fetching balance data for date range:', dateRange);
            const data = await AnalyticsService.getBalance(dateRange.startDate.toISOString(), dateRange.endDate.toISOString());
            console.log('Fetched balance data:', data);
            setBalances(data);
        } catch (error) {
            console.error('Failed to fetch balance data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, [dateRange]);

    if (loading) {
        return (
            <Spinner size="xl"/>
        )
    }

    if (balances.length === 0) {
        return (
            <>
                <Text>No balance data available</Text>
                <Button onClick={onOpen} size={"md"} maxW={"500px"} colorScheme="blue" my={4}
                        leftIcon={<FaRegSquarePlus/>} alignSelf={"center"}>Add Balance Change</Button>
                <BalanceEditModal isOpen={isOpen} onClose={onClose} formData={formData}
                                  handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
            </>
        )
    }

    return (
        <Stack>
            <Text textAlign={"center"}><Heading>Caixa</Heading></Text>
            <SimpleGrid columns={{sm: 3, md: 4, lg: 5}} spacing={4} w="100%" alignItems="center">
                <GridItem>
                    <Box bgColor="green.50" borderColor="green.500" borderWidth="3px" p={4} borderRadius="md">
                        <Heading size="md" color="green.500" textAlign="center">Entradas</Heading>
                        <Box fontSize="4xl" fontWeight="semibold" color="green.500" textAlign="center">
                            {formatCurrency(balances.expenses)}
                        </Box>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box bgColor="red.50" borderColor="red.500" borderWidth="3px" p={4} borderRadius="md">
                        <Heading size="md" color="red.500" textAlign="center">Saídas</Heading>
                        <Box fontSize="4xl" fontWeight="semibold" color="red.500" textAlign="center">
                            {formatCurrency(balances.income)}
                        </Box>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box bgColor="blue.50" borderColor="blue.500" borderWidth="3px" p={4} borderRadius="md">
                        <Heading size="md" color="blue.500" textAlign="center">Balanço</Heading>
                        <Box fontSize="4xl" fontWeight="semibold" color="blue.500" textAlign="center">
                            {formatCurrency(balances.balance)}
                        </Box>
                    </Box>
                </GridItem>
            </SimpleGrid>
            <Text textAlign={"center"} mt={6}><Heading>Lançamentos</Heading></Text>
            <Button onClick={onOpen} size={"md"} maxW={"500px"} colorScheme="blue" my={4}
                    leftIcon={<FaRegSquarePlus/>} alignSelf={"center"}>Add Balance Change</Button>
            <Box>
                <List spacing={3}>
                    {balances.details.map(detail => (
                        <ListItem key={detail.id} px={4}>
                            <HStack justifyContent="space-between" borderBottom="1px solid #ccc">
                                <Box>
                                    <Text fontWeight="bold">{detail.description}</Text>
                                    <Text>{detail.date} - {formatCurrency(detail.amount)} - {detail.category}</Text>
                                </Box>
                                <Tag colorScheme={detail.type === 'EXPENSE' ? 'red' : 'green'}>
                                    {detail.type}
                                </Tag>
                                <Button size={"sm"} onClick={() => handleEdit(detail)} colorScheme="blue">Edit</Button>
                                <Button size={"sm"} onClick={() => handleDelete(detail.id)}
                                        colorScheme="red">Delete</Button>
                            </HStack>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <BalanceEditModal isOpen={isOpen} onClose={onClose} formData={formData}
                              handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
        </Stack>
    );
};

export default Balance;