import React from 'react';
import { Stack, Text, VStack, HStack, Box } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";

const OrdersList = ({ orders, products }) => {
    const { t } = useTranslation();

    if (!Array.isArray(orders)) {
        return <p>No orders available</p>;
    }

    // Create a mapping of product IDs to product names
    const productMap = products.reduce((acc, product) => {
        acc[product.id] = product.name;
        return acc;
    }, {});

    // Group orders by status
    const groupedOrders = orders.reduce((acc, order) => {
        const status = order.status;
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(order);
        return acc;
    }, {});

    return (
        <VStack justifyContent="center" alignItems="center" w="100vw" p={5}>
            <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"800px"}>
                <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                    Pedidos
                </Text>
                <Stack width={"100%"}>
                    {Object.keys(groupedOrders).length > 0 ? (
                        Object.keys(groupedOrders).map((status, index) => (
                            <Box key={index} mb={4}>
                                <Text fontWeight={"bold"} fontSize={"2xl"} mb={2}>
                                    {status} ({groupedOrders[status].length})
                                </Text>
                                {groupedOrders[status].map((order, orderIndex) => {
                                    console.log('Order:', order); // Log the order object
                                    return (
                                        <HStack key={orderIndex} justifyContent="space-between" p={2} borderBottom="1px solid #ccc">
                                            <Text fontWeight={"medium"} fontSize={"lg"}>
                                                #{order.id}
                                            </Text>
                                            <Text fontWeight={"normal"} fontSize={"lg"}>
                                                {order.products.map(productId => productMap[productId]).join(', ')}
                                            </Text>
                                        </HStack>
                                    );
                                })}
                            </Box>
                        ))
                    ) : (
                        <Text>{t('userDashboard.noOrders')}</Text>
                    )}
                </Stack>
            </Box>
        </VStack>
    );
};

export default OrdersList;