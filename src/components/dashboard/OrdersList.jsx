import React, {useState} from 'react';
import {Stack, Text, VStack, HStack, Box, Tag, Spacer, Select, Wrap} from '@chakra-ui/react';
import {useTranslation} from "react-i18next";
import {formatCurrency} from "../utilities/formatCurrency";
import {Button} from "react-bootstrap";
import {getStatusColor, getStatusText} from "../../utils/statusUtil.js";

const OrdersList = ({orders, products}) => {
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [orderType, setOrderType] = useState('all');

    if (!Array.isArray(orders)) {
        return <p>No orders available</p>;
    }
    const filteredOrders = orderType === 'all' ? orders : orders.filter(order => order.type === orderType);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const totalOrders = filteredOrders.length;

    return (
        <VStack justifyContent="center" alignItems="center" w={"auto"} p={5}>
            <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"1200px"}>
                <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                    Pedidos
                </Text>
                <Select
                    width="auto"
                    value={orderType}
                    onChange={(e) => {
                        setOrderType(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">All</option>
                    <option value="LOJA">LOJA</option>
                    <option value="SUBSCRICAO">SUBSCRICAO</option>
                </Select>
                <Box>
                    <HStack width={'100%'} p={2} borderBottom="1px solid #ccc">
                        <Stack marginRight={8}>
                            <Text fontWeight={"medium"} fontSize={"lg"}>
                                id
                            </Text>
                        </Stack>
                        <Stack w={"120px"} marginRight={8}>
                            <Text fontWeight={"medium"} fontSize={"lg"}>
                                Status
                            </Text>
                        </Stack>
                        <Stack marginRight={2}>
                            <Text fontWeight={"medium"} fontSize={"lg"}>
                                Produtos
                            </Text>
                        </Stack>
                        <Spacer/>
                        <Stack alignSelf={'flex-end'}>
                            <Text fontWeight={"normal"} fontSize={"lg"}>
                                total
                            </Text>
                        </Stack>
                    </HStack>
                </Box>
                <Stack width={"100%"} mt={4}>
                    {paginatedOrders.length > 0 ? (
                        paginatedOrders.map((order, index) => (
                            <Box key={index}>
                                <HStack width={'100%'} p={2} borderBottom="1px solid #ccc">
                                    <Stack marginRight={2}>
                                        <Text fontWeight={"medium"} fontSize={"lg"}>
                                            #{order.id}
                                        </Text>
                                    </Stack>
                                    <Wrap w={"120px"} justifyContent="flex-start">
                                        <Tag
                                            wordBreak="break-word"
                                            whiteSpace="normal"
                                            colorScheme={getStatusColor(order.status)} ml={4}>
                                            {getStatusText(order.status, t)}
                                        </Tag>
                                    </Wrap>
                                    <Wrap marginLeft="60px" justifyContent="flex-start">
                                        {order.type === 'LOJA' && Array.isArray(order.products) ? (
                                            order.products.map(orderProduct => {
                                                return (
                                                    <Tag
                                                        key={orderProduct.id}
                                                        size="sm"
                                                        variant="solid"
                                                        colorScheme={orderProduct.secao === 'CAFE' ? 'blue' : 'yellow'}
                                                    >
                                                        {orderProduct.name}
                                                    </Tag>
                                                );
                                            })
                                        ) : (
                                            <>
                                                <Tag colorScheme={"red"} key={order.products.id}>{order.products.name}</Tag>
                                                {order.products.coffee && order.products.coffee.map(coffee => (
                                                    <Tag
                                                        key={coffee.id}
                                                        size="sm"
                                                        variant="solid"
                                                        colorScheme="gray"
                                                    >
                                                        {coffee.name} x {coffee.quantity}
                                                    </Tag>
                                                ))}
                                            </>
                                        )}
                                    </Wrap>
                                    <Spacer/>
                                    <Stack alignSelf={'flex-end'}>
                                        <Text fontWeight={"normal"} fontSize={"lg"}>
                                            {formatCurrency(order.total)}
                                        </Text>
                                    </Stack>
                                </HStack>
                            </Box>
                        ))
                    ) : (
                        <Text>{t('userDashboard.noOrders')}</Text>
                    )}
                </Stack>
                <HStack justifyContent="center" mt={4}>
                    <Select
                        width="auto"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </Select>
                    <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Text>{currentPage} / {totalPages}</Text>
                    <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </HStack>
            </Box>
        </VStack>
    );
};

export default OrdersList;