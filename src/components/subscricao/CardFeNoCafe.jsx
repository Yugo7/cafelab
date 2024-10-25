import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select, Spacer,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { FaHandshake } from "react-icons/fa";
import React, { useState } from "react";
import { useSubscription } from "../context/SubscriptionContext.jsx";
import { Trans, useTranslation } from "react-i18next";
import { Space, Stars } from "lucide-react";
import ModalFeNoCafe from "./ModalSubscrption.jsx";

function CardFeNoCafe() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { createFeNoCafelab } = useSubscription();
    const { t } = useTranslation();

    const [variety, setVariety] = useState('');
    const handleChangeVariety = (event) => {
        setVariety(event.target.value);
    };

    const [payment, setPayment] = useState('3');
    const handleChangePayment = (event) => {
        setPayment(event.target.value);
    };


    function getPaymentText() {
        switch (payment) {
            case '1':
                return '€27.90 / mês';
            case '3':
                return '€83.70 / trimestre';
            case '6':
                return '€167.40 / semestre';
            case '12':
                return '€334.80 / ano';
            default:
                return '';
        }
    }

    return (
        <Box
            w={{"base": "100%", "md": "50%"}}   
            bgColor={"whiteAlpha.50"}
            height={"100%"}
        >
            <Stack className="box-header" >
                <Stack justify="flex-start" align="center" fontSize={"3xl"} spacing="0px">
                    <Text className="font-headline" textAlign={"center"}>
                        {t('fenocafe.name')}
                    </Text>
                    <Spacer></Spacer>
                    <Text className="font-headline" textAlign={"center"}>
                        €27.90
                    </Text>
                </Stack>
            </Stack>
            <Stack mx={4}>
                <Box my={{ base: 4, md: 2 }}>
                </Box>
                <Stack p={4} mb={6}>
                    <Text align="center" fontSize={"xl"} fontWeight={"semibold"} mb={6}>
                        <Trans>{t('fenocafe.coffeeHighlight').toUpperCase()}</Trans>
                    </Text>
                    <Text align="center" fontSize={"lg"} fontWeight={"semibold"}>
                        <Trans>{t('fenocafe.coffeeDescription')}</Trans>
                    </Text>

                    <Text fontSize={"md"} align="center">
                        <Trans>{t('fenocafe.coffeeDetails')}</Trans>
                    </Text>
                </Stack>
                <Stack justifyContent="center" alignItems="center" mt={8}>
                    <Button leftIcon={<FaHandshake />} onClick={onOpen} size='lg' height='48px' width='200px'
                        border='2px'
                        variant='outline' colorScheme='#FEEBC8'>
                        {t('fenocafe.trust')}
                    </Button>
                    <ModalFeNoCafe
                        isOpen={isOpen}
                        onClose={onClose}
                        t={t}
                        variety={variety}
                        handleChangeVariety={handleChangeVariety}
                        payment={payment}
                        handleChangePayment={handleChangePayment}
                        createFeNoCafelab={createFeNoCafelab}
                        getPaymentText={getPaymentText}
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default CardFeNoCafe
