import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Spinner,
    Stack,
    Text,
    useDisclosure,
    useToast,
    VStack
} from '@chakra-ui/react';
import SidebarWithHeader from "../shared/SideBar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import OrderService from "../../services/orderService.jsx";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext.jsx";
import { useTranslation } from "react-i18next";
import MyOrders from "./MyOrders.jsx";
import MySubscriptions from "./MySubscriptions.jsx";
import MyBalance from "@/components/user/MyBalance.jsx";

const ProfilePage = () => {
    const { customer, requestResetPassword } = useAuth();
    const [orders, setOrders] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [balance, setBalance] = useState([]);
    const navigate = useNavigate();
    const { products } = useShoppingCart();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [message, setMessage] = useState("");
    const toast = useToast();
    const [submitting, setSubmitting] = useState(false);
    const { t } = useTranslation();


    const partition = (array, isValid) => {
        return [
            array.filter(isValid),
            array.filter(element => !isValid(element))
        ];
    }

    const handleChangePassword = () => {
        requestResetPassword(customer.username);
        toast({
            title: t('forgotPassword.successMessage'),
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer) {
                navigate("/");
            } else {
                try {
                    const data = await OrderService.getUserInfo();

                    console.log('data', data);
                    setOrders(data.orders);
                    setSubscriptions(data.subscriptions);
                    setBalance(data.balance);
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
                    <Box borderRadius="lg" overflow="hidden" w={"100vw"} p={5} mt={5}>
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

                <Stack justifyContent="center" alignItems="center" w="100vw" p={5}>
                    <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"800px"}>
                        <Stack width={"100%"}>
                            <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                                {t('userDashboard.yourBalance')}
                            </Text>
                        </Stack>
                        <MyBalance userBalance={ balance }/>
                    </Box>
                </Stack>

                <Stack justifyContent="center" alignItems="center" w="100vw" p={5}>
                    <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"800px"}>
                        <Stack width={"100%"}>
                            <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                                {t('userDashboard.yourSubscription')}
                            </Text>
                        </Stack>
                        <MySubscriptions subscriptions={subscriptions} />
                    </Box>
                </Stack>
                <Stack justifyContent="center" alignItems="center" w="100vw" p={5}>
                    <Box borderWidth="1px" borderRadius="lg" p={4} w={"100vw"} maxW={"800px"}>
                        <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                            {t('userDashboard.myOrders').toUpperCase()}
                        </Text>
                        <MyOrders orders={orders}>
                        </MyOrders>
                    </Box>
                </Stack>

            </Box>
        </SidebarWithHeader>
    )
        ;
}
    ;

export default ProfilePage;