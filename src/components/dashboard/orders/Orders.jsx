import { Box, Stack, Spinner } from "@chakra-ui/react";
import OrderStatusGrid from "@/components/dashboard/orders/OrdersCard.jsx";
import OrdersList from "@/components/dashboard/orders/OrdersList.jsx";
import OrderService from "@/services/orderService.jsx";
import {getProducts} from "@/services/productsService.jsx";
import {useEffect, useState} from "react";

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersData, productsData] = await Promise.all([
                    OrderService.getOrders(),
                    getProducts(),
                ]);
                setOrders(ordersData);
                setProducts(productsData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error loading data: {error}</Text>;

    return (
        <Box m={6}>
            <Stack>
                <h2>Pedidos</h2>
            </Stack>
            <OrderStatusGrid />
            <OrdersList orders={orders} products={products} />
        </Box>
    );
};

export default Orders;
