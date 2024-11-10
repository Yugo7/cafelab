import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Stack,
    Text,
    Textarea,
    useDisclosure,
    useToast,
    VStack
} from '@chakra-ui/react';
import SidebarWithHeader from "../shared/SideBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import OrderService from "../../services/orderService.jsx";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency.jsx";
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";
import { Image } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";
import MyOrders from "./MyOrders.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ProfilePage = () => {
    const { customer, resetPassword } = useAuth();
    const [orders, setOrders] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();
    const { products } = useShoppingCart();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [message, setMessage] = useState("");
    const toast = useToast();
    const [submitting, setSubmitting] = useState(false);
    const { t } = useTranslation();

    const sendContactMessage = (message) => {
        setSubmitting(true);
        const values = {
            description: message,
            name: customer.id,
            email: customer.username,
        }
        axios.post(`${BASE_URL}contacts/`, values)
            .then(() => {
                setSubmitting(false);
                toast({
                    title: t('contactForm.successTitle'),
                    description: t('contactForm.successDescription'),
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
                onClose()
            })
            .catch(() => {
                setSubmitting(false);
            });
    }

    const partition = (array, isValid) => {
        return [
            array.filter(isValid),
            array.filter(element => !isValid(element))
        ];
    }

    const handleChangePassword = () => {
        resetPassword(customer.username);
    };

    const cancel = (id) => {
        OrderService.cancelSubscription(id)
    }

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer) {
                navigate("/");
            } else {
                try {
                    const data = await OrderService.getOrdersByUserId(customer.username);
                    const [orders, subscriptions] = partition(data, order =>
                        Array.isArray(order.products) && order.type === 'LOJA'
                    );
                    setOrders(orders);
                    setSubscriptions(subscriptions);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                }
            }
        };

        fetchOrders();
    }, [customer, navigate]);
    if (!customer) {
        return <Spinner />;
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
                        <Button mt={4} variant={"outline"} colorScheme="blackAlpha" onClick={handleChangePassword}>
                            {t('userDashboard.changePassword')}
                        </Button>
                    </Box>
                </VStack>

                <VStack justifyContent="center" alignItems="center" w="100vw" p={5}>
                    <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"800px"}>

                        <Stack width={"100%"}>
                            <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                                {t('userDashboard.yourSubscription')}
                            </Text>
                            { subscriptions.length > 0 ? subscriptions.map((subscription, index) => (
                                    <>
                                        <HStack margin={"auto"} justifyContent="space-evenly">
                                            <Stack gap={2} className="d-flex align-items-center" maxW={"150px"}>
                                                <Text className="cafelab" fontWeight={"medium"} fontSize={"xl"} align={"center"} mb={4}>
                                                    {subscription.products.name.toUpperCase()}
                                                </Text>
                                                <Image
                                                    src={subscription.products.image}
                                                    style={{ width: "120px", objectFit: "cover" }}
                                                />
                                            </Stack>
                                            <Stack>
                                                <Text className="cafelab" fontWeight={"medium"} fontSize={"xl"} align={"center"} mb={4}>
                                                    {subscription.products.periodicity_string.toUpperCase()}
                                                </Text>
                                                <Stack className="d-flex align-items-left">
                                                    {subscription.products.coffee ? subscription.products.coffee.map((coffee) => (
                                                        <>
                                                            <Stack direction={"row"}>
                                                                <Text className="cafelab" fontWeight={"normal"} fontSize={"lg"} align={"left"}>
                                                                    - {coffee.name.toUpperCase()} x {coffee.quantity}
                                                                </Text>
                                                            </Stack>
                                                            <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
                                                                <ModalOverlay />
                                                                <ModalContent>
                                                                    <ModalHeader>{t('userDashboard.changeCoffees')}</ModalHeader>
                                                                    <ModalCloseButton />
                                                                    <ModalBody>
                                                                        <Text>{t('userDashboard.indicateCoffees')}</Text>
                                                                        <Textarea
                                                                            mt={6}
                                                                            value={message}
                                                                            onChange={(e) => setMessage(e.target.value)}
                                                                            placeholder={t('userDashboard.writeMessage')}
                                                                        />
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button onClick={() => sendContactMessage(message)}>
                                                                            {t('userDashboard.send')}
                                                                        </Button>
                                                                    </ModalFooter>
                                                                </ModalContent>
                                                            </Modal>
                                                        </>
                                                    )) : null}
                                                    {subscription.products.coffee ? (
                                                        <Button onClick={onOpen}>
                                                            {t('userDashboard.changeCoffees')}
                                                        </Button>) : null}

                                                    <Text className="ms-auto" pt={6} fontSize={"lg"}>
                                                            {formatCurrency(
                                                                subscription.total
                                                            )} {t('userDashboard.every')} {subscription.products.periodicity} {t('userDashboard.months')}
                                                    </Text>
                                                        <Button variant={"outline"} colorScheme={"red"} onClick={cancel(subscription.id)}>
                                                        {t('userDashboard.cancelSubscription')}
                                                        </Button>
                                                    </Stack>
                                            </Stack>
                                        </HStack>
                                    </>
                                )) : (
                                    <Stack my={8} textAlign={"center"}><Text>{t('userDashboard.noSubscription')}</Text></Stack>
                                )
                            }
                        </Stack>
                    </Box>
                </VStack>
                <VStack justifyContent="center" alignItems="center" w="100vw" p={5}>
                    <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"800px"}>
                        <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                            {t('userDashboard.myOrders').toUpperCase()}
                        </Text>
                        <MyOrders>

                        </MyOrders>
                    </Box>
                </VStack>

            </Box>
        </SidebarWithHeader>
    )
        ;
}
    ;

export default ProfilePage;