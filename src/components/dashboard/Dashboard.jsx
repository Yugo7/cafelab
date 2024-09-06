import OrderStatusGrid from "./OrdersCard.jsx";
import SidebarWithHeader from "../shared/SideBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Stack, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import OrderService from "../../services/orderService.jsx";
import OrdersLineChart from "./OrdersLineChart.jsx";
import AnalyticsChart from "./AnalyticsChart.jsx";
import OrdersList from "./OrdersList.jsx";
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";

const Dashboard = () => {
    const { customer } = useAuth();
    const { products } = useShoppingCart();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer) {
                //navigate("/");
            } else {
                try {
                    const data = await OrderService.getOrders();
                    const orders = data.filter(order =>
                        Array.isArray(order.products) && order.products.every(product => product.id < 900)
                    );
                    const subscriptions = data.filter(order =>
                        Array.isArray(order.products) && order.products.every(product => product.id >= 900)
                    );
                    setOrders(orders);
                    setSubscriptions(subscriptions);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                }
            }
        };

        fetchOrders();
    }, [customer, navigate]);

    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => total + product.price, 0);
    };

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
            <Stack m={6} spacing={4}>

                <OrderStatusGrid orders={orders} />
                <OrdersLineChart orders={orders} />
                <OrdersList orders={orders} products={products} />

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Order ID</Th>
                            <Th>Status</Th>
                            <Th>Products</Th>
                            <Th>Total Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map(order => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>{order.status}</Td>
                                <Td>
                                    {order.products.map(product => (
                                        <Text key={product.id}>{product.name}</Text>
                                    ))}
                                </Td>
                                <Td>${calculateTotalPrice(order.products).toFixed(2)}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

                <AnalyticsChart accesses={[
                    {
                        "date": "2024-08-18",
                        "accesses": 68,
                        "visitors": 20
                    },
                    {
                        "date": "2024-08-17",
                        "accesses": 120,
                        "visitors": 34
                    },
                    {
                        "date": "2024-08-19",
                        "accesses": 300,
                        "visitors": 90
                    },
                    {
                        "date": "2024-08-20",
                        "accesses": 232,
                        "visitors": 34
                    },
                    {
                        "date": "2024-08-22",
                        "accesses": 23,
                        "visitors": 20
                    },
                    {
                        "date": "2024-08-21",
                        "accesses": 123,
                        "visitors": 12
                    }
                ]} />

            </Stack>F
        </SidebarWithHeader>)
}

export default Dashboard;