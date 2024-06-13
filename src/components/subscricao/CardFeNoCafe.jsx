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
    Select,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {FaHandshake} from "react-icons/fa";
import React, {useState} from "react";
import {useSubscription} from "../context/SubscriptionContext.jsx";
import {useTranslation} from "react-i18next";

function CardFeNoCafe() {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [variety, setVariety] = useState('');
    const [payment, setPayment] = useState('3');
    const toast = useToast();
    const {createFeNoCafelab} = useSubscription();
    const {t} = useTranslation();

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
            createFeNoCafelab(variety, payment);
        }
    }

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
        <Card
            maxW='2xl'
            bgColor={"whiteAlpha.50"} variant='outline' border={"1px"}
        >
            <CardHeader align={"center"}>
                <Box my={8}>
                </Box>
                <Stack justify="flex-start" align="center" fontSize={"3xl"} spacing="0px">
                    <Text className="font-headline" textAlign={"center"}>
                        {t('fenocafe.name')}
                    </Text>
                </Stack>
            </CardHeader>
            <CardBody mx={4}>
                <Box my={5}>
                </Box>
                <Stack>
                    <Text align="center" fontSize={"lg"} fontWeight={"semibold"} mb={6}>
                        {t('fenocafe.coffeeDescription')}
                    </Text>
                </Stack>
                <Text fontSize={"md"} align="center">
                    {t('fenocafe.coffeeDetails')}
                </Text>
            </CardBody>

            <Image
                alignSelf="center"
                objectFit='cover'
                src='assets/subscricao_meexpresso.jpg'
                alt='Depois do cafelab eu me expresso'
                m={6}
                boxSize={"80%"}
                borderRadius='lg'
            />
            <CardFooter alignSelf="center">
                <Flex justifyContent="center" alignItems="center">
                    <Button leftIcon={<FaHandshake/>} onClick={onOpen} size='lg' height='48px' width='200px'
                            border='2px'
                            variant='outline' colorScheme='#FEEBC8'>
                        {t('fenocafe.trust')}
                    </Button>
                    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}
                           motionPreset='slideInBottom' size={"full"}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Fé no CafeLab</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody overflowY="auto">
                                <Stack my={4}>
                                    <Select placeholder={t('subscription.howYouWantYourCoffee')} value={variety} onChange={handleChangeVariety}>
                                        <option value='beans'>{t('subscription.beans')}</option>
                                        <option value='expresso'>{t('subscription.espresso')}</option>
                                        <option value='frenchpress'>{t('subscription.frenchPress')}</option>
                                    </Select>
                                </Stack>
                                <Stack alignItems={"center"}>
                                    <Image
                                        src='assets/subscricao_fenocafe.jpg'
                                        maxH={"50vh"}
                                    />
                                </Stack>
                                <Stack my={4}>
                                    <Select width={"sm"} value={payment} onChange={handleChangePayment}>
                                        <option value='3'>{t('fenocafe.quarterlyPayments')}</option>
                                        <option value='6'>{t('fenocafe.semiannualPayments')}</option>
                                        <option value='12'>{t('fenocafe.annualPayments')}</option>
                                    </Select>
                                </Stack>
                                <Text className="ms-auto fw-bold" fontSize={"2xl"}>
                                    {getPaymentText()}
                                </Text>
                                <Text className="ms-auto " fontSize={"2xl"}>
                                    {t('fenocafe.pricePerMonth')}
                                </Text>
                                <Stack pt={6} pb={6} className=" cafelab d-flex align-items-left">
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
                            <ModalFooter>
                                <Button colorScheme='green' mr={2} onClick={() => finishSubscription()}>{t('fenocafe.checkout')}</Button>
                                <Button onClick={onClose}>{t('fenocafe.close')}</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
            </CardFooter>
        </Card>
    )
}

export default CardFeNoCafe
