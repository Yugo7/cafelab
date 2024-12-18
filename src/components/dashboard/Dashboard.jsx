import OrderStatusGrid from "./orders/OrdersCard.jsx";
import SidebarWithHeader from "../shared/SideBar.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {Stack, Text} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import OrderService from "../../services/orderService.jsx";
import AnalyticsChart from "./AnalyticsChart.jsx";
import Origins from "./Origins.jsx";
import OrdersList from "./orders/OrdersList.jsx";
import {useShoppingCart} from "../../context/ShoppingCartContext.jsx";
import AnalyticsService from "../../services/AnalyticsService.jsx";

const Dashboard = () => {
    const {customer} = useAuth();
    const {products} = useShoppingCart();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [accesses, setAccesses] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });
    const {t} = useTranslation();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await OrderService.getOrders();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        const fetchAccesses = async () => {
            try {
                const data = await AnalyticsService.getWebsiteAccessData(dateRange.startDate.toISOString(), dateRange.endDate.toISOString());
                setAccesses(data);
            } catch (error) {
                console.error('Failed to fetch website access data:', error);
            }
        };

        fetchOrders();
        fetchAccesses();
    }, [customer, navigate, dateRange]);

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
            <Stack m={{base: 0, md: 6}} spacing={4}>
                <OrderStatusGrid orders={orders}/>
                <OrdersList orders={orders} products={products}/>
                <AnalyticsChart accesses={accesses} setDateRange={setDateRange}/>
                <Origins accesses={accesses} dateRange={dateRange}/>
            </Stack>
        </SidebarWithHeader>)
}

export default Dashboard;