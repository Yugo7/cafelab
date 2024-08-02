import React from 'react';
import { Box, SimpleGrid, Card, CardHeader, Heading, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { formatCurrency } from "../utilities/formatCurrency.jsx";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";
import { Stack } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const OrdersCard = ({ orders }) => {
    const { products } = useShoppingCart();

    if (!Array.isArray(orders)) {
        return <p>No orders available</p>;
    }

    // Function to count orders by payment_status
    const countOrdersByPaymentStatus = (orders) => {
        return orders.reduce((acc, order) => {
            const payment_status = order.payment_status;
            if (!acc[payment_status]) {
                acc[payment_status] = 0;
            }
            acc[payment_status]++;
            return acc;
        }, {});
    };

    // Function to count orders by month
    const countOrdersByMonth = (orders) => {
        return orders.reduce((acc, order) => {
            const month = new Date(order.created_at).getMonth();
            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month]++;
            return acc;
        }, {});
    };

    const ordersByPaymentStatus = countOrdersByPaymentStatus(orders);
    const ordersByMonth = countOrdersByMonth(orders);
    const data = {
        labels: Object.keys(ordersByMonth).map(month => new Date(0, month).toLocaleString('default', { month: 'long' })),
        datasets: [
            {
                label: 'Orders',
                data: Object.values(ordersByMonth),
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
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
            {Object.entries(ordersByPaymentStatus).map(([payment_status, count], index) => (
                <Box key={index}>
                    <Card variant={"outline"} colorScheme='green'> 
                        <CardHeader>
                            <Heading size='md'>Pedidos pagamento {payment_status}</Heading>
                        </CardHeader>
                        <TableContainer>
                            <Table variant='simple'>
                                <TableCaption>Pedidos</TableCaption>
                                <Tbody>
                                    <Tr>
                                        <Td>Total Orders</Td>
                                        <Td isNumeric>{count}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Box>
            ))}
        </SimpleGrid>

<Stack>
    <Card>
        <CardHeader>
            <Heading size='md'>Orders by Month</Heading>
        </CardHeader>
        <Box p={4}>
            <Line data={data} options={options} />
        </Box>
    </Card>
</Stack>
</>
    );
};

export default OrdersCard;