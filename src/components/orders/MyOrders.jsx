import React, {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {Card, CardHeader, Heading, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import SidebarWithHeader from "../shared/SideBar.jsx";
import {CardTitle} from "react-bootstrap";
import {getOrders, getRegularOrdersWithProducts} from "../../services/orderService.jsx";
import {getProductsById} from "../../services/productsService.jsx";
import {formatCurrency} from "../utilities/formatCurrency.jsx";

const Orders = () => {
    const {customer,} = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer) {
                //navigate("/");
            } else {
                try {
                    const data = await getRegularOrdersWithProducts(customer);
                    setOrders(data);
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
                                {order.products.map((product, productIndex) => (
                                    <Tr key={productIndex}>
                                        <Td>{product.nome}</Td>
                                        <Td>{product.quantity}</Td>
                                        <Td isNumeric>{formatCurrency(product.preco)}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            ))}
        </SidebarWithHeader>
    )
}

export default Orders;