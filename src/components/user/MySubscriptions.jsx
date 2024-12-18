import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Stack, Tag,
    Text,
    Textarea, useToast
} from "@chakra-ui/react";
import {formatCurrency} from "@/components/utilities/formatCurrency.jsx";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {useAuth} from "@/context/AuthContext.jsx";
import OrderService from "@/services/orderService.jsx";

const MySubscriptions = ({subscriptions}) => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const toast = useToast();
    const { customer, } = useAuth();

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);


    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

    const cancel = (id) => {
        OrderService.cancelSubscription(id)
    }

    return (
        <>
            {subscriptions.length > 0 ? subscriptions.map((subscription, index) => (

                <Stack direction={{ base: "column", md: 'row' }} key={index} justifyContent="space-evenly" my={6}
                        borderBottom="1px solid #cbd5e0" pb={4} alignItems="center">
                    <Stack gap={2} className="d-flex align-items-center" textAlign={"center"} w={{ base: "50%", md: '100%' }} >
                        <Text className="cafelab" fontWeight={"medium"} fontSize={"xl"} align={"center"} >
                            {subscription.products.name.toUpperCase()}
                        </Text>
                        <Text className="cafelab" fontWeight={"medium"} fontSize={"xl"} align={"center"} >
                            {subscription.products.periodicity_string.toUpperCase()}
                        </Text>
                        <Text className="cafelab" fontWeight={"medium"}  fontSize={"lg"}>
                            {t('userDashboard.sinceDate')}:
                            <br/> {new Date(subscription.created_at).toLocaleDateString('en-GB')}
                        </Text>
                        <Tag colorScheme={subscription.status === 'ACTIVE' ? 'green' : subscription.status === 'PENDING' ? 'yellow' : 'red'}>
                            {subscription.status === 'ACTIVE' ? t('myOrders.status.active').toUpperCase() : subscription.status === 'PENDING' ? t('myOrders.status.pending').toUpperCase() : t('myOrders.status.inactive').toUpperCase() }
                        </Tag>
                        {subscription.status === 'ACTIVE' ? (
                            <Text className="cafelab" fontWeight={"medium"}  fontSize={"lg"}>
                                {t('userDashboard.nextShipping')}:
                                <br/> 02/{new Date().getMonth() + 2}/{new Date().getFullYear()}
                            </Text>
                        )  : (
                            <Text className="cafelab" pt={6} fontWeight={"medium"}  fontSize={"lg"}>
                                {t('userDashboard.pendencies')}
                            </Text>
                        )}
                    </Stack>
                    <Stack pt={8} className="d-flex align-items-center" textAlign={"center"} w={{ base: "50%", md: '100%' }} >
                        <Stack>
                            {subscription.products.coffee ? subscription.products.coffee.map((coffee, coffeeIndex) => (
                                <Stack key={coffeeIndex} direction={"row"}>
                                    <Text className="cafelab" fontWeight={"normal"} fontSize={"lg"} align={"left"}>
                                        - {coffee.name.toUpperCase()} x {coffee.quantity}
                                    </Text>
                                </Stack>
                            )) : null}
                            {subscription.products.coffee ? (
                                <Button onClick={onOpen}>
                                    {t('userDashboard.changeCoffees')}
                                </Button>
                            ) : null}

                            <Text className="ms-auto" pt={6} fontSize={"lg"}>
                                {formatCurrency(subscription.total)} {t('userDashboard.every')} {subscription.products.periodicity} {t('userDashboard.months')}
                            </Text>
                            <Button variant={"outline"} colorScheme={"red"} onClick={() => cancel(subscription.id)}>
                                {t('userDashboard.cancelSubscription')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            )) : (
                <Stack my={8} textAlign={"center"}><Text>{t('userDashboard.noSubscription')}</Text></Stack>
            )}

            <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{t('userDashboard.changeCoffees')}</ModalHeader>
                    <ModalCloseButton/>
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
    );
}

export default MySubscriptions;