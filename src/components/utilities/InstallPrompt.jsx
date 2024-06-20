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

const InstallPrompt = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deferredPrompt, setDeferredPrompt] = useState(null);

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
                <ModalHeader>Instale nossa aplicação</ModalHeader>
                <ModalBody>
                    Para uma melhor experiência, instale nossa aplicação no seu dispositivo.
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleInstallClick}>
                        Instalar
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Fechar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default InstallPrompt;