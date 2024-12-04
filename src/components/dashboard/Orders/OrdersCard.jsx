import React from 'react';
import {
    Box,
    SimpleGrid,
    Card,
    CardHeader,
    Heading,
    CardBody, Stack, Text, VStack
} from '@chakra-ui/react';
import {Line} from "react-chartjs-2";

const OrderStatusGrid = ({orders}) => {

    if (!Array.isArray(orders)) {
        return <p>No orders available</p>;
    }

    const countOrdersByPaymentStatus = (orders) => {
        return orders.reduce((acc, order) => {
            const status = order.status;
            if (!acc[status]) {
                acc[status] = 0;
            }
            acc[status]++;
            return acc;
        }, {});
    };

    const countOrdersByType = (orders) => {
        return orders.reduce((acc, order) => {
            const type = order.type;
            if (!acc[type]) {
                acc[type] = 0;
            }
            acc[type]++;
            return acc;
        }, {});
    };

    const ordersByPaymentStatus = countOrdersByPaymentStatus(orders);
    const ordersByType = countOrdersByType(orders);

    console.log('ordersByType:', ordersByType);

    const typeColors = {
        'LOJA': "blue",
        'SUBSCRICAO': 'orange'
    };

    const statusColors = {
        'CREATED': 'gray',
        'PENDING': 'yellow',
        'ACTIVE': 'green',
        'PAYMENT_SUCCESSFUL': 'green',
        'CANCELLED': 'red',
        // Add more statuses and colors as needed
    };

    const ordersByMonth = (orders) => {
        return orders.reduce((acc, order) => {
            const date = new Date(order.created_at);

            // Check if the date is valid
            if (isNaN(date)) {
                console.error(`Invalid date: ${order.created_at}`);
                return acc;
            }

            const month = date.getMonth();

            if (!acc[month]) {
                acc[month] = 0;
            }

            acc[month]++;

            return acc;
        }, {});
    };

    // Call the ordersByMonth function and store the result
    const ordersByMonthData = ordersByMonth(orders);

    // Generate labels and data for the chart
    const data = {
        labels: Object.keys(ordersByMonthData).map(month => new Date(0, month).toLocaleString('default', { month: 'long' })),
        datasets: [
            {
                label: 'Orders',
                data: Object.values(ordersByMonthData),
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
        <>

            <Stack h={"5vh"} align="center" m={6} spacing={4}>
                <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                    Pedidos por tipo
                </Text>
            </Stack>

            <SimpleGrid columns={{sm: 3, md: 4, lg: 5}} justifyContent="center" alignItems="center" spacing={4}>
                {Object.entries(ordersByType).map(([type, count], index) => (
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
                { Object.entries(ordersByPaymentStatus).map(([status, count], index) => (
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
        </>
    );
};

export default OrderStatusGrid;