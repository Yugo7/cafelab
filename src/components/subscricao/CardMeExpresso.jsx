import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select, Spacer,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {FaCheck, FaHandshake} from "react-icons/fa";
import ProductsCarousel from "../products/ProductsCarousel.jsx";
import React, {useState} from "react";
import {useSubscription} from "../context/SubscriptionContext.jsx";
import {Trans, useTranslation} from "react-i18next";


const CardMeExpresso = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [payment, setPayment] = useState('3');
    const [isOpenIndex, setIsOpenIndex] = useState(0); // 0 for payment, 1 for coffee selection
    const {boxQuantity, createEuMeExpresso} = useSubscription();
    const [variety, setVariety] = useState('');
    const toast = useToast();
    const {t} = useTranslation();

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
        } // Open the coffee selection accordion item
    };

    const handleChangeVariety = (event) => {
        setVariety(event.target.value);
    };

    const handleChangePayment = (event) => {
        setPayment(event.target.value);
    };

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
        <Card height={"auto"}
              maxW='2xl'
              bgColor={"whiteAlpha.50"} variant='outline' border={"1px"}
              mx={4}>
            <CardHeader align={"center"}>
                <Stack justify="flex-start" align="center" fontSize={"3xl"} spacing="0px">
                    <Text className="font-headline">
                        {t('meexpresso.name')}
                    </Text>
                    <Spacer></Spacer>
                    <Text className="font-headline" textAlign={"center"}>
                        €25.00
                    </Text>
                </Stack>
            </CardHeader>
            <CardBody mx={8}>
                <Stack>
                    <Text align="center" fontSize={"lg"} fontWeight={"semibold"} mb={6}>
                        <Trans>{t('meexpresso.coffeeDescription')}</Trans>
                    </Text>
                </Stack>
                <Text fontSize={"lg"} align="center">
                    <Trans>{t('meexpresso.coffeeDetails')}</Trans>
                </Text>
            </CardBody>

            <Image
                objectFit='cover'
                src='assets/subscricao_fenocafe.jpg'
                alt='Fé no cafelab'
                m={6}
            />

            <CardFooter alignSelf="center">
                <Stack alignSelf="center" justifyContent="center">
                    <Button leftIcon={<FaHandshake/>} onClick={onOpen} size='lg' height='48px' border='2px'
                            variant='outline' colorScheme='#FEEBC8'>
                        {t('meexpresso.ratherChoose')}
                    </Button>
                    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}
                           motionPreset='slideInBottom' size={"full"}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>{t('meexpresso.yourSubscription')}</ModalHeader>
                            <ModalCloseButton/>
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
                                                    </Select>
                                                </Stack>
                                                <Stack direction={"row"} my={4}>
                                                    <Text className={"cafelab"} fontWeight={"bold"} fontSize={"xl"}>
                                                        {t('meexpresso.selectYourCoffee')}: {boxQuantity}/3
                                                    </Text>
                                                    <Stack px={4}>
                                                        <Button leftIcon={<FaCheck/>} onClick={() => handleNextClick()} size='sm' border='2px'
                                                                variant='outline' colorScheme='#FEEBC8' disabled={boxQuantity !== 3}>
                                                            {t('meexpresso.done')}
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                            <ProductsCarousel/>
                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left">
                                                {t('meexpresso.payment')}
                                            </Box>
                                        </AccordionButton>
                                        <AccordionPanel>
                                            <Stack my={4}>
                                                <Select value={payment} width={"sm"} onChange={handleChangePayment}>
                                                    <option value='3'>{t('meexpresso.quarterlyPayments')}</option>
                                                    <option value='6'>{t('meexpresso.semiannualPayments')}</option>
                                                    <option value='12'>{t('meexpresso.annualPayments')}</option>
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
                                        {t('subscription.rules.name')}:
                                        <br/>
                                        - {t('subscription.rules.subscribeBy25')}:
                                        <br/>
                                        - {t('subscription.rules.subscriptionsAfter25')}:
                                        <br/>
                                        - {t('subscription.rules.automaticRenewal')}:
                                        <br/>
                                        - {t('subscription.rules.freeCancellation')}:
                                        <br/>
                                        - {t('subscription.rules.freeShipping')}:
                                    </Text>
                                </Stack>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Stack>
            </CardFooter>
        </Card>
    )
}

export default CardMeExpresso;