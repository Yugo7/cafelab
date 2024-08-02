import OrdersCard from "./OrdersCard.jsx";
import SidebarWithHeader from "../shared/SideBar.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {Stack, Text } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import OrderService from "../../services/orderService.jsx";

const Dashboard = () => {
    const {customer,} = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer) {
                //navigate("/");
            } else {
                try {
                    const data = await OrderService.getOrders();
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
            <Stack m={6} spacing={4}>
            <OrdersCard orders={orders} />
            </Stack>
        </SidebarWithHeader>)
}

export default Dashboard;