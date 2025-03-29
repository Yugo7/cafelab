import SidebarWithHeader from "../shared/SideBar.jsx";

import {
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Select, Button, Input
} from "@chakra-ui/react";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {FaGift} from "react-icons/fa";
import {useShoppingCart} from "@/context/ShoppingCartContext.jsx";

const GiftCard = () => {
    const {t} = useTranslation();
    const fontSize = useBreakpointValue({base: "5xl", md: "62px"});
    const [creditAmount, setCreditAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');

    const { increaseCartQuantity } = useShoppingCart();
    const handlePurchase = () => {
        const amount = creditAmount === 'custom' ? customAmount : creditAmount;
        if (amount) {
            increaseCartQuantity(41);
        }
    };

    return (
        <SidebarWithHeader>
            <Stack pb={8} backgroundColor={"whiteAlpha.50"}>
            <Stack justify="flex-start" align="center" my={6} mx={4}>
                <Text className="cafelab" align="center" fontSize={fontSize} color="#000000">
                    {t('giftCard.title')}
                </Text>
            </Stack>

            <Stack spacing={0} px={8} direction={['column', 'row']} width="100%" justify="center">
                <Image
                    maxH={'400px'}
                    src='assets/gift-card.png'
                />
            </Stack>

            <Text align="center" fontWeight={"bold"} fontSize="2xl" px={8}
                  my={4}>{t('giftCard.motto').toUpperCase()}</Text>

            <Stack direction={["column"]} pt={8} alignSelf={"center"}>
                <Stack direction={["column", 'row']} pt={8} align="center" alignContent={"center"}>
                    <Text fontSize="xl" fontWeight="bold">{t('giftCard.selectAmount')}</Text>
                    <Select
                        placeholder={t('giftCard.selectPlaceholder')}
                        value={creditAmount}
                        onChange={(e) => setCreditAmount(e.target.value)}
                        width="200px"
                        ml={4}
                    >
                        <option value="10">€10</option>
                        <option value="25">€25</option>
                        <option value="50">€50</option>
                        <option value="100">€100</option>
                        <option value="custom">{t('giftCard.customAmount')}</option>
                    </Select>
                </Stack>
                {creditAmount === 'custom' && (
                    <Input
                        placeholder={t('giftCard.enterCustomAmount')}
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        width="400px"
                        mt={4}
                        alignSelf={"center"}
                    />
                )}
                <Button leftIcon={<FaGift/>} size='lg' height='48px' border='2px' w={'200px'} mt={8}
                        variant='outline' colorScheme='#FEEBC8' alignSelf={"center"}
                        onClick={handlePurchase}>
                    {t('giftCard.purchase')}
                </Button>
            </Stack>
        </Stack>
        </SidebarWithHeader>
    );
}

export default GiftCard;