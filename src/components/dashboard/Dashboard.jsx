import OrderStatusGrid from "./OrdersCard.jsx";
import SidebarWithHeader from "../shared/SideBar.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {Stack, Text, HStack, VStack, Box,  } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";
import OrderService from "../../services/orderService.jsx";
import OrdersLineChart from "./OrdersLineChart.jsx";
import AnalyticsChart from "./AnalyticsChart.jsx";
import OrdersList from "./OrdersList.jsx";
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";

const Dashboard = () => {
    const {customer} = useAuth();
    const {products} = useShoppingCart();
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

            </Stack>
        </SidebarWithHeader>)
}

export default Dashboard;