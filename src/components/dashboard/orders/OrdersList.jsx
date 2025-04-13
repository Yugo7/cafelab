import React, { useState, useEffect } from 'react';
import { Stack, Text, VStack, HStack, Box, Tag, Spacer, Select, Wrap, Spinner } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utilities/formatCurrency.jsx";
import { Button } from "react-bootstrap";
import { getStatusColor, getStatusText } from "@/utils/statusUtil.js";
import OrderModal from './OrderModal';
import OrderService from "@/services/orderService.jsx";

const OrdersList = ({ products }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [orderType, setOrderType] = useState('all');
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true); // Set loading to true before fetching data
            try {
                const data = await OrderService.getOrders(currentPage - 1, itemsPerPage);
                setOrders(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchOrders();
    }, [currentPage, itemsPerPage]);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    return (
        <VStack alignSelf="center" alignItems="center" w={"85vw"} m={6} p={4}>
            <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"1200px"} >
                <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} mb={4}>
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
                        <Spacer />
                        <Stack alignSelf={'flex-end'}>
                            <Text fontWeight={"normal"} fontSize={"lg"}>
                                total
                            </Text>
                        </Stack>
                    </HStack>
                </Box>
                <Stack width={"100%"} mt={4}>
                    {loading ? (
                        <Spinner alignSelf={"center"} m={8} size="xl" />
                    ) : (
                        orders.length > 0 ? (
                            orders.map((order) => (
                                <Box key={order.id} onClick={() => handleOrderClick(order)} cursor="pointer">
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
                                            {order.type === 'LOJA' && Array.isArray(order.cart) ? (
                                                order.cart.map(orderProduct => (
                                                    <Tag
                                                        key={orderProduct.product.id}
                                                        size="sm"
                                                        variant="solid"
                                                        colorScheme={orderProduct.product.secao === 'CAFE' ? 'blue' : 'yellow'}
                                                    >
                                                        {orderProduct.product.nome_pt} x {orderProduct.quantity}
                                                    </Tag>
                                                ))
                                            )  : (
                                                <Tag
                                                    size="sm"
                                                    variant="solid"
                                                    colorScheme='orange'
                                                >
                                                    Subscricao
                                                </Tag>
                                            )}
                                        </Wrap>
                                        <Spacer />
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
                        )
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
            <OrderModal
                isOpen={isModalOpen}
                onClose={closeModal}
                selectedOrder={selectedOrder}
            />
        </VStack>
    );
};

export default OrdersList;