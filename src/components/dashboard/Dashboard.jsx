import OrderStatusGrid from "./Orders/OrdersCard.jsx";
import SidebarWithHeader from "../shared/SideBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Stack, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import OrderService from "../../services/orderService.jsx";
import AnalyticsChart from "./AnalyticsChart.jsx";
import OrdersList from "./Orders/OrdersList.jsx";
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";
import AnalyticsService from "../../services/AnalyticsService.jsx";

const Dashboard = () => {
    const { customer } = useAuth();
    const { products } = useShoppingCart();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [accesses, setAccesses] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer) {
                console.error('No customer found');
                console.log(customer)
                //navigate("/");
            } else {
                try {
                    const data = await OrderService.getOrders();
                    setOrders(data);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                }
            }
        };

        const fetchAccesses = async () => {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 15);
            const endDate = new Date();

            try {
                const data = await AnalyticsService.getWebsiteAccessData(startDate.toISOString(), endDate.toISOString());
                setAccesses(data);
            } catch (error) {
                console.error('Failed to fetch website access data:', error);
            }
        };

        fetchOrders();
        fetchAccesses();
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
            <Stack m={{base: 0, md: 6 }} spacing={4}>

                <OrderStatusGrid orders={orders} />
                <OrdersList orders={orders} products={products} />

                <AnalyticsChart accesses={accesses} />

            </Stack>
        </SidebarWithHeader>)
}

export default Dashboard;