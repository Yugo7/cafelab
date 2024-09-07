import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, Flex, Heading, Stack, Table, TableCaption, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import OrderService from "../../services/orderService.jsx";
import { formatCurrency } from "../utilities/formatCurrency.jsx";
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";
import { useTranslation } from 'react-i18next';

const MyOrders = () => {
    const { customer, } = useAuth();
    const navigate = useNavigate();
    const { products } = useShoppingCart();
    const [orders, setOrders] = useState([]);

    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const productNameColumn = `nome_${lang === 'en' ? 'en' : 'pt'}`;

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer) {
                //navigate("/");
            } else {
                try {
                    const data = await OrderService.getOrdersByUserId(customer.username);
                    const filteredData = data.filter(order =>
                        Array.isArray(order.products) && order.products.every(product => product.id < 900)
                    );
                    setOrders(filteredData);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                }
            }
        };

        fetchOrders();
    }, [customer, navigate]);

    if (orders.length <= 0) {
        return (
            <Stack h={"60vh"} align="center" m={6} spacing={4}>
                <Text mt={5}>{t('myOrders.noOrders')}</Text>
            </Stack>
        )
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'yellow';
            case 'SHIPPED':
                return 'blue';
            case 'PAYMENT_SUCCESSFUL':
                return 'green';
            case 'CANCELLED':
                return 'red';
            default:
                return 'gray';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'PENDING':
                return t('myOrders.status.pending');
            case 'SHIPPED':
                return t('myOrders.status.shipped');
            case 'PAYMENT_SUCCESSFUL':
                return t('myOrders.status.paymentSuccessful');
            case 'CANCELLED':
                return t('myOrders.status.cancelled');
            default:
                return t('myOrders.status.unknown');
        }
    };

    return (
        <>
            {orders.map((order, index) => (
                <Card key={index} m={4}>
                    <CardHeader>
                        <Flex align="center">
                            <Heading size='md'>{t('myOrders.orderNumber')} {order.id}</Heading>
                            <Tag colorScheme={getStatusColor(order.status)} ml={4}>
                                {getStatusText(order.status)}
                            </Tag>
                        </Flex>
                    </CardHeader>
                    <TableContainer>
                        <Table variant='simple'>
                            <TableCaption>{t('myOrders.orderDetails')}</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>{t('myOrders.product')}</Th>
                                    <Th>{t('myOrders.quantity')}</Th>
                                    <Th isNumeric>{t('myOrders.price')}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {order.products.map((product, productIndex) => {
                                    const productInfo = products.find(i => i.id === product.id);
                                    
                                    return (
                                        <Tr key={productIndex}>
                                            <Td>{productInfo ? productInfo[productNameColumn] : t('myOrders.productNotFound')}</Td>
                                            <Td>{product.quantity}</Td>
                                            <Td isNumeric>{productInfo ? formatCurrency(productInfo.preco) : 'N/A'}</Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            ))}
        </>
    )
}

export default MyOrders;