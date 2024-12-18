import {
    Box,
    Button, Spacer,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { FaHandshake } from "react-icons/fa";
import React, { useState } from "react";
import { useSubscription } from "../../context/SubscriptionContext.jsx";
import { Trans, useTranslation } from "react-i18next";
import ModalMeExpresso from "./ModalMeExpresso.jsx";

const CardMeExpresso = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpenIndex, setIsOpenIndex] = useState(0);
    const { boxQuantity, createEuMeExpresso } = useSubscription();
    const [variety, setVariety] = useState('');
    const toast = useToast();
    const { t } = useTranslation();

    const handleNextClick = () => {
        if (variety === '') {
            toast({
                title: 'Erro',
                description: "Falta especificar como quer seu café.",
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        } else {
            setIsOpenIndex(1);
        }
    };

    const handleChangeVariety = (event) => {
        setVariety(event.target.value);
    };

    return (
        <Box             
        w={{"base": "100%", "md": "50%"}}   
        bgColor={"whiteAlpha.50"}
        height={"100%"}>
            <Stack className="box-header" >
                <Stack justify="flex-start" align="center" fontSize={"3xl"} spacing="0px">
                    <Text className="font-headline">
                        {t('meexpresso.name')}
                    </Text>
                    <Spacer></Spacer>
                    <Text className="font-headline" textAlign={"center"}>
                        €25.00
                    </Text>
                </Stack>
            </Stack>
            <Stack mx={4}>
                <Box my={{ base: 4, md: 2 }}>
                </Box>
                <Stack p={4} mb={6} pt={10}>
                    <Text align="center" fontSize={"lg"} fontWeight={"semibold"} >
                        <Trans>{t('meexpresso.coffeeDescription')}</Trans>
                    </Text>
                    <Text fontSize={"md"} align="center">
                        <Trans>{t('meexpresso.coffeeDetails')}</Trans>
                    </Text>
                </Stack>
            </Stack>

            <Stack mt={12} >
                <Stack alignSelf="center" justifyContent="center">
                    <Button leftIcon={<FaHandshake />} onClick={onOpen} size='lg' height='48px' border='2px'
                        variant='outline' colorScheme='#FEEBC8'>
                        {t('meexpresso.ratherChoose')}
                    </Button>
                    <ModalMeExpresso
                        isOpen={isOpen}
                        onClose={onClose}
                        t={t}
                        isOpenIndex={isOpenIndex}
                        setIsOpenIndex={setIsOpenIndex}
                        variety={variety}
                        handleChangeVariety={handleChangeVariety}
                        boxQuantity={boxQuantity}
                        createEuMeExpresso={createEuMeExpresso}
                        handleNextClick={handleNextClick}
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default CardMeExpresso;