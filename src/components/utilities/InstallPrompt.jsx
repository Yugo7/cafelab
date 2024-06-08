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
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Show the install prompt
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
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Instale nossa PWA</ModalHeader>
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