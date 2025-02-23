import React, {useEffect, useState} from 'react';
import {
    Box,
    SimpleGrid,
    Card,
    CardHeader,
    Heading,
    CardBody, Stack, Text
} from '@chakra-ui/react';
import {Line} from "react-chartjs-2";
import OrderService from "@/services/orderService.jsx";

const OrderStatusGrid = () => {
    const [ordersData, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Promise.all([
                    OrderService.getOrdersSummary(),
                ]);
                setOrders(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    } , []);

    console.log(ordersData);
    if (!ordersData) {
        return <p>No orders available</p>;
    }


    const typeColors = {
        'LOJA': "blue",
        'SUBSCRICAO': 'orange'
    };

    const statusColors = {
        'CRIADO': 'gray',
        'PENDENTE': 'yellow',
        'ATIVO': 'green',
        'PAGAMENTO EFETUADO': 'green',
        'CANCELADO': 'red',
        // Add more statuses and colors as needed
    };

    // Generate labels and data for the chart
    const data = {
        labels: Object.keys(ordersData[0].ordersByMonth).map(month => new Date(0, month).toLocaleString('default', { month: 'long' })),
        datasets: [
            {
                label: 'Orders',
                data: Object.values(ordersData[0].ordersByMonth),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Orders by Month',
            },
        },
    };

    return (
        <Stack alignSelf="center" w={"85vw"}>
            <Stack h={"5vh"} align="center" m={6} spacing={4}>
                <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                    Pedidos por tipo
                </Text>
            </Stack>

            <SimpleGrid columns={{sm: 3, md: 4, lg: 5}} justifyContent="center" alignItems="center" spacing={4}>
                {Object.entries(ordersData[0].ordersByType).map(([type, count], index) => (
                    <Box key={index}>
                        <Card variant={"outline"} bgColor={`${typeColors[type]}.50`} borderColor={`${typeColors[type]}.500`} borderWidth={"3px"}  alignItems={"center"}>
                            <CardHeader color={`${typeColors[type]}.500`} >
                                <Heading size='md'>{type}</Heading>
                            </CardHeader>
                            <CardBody color={`${typeColors[type]}.500`}>
                                <Box fontSize={"4xl"} fontWeight={"semibold"}>
                                    {count}
                                </Box>
                            </CardBody>
                        </Card>
                    </Box>
                ))}
            </SimpleGrid>

            <Stack h={"5vh"} align="center" m={6} spacing={4}>
                <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                    Pedidos por status
                </Text>
            </Stack>
            <SimpleGrid columns={{sm: 3, lg: 4, xl: 5}} justifyContent="center" alignItems="center" spacing={4}>
                { Object.entries(ordersData[0].ordersByStatus).map(([status, count], index) => (
                    <Box key={index}>
                        <Card variant={"outline"} bgColor={`${statusColors[status]}.50`} borderColor={`${statusColors[status]}.500`} borderWidth={"3px"}  alignItems={"center"}>
                            <CardHeader color={`${statusColors[status]}.500`} >
                                <Heading size='md'>{status}</Heading>
                            </CardHeader>
                            <CardBody color={`${statusColors[status]}.500`} >
                                <Box fontSize={"4xl"} fontWeight={"semibold"}>
                                    {count}
                                </Box>
                            </CardBody>
                        </Card>
                    </Box>
                ))}
            </SimpleGrid>

            <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"1200px"} alignSelf={"center"}>
                <Stack h={"5vh"} m={6} spacing={4}>
                    <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                        Pedidos por mês
                    </Text>
                </Stack>
                <Card>
                    <Box p={4}>
                        <Line data={data} options={options} />
                    </Box>
                </Card>
            </Box>
        </Stack>
    );
};

export default OrderStatusGrid;