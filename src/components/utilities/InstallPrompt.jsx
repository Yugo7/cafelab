import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import {useTranslation} from "react-i18next";

const InstallPrompt = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            const pwaPromptShownTime = localStorage.getItem('pwaPromptShownTime');
            const currentTime = new Date().getTime();
            const oneDay = 24 * 60 * 60 * 1000;

            if (pwaPromptShownTime && currentTime - pwaPromptShownTime < oneDay) {
                return;
            }

            e.preventDefault();
            setDeferredPrompt(e);
            onOpen();
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', () => {});
        };
    }, [onOpen]);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setDeferredPrompt(null);
            onClose();
        }
    }

    const handleClose = () => {
        localStorage.setItem('pwaPromptShownTime', new Date().getTime());
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('installPrompt.title')}</ModalHeader>
                <ModalBody>
                    {t('installPrompt.body')}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleInstallClick}>
                        {t('installPrompt.installButton')}
                    </Button>
                    <Button variant="ghost" onClick={handleClose}>{t('installPrompt.closeButton')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default InstallPrompt;