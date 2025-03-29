import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    useDisclosure
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const RedeemModal = ({ isOpen, onClose, onRedeem }) => {
    const { t } = useTranslation();
    const [code, setCode] = React.useState('');

    const handleRedeem = () => {
        onRedeem(code);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('userDashboard.redeemGiftCard')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        placeholder={t('userDashboard.enterGiftCardCode')}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        {t('userDashboard.cancel')}
                    </Button>
                    <Button colorScheme="blue" onClick={handleRedeem} ml={3}>
                        {t('userDashboard.redeem')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RedeemModal;