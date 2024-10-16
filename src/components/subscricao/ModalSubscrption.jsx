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
    Image,
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
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={"full"}>
            <ModalOverlay />
            <ModalContent>
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
                    <Stack alignItems={"center"}>
                        <Image src='assets/subscricao_fenocafe.jpg' maxH={"50vh"} />
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

                <ModalFooter mb={8}>
                    <Button colorScheme='green' mr={2} onClick={() => finishSubscription()}>{t('subscription.checkout')}</Button>
                    <Button onClick={onClose}>{t('subscription.close')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalFeNoCafe;