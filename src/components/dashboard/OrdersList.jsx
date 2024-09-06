import React from 'react';
import { Stack, Text, VStack, HStack, Box, Tag, Spacer } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../utilities/formatCurrency"

const OrdersList = ({ orders, products }) => {
    const { t } = useTranslation();
    if (!Array.isArray(orders)) {
        return <p>No orders available</p>;
    }

    const getProductById = (id) => {
        return products.find(product => product.id === id) || { nome_pt: 'Unknown Product', secao: 'Unknown' };
    };

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

                                <Box mb={4}>
                                    <HStack width={'100%'} p={2} borderBottom="1px solid #ccc">
                                        <Stack marginRight={2}>
                                            <Text fontWeight={"medium"} fontSize={"md"}>
                                                Numero
                                            </Text>
                                        </Stack>
                                        <HStack marginLeft="60px" justifyContent="flex-start">
                                            <Text fontWeight={"normal"} fontSize={"md"}>
                                                Items:
                                            </Text>
                                        </HStack>
                                        <Spacer />
                                        <Stack alignSelf={'flex-end'}>
                                            <Text fontWeight={"normal"} fontSize={"md"}>
                                                Total:
                                            </Text>

                                        </Stack>
                                    </HStack>
                                </Box>
                                {groupedOrders[status].map((order, orderIndex) => {

                                    return (
                                        <HStack width={'100%'} key={orderIndex} p={2} borderBottom="1px solid #ccc">
                                            <Stack marginRight={2}>
                                                <Text fontWeight={"medium"} fontSize={"lg"}>
                                                    #{order.id}
                                                </Text>
                                            </Stack>
                                            <HStack marginLeft="60px" justifyContent="flex-start">
                                                {order.products.map(orderProduct => {
                                                    const product = getProductById(orderProduct.id);
                                                    return (
                                                        <Tag
                                                            key={orderProduct.id}
                                                            size="sm"
                                                            variant="solid"
                                                            colorScheme={product.secao === 'CAFE' ? 'blue' : 'yellow'}
                                                        >
                                                            {product.nome_pt}
                                                        </Tag>
                                                    );
                                                })}
                                            </HStack>
                                            <Spacer />
                                            <Stack alignSelf={'flex-end'}>
                                                <Text fontWeight={"normal"} fontSize={"lg"}>
                                                    {formatCurrency(order.total)}
                                                </Text>

                                            </Stack>
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