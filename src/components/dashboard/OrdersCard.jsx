import React from 'react';
import { Box, SimpleGrid, Card, CardHeader, Heading, TableContainer, Table, TableCaption, Tr, Tbody, Td } from '@chakra-ui/react';

const OrderStatusGrid = ({ orders }) => {

    if (!Array.isArray(orders)) {
        return <p>No orders available</p>;
    }

    // Function to count orders by status
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

    const ordersByPaymentStatus = countOrdersByPaymentStatus(orders);
    return (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
            {Object.entries(ordersByPaymentStatus).map(([status, count], index) => (
                <Box key={index}>
                    <Card variant={"outline"} colorScheme='green'>
                        <CardHeader>
                            <Heading size='md'>Pedidos pagamento {status}</Heading>
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
    );
};

export default OrderStatusGrid;