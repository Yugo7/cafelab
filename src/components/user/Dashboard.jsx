import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    HStack,
    Spinner,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import SidebarWithHeader from "../shared/SideBar.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import OrderService from "../../services/orderService.jsx";
import {useNavigate} from "react-router-dom";
import {formatCurrency} from "../utilities/formatCurrency.jsx";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {Image} from "react-bootstrap";

const ProfilePage = () => {
    const {customer, logOut} = useAuth();
    const [orders, setOrders] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();
    const {products} = useShoppingCart();

    const tableSize = useBreakpointValue({base: "sm", md: "md"});

    const partition = (array, isValid) => {
        return [
            array.filter(isValid),
            array.filter(element => !isValid(element))
        ];
    }

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer) {
                //navigate("/");
            } else {
                try {
                    const data = await OrderService.getOrdersByUserId(customer.id);
                    const [orders, subscriptions] = partition(data, order =>
                        Array.isArray(order.products) && order.products.every(product => product.id < 900)
                    );
                    setOrders(orders);
                    setSubscriptions(subscriptions[0]);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                }
            }
        };

        fetchOrders();
    }, [customer, navigate]);

    if (!customer) {
        return <Spinner/>;
    }
    return (
        <SidebarWithHeader>
            <Box w="100%" justifyContent={"center"}>
                <VStack justifyContent="center" textAlign={"center"} alignItems="center" w="100vw" p={5}>
                    <Box borderRadius="lg" overflow="hidden" w={"100vw"} maxW={"800px"} p={5} mt={5}>
                        <Avatar
                            name={customer.name}
                            size={'xl'}
                        />
                        <Text fontSize="lg">{customer.name}</Text>
                        <Text>{customer.username}</Text>
                    </Box>
                </VStack>

                <VStack justifyContent="center" alignItems="center" w="100vw" p={5}>
                    <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"800px"}>

                        <Stack width={"100%"}>
                            <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                                SUA SUBSCRIÇÃO
                            </Text>
                            {
                                subscriptions && subscriptions.products ? (
                                    <>
                                        <HStack margin={"auto"} justifyContent="space-evenly">
                                            <Stack gap={2} className="d-flex align-items-center" maxW={"150px"}>
                                                <Text className="cafelab" fontWeight={"medium"} fontSize={"xl"} align={"center"} mb={4}>
                                                    {subscriptions.products.name.toUpperCase()}
                                                </Text>
                                                <Image
                                                    src={subscriptions.products.image}
                                                    style={{width: "120px", objectFit: "cover"}}
                                                />
                                            </Stack>
                                            <Stack>
                                                <Text className="cafelab" fontWeight={"medium"} fontSize={"xl"} align={"center"} mb={4}>
                                                    {subscriptions.products.periodicity_string.toUpperCase()}
                                                </Text>
                                                <Stack className="d-flex align-items-left">
                                                    {subscriptions.products.coffee ? subscriptions.products.coffee.map((coffee) => (
                                                        <>
                                                            <Stack direction={"row"}>
                                                                <Text className="cafelab" fontWeight={"normal"} fontSize={"lg"} align={"left"}>
                                                                    - {coffee.name.toUpperCase()} x {coffee.quantity}
                                                                </Text>
                                                            </Stack>
                                                        </>
                                                    )) : null}
                                                    {subscriptions.products.coffee ? (
                                                        <Button>
                                                            Alterar cafés
                                                        </Button>) : null}

                                                    <Text className="ms-auto" pt={6} fontSize={"lg"}>
                                                        {formatCurrency(
                                                            subscriptions.total
                                                        )} a cada {subscriptions.products.periodo} meses
                                                    </Text>
                                                    <Button>
                                                        Cancelar
                                                    </Button>
                                                </Stack>
                                            </Stack>
                                        </HStack>
                                    </>
                                ) : (<Stack my={8}><Text align={"center"}>Ainda não possui uma subscrição</Text></Stack>)}
                        </Stack>
                    </Box>
                </VStack>
                <VStack justifyContent="center" alignItems="center" w="100vw" p={5}>
                    <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"800px"}>
                        <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                            PEDIDOS
                        </Text>
                        {orders.length > 0 ? orders.map((order, index) => {
                            let dateStr = order.created_at;
                            let date = new Date(dateStr);
                            let year = date.getFullYear();
                            let month = date.getMonth() + 1; // Months are 0-based in JavaScript
                            let day = date.getDate();

                            return (
                                <>
                                    <Text className="cafelab" fontWeight={"medium"} fontSize={"md"} align={"left"} mb={4}>
                                        PEDIDO #{order.id} - {`${day}/${month}/${year}`} - {order.payment_status}
                                    </Text>
                                    <TableContainer>
                                        <Table size={tableSize} variant='simple'>
                                            <TableCaption>Order Details</TableCaption>
                                            <Thead>
                                                <Tr>
                                                    <Th>Product</Th>
                                                    <Th>Quantity</Th>
                                                    <Th isNumeric>Price</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {order.products.map((product, productIndex) => {
                                                    const productInfo = products.find(i => i.id === product.id);
                                                    return (
                                                        <Tr key={productIndex} borderBottom="1px solid #E2E8F0">
                                                            <Td>{productInfo ? productInfo.nome : 'Product not found'}</Td>
                                                            <Td>{product.quantity}</Td>
                                                            <Td isNumeric>{productInfo ? formatCurrency(productInfo.preco) : 'N/A'}</Td>
                                                        </Tr>
                                                    )
                                                })}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </>
                            )
                        }) : (<Stack my={8}><Text align={"center"}>Ainda não há pedidos realizados</Text></Stack>)}
                    </Box>
                </VStack>
            </Box>
        </SidebarWithHeader>
    )
        ;
};

export default ProfilePage;