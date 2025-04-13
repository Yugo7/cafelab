import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    Flex,
    Heading,
    Link,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import OrderService from "../../services/orderService.jsx";
import { formatCurrency } from "../utilities/formatCurrency.jsx";
import { useShoppingCart } from "../../context/ShoppingCartContext.jsx";
import { useTranslation } from 'react-i18next';
import RedeemModal from "./RedeemModal.jsx";
import { getStatusColor, getStatusText } from "@/utils/statusUtil.js";
import GiftCardService from "@/services/giftCard.js";

const MyBalance = (userBalance) => {

    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!userBalance) {
        return (
            <Stack h={"60vh"} align="center" m={6} spacing={4}>
                <Text mt={5}>{t('myOrders.noOrders')}</Text>
            </Stack>
        )
    }

    const handleRedeem = (code) => {
        GiftCardService.redeemGiftCard(code)
        console.log(`Redeeming gift card with code: ${code}`);
    };

    return (
        <>
            <Stack my={6} pb={4} alignItems="center">
                <Stack gap={2}  justifyContent="space-evenly" direction={{ base: "column", md: 'row' }} className="d-flex align-items-center" textAlign={"center"} w={{ base: "50%", md: '100%' }} >
                    <Stack>
                        <Text className="cafelab" fontWeight={"normal"} fontSize={"lg"}>
                            {t('userDashboard.balance')}
                        </Text>
                        <Text className="cafelab" fontWeight={"medium"} fontSize={"xl"} align={"center"} >
                            {formatCurrency(userBalance.userBalance.balance)}
                        </Text>
                    </Stack>

                    {userBalance.userBalance.expiration ? (
                    <Stack>
                        <Text className="cafelab" fontWeight={"normal"} fontSize={"lg"}>
                            {t('userDashboard.expiresAt')}:
                        </Text>
                        <Text className="cafelab" fontWeight={"medium"} fontSize={"xl"} align={"center"} >
                            {userBalance.userBalance.expiration.toLocaleDateString()}
                        </Text>
                    </Stack> ) : null}
                </Stack>
                <Stack pt={8} className="d-flex align-items-center"  justifyContent="space-evenly" direction={{ base: "column", md: 'row' }}  textAlign={"center"} w='100%' >
                    <Stack spacing={8}>
                        <Button variant={"outline"} colorScheme={"blue"} onClick={() => setIsModalOpen(true)}>
                            {t('userDashboard.redeem')}
                        </Button>
                    </Stack>
                    {/*<Stack>*/}
                    {/*    <Button variant={"outline"} colorScheme={"blackAlpha"} onClick={() => setIsModalOpen(true)}>*/}
                    {/*        {t('userDashboard.history')}*/}
                    {/*    </Button>*/}
                    {/*</Stack>*/}
                </Stack>
            </Stack>
            <RedeemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onRedeem={handleRedeem} />
        </>
    )
}

export default MyBalance;