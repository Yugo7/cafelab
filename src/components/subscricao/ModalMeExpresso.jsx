import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Stack,
    Select,
    Text,
    useToast
} from '@chakra-ui/react';
import React, { useState } from "react";
import { FaCheck } from 'react-icons/fa';
import ProductsCarousel from "../products/ProductsCarousel.jsx";

const ModalMeExpresso = ({
    isOpen,
    onClose,
    t,
    isOpenIndex,
    setIsOpenIndex,
    variety,
    handleChangeVariety,
    boxQuantity,
    createEuMeExpresso,
    handleNextClick
}) => {
    const [payment, setPayment] = useState('3');
    const handleChangePayment = (event) => {
        setPayment(event.target.value);
    };
    const toast = useToast();

    function finishSubscription() {
        if (variety === '') {
            toast({
                title: 'Erro',
                description: "Falta especificar como quer seu café.",
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        } else {
            createEuMeExpresso(variety, payment);
        }
    }

    function getPaymentText() {
        switch (payment) {
            case '1':
                return '€25.00 / mês';
            case '3':
                return '€75.00 / trimestre';
            case '6':
                return '€150.00 / semestre';
            case '12':
                return '€300.00 / ano';
            default:
                return '';
        }
    }

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={"full"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('meexpresso.yourSubscription')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="auto">
                    <Accordion allowToggle={false} index={isOpenIndex} onChange={setIsOpenIndex}>
                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    {t('meexpresso.coffeeSelection')}
                                </Box>
                            </AccordionButton>
                            <AccordionPanel>
                                <Stack>
                                    <Stack my={4}>
                                        <Select placeholder={t('subscription.howYouWantYourCoffee')} value={variety} onChange={handleChangeVariety}>
                                            <option value='beans'>{t('subscription.beans')}</option>
                                            <option value='expresso'>{t('subscription.espresso')}</option>
                                            <option value='frenchpress'>{t('subscription.frenchPress')}</option>
                                            <option value='v60'>{t('subscription.v60')}</option>
                                        </Select>
                                    </Stack>
                                    <Stack direction={"row"} my={4}>
                                        <Text className={"cafelab"} fontWeight={"bold"} fontSize={"xl"}>
                                            {t('meexpresso.selectYourCoffee')}: {boxQuantity}/3
                                        </Text>
                                        <Stack px={4}>
                                            <Button leftIcon={<FaCheck />} onClick={handleNextClick} size='sm' border='2px'
                                                variant='outline' colorScheme='#FEEBC8' disabled={boxQuantity !== 3}>
                                                {t('subscription.done')}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <ProductsCarousel />
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    {t('subscription.payment')}
                                </Box>
                            </AccordionButton>
                            <AccordionPanel>
                                <Stack my={4}>
                                    <Select value={payment} width={"sm"} onChange={handleChangePayment}>
                                        <option value='3'>{t('subscription.quarterlyPayments')}</option>
                                        <option value='6'>{t('subscription.semiannualPayments')}</option>
                                        <option value='12'>{t('subscription.annualPayments')}</option>
                                    </Select>
                                </Stack>
                                <Text className="ms-auto fw-bold" fontSize={"2xl"}>
                                    {getPaymentText()}
                                </Text>
                                <Text className="ms-auto" fontSize={"2xl"}>
                                    {t('meexpresso.pricePerMonth')}
                                </Text>
                                <Button m={2} colorScheme={"green"} onClick={() => finishSubscription()}>{t('meexpresso.checkout')}</Button>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Stack p={6} className=" cafelab d-flex align-items-left">
                        <Text fontSize={"md"}>
                            {t('subscription.rules.name')}
                            <br />
                            - {t('subscription.rules.subscribeBy25')}
                            <br />
                            - {t('subscription.rules.subscriptionsAfter25')}
                            <br />
                            - {t('subscription.rules.automaticRenewal')}
                            <br />
                            - {t('subscription.rules.freeCancellation')}
                            <br />
                            - {t('subscription.rules.freeShipping')}
                        </Text>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ModalMeExpresso;