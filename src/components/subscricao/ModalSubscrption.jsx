import React from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Stack,
    Select,
    useToast,
    Text
} from '@chakra-ui/react';

const ModalFeNoCafe = ({
    isOpen,
    onClose,
    t,
    variety,
    handleChangeVariety,
    payment,
    handleChangePayment,
    getPaymentText
}) => {
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
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={"xl"}>
            <ModalOverlay />
            <ModalContent  p={4} >
                <ModalHeader>{t('fenocafe.name')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="auto">
                    <Stack my={4}>
                        <Select placeholder={t('subscription.howYouWantYourCoffee')} value={variety} onChange={handleChangeVariety}>
                            <option value='beans'>{t('subscription.beans')}</option>
                            <option value='expresso'>{t('subscription.espresso')}</option>
                            <option value='frenchpress'>{t('subscription.frenchPress')}</option>
                        </Select>
                    </Stack>
                    <Stack my={4}>
                        <Select width={"sm"} value={payment} onChange={handleChangePayment}>
                            <option value='3'>{t('subscription.quarterlyPayments')}</option>
                            <option value='6'>{t('subscription.semiannualPayments')}</option>
                            <option value='12'>{t('subscription.annualPayments')}</option>
                        </Select>
                    </Stack>
                    <Text className="ms-auto fw-bold" fontSize={"2xl"}>
                        {getPaymentText()}
                    </Text>
                    <Text className="ms-auto " fontSize={"2xl"}>
                        {t('fenocafe.pricePerMonth')}
                    </Text>
                    <Stack pt={6} pb={6} className="cafelab d-flex align-items-left">
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
                        </Text>
                    </Stack>
                </ModalBody>

                <ModalFooter mb={2}>
                    <Button colorScheme='green' mr={2} onClick={() => finishSubscription()}>{t('subscription.checkout')}</Button>
                    <Button onClick={onClose}>{t('subscription.close')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalFeNoCafe;