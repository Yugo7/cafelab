import React, {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {Card, CardHeader, Heading, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import SidebarWithHeader from "../shared/SideBar.jsx";
import OrderService from "../../services/orderService.jsx";
import {formatCurrency} from "../utilities/formatCurrency.jsx";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";

const Orders = () => {
    const {customer,} = useAuth();
    const navigate = useNavigate();
    const { products } = useShoppingCart();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer) {
                //navigate("/");
            } else {
                try {
                    const data = await OrderService.getOrdersByUserId(customer.id);
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
            <SidebarWithHeader>
                <Stack h={"60vh"} align="center" m={6} spacing={4}>
                    <Text mt={5}>No orders available</Text>
                </Stack>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            {orders.map((order, index) => (
                <Card key={index} m={4}>
                    <CardHeader>
                        <Heading size='md'>Pedido #{order.id}</Heading>
                    </CardHeader>
                    <TableContainer>
                        <Table variant='simple'>
                            <TableCaption>Order Details</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Product</Th>
                                    <Th>Quantity</Th>
                                    <Th isNumeric>Price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {order.products.map((product, productIndex) => {
                                    const productInfo = products.find(i => i.id === product.id);
                                    return (
                                        <Tr key={productIndex}>
                                            <Td>{productInfo ? productInfo.nome : 'Product not found'}</Td>
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
        </SidebarWithHeader>
    )
}

export default Orders;