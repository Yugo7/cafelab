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
    useDisclosure,
    Image,
    Text,
} from '@chakra-ui/react';

const AdPopup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    React.useEffect(() => {
        // Automatically open the modal after a delay (e.g., 3 seconds)
        const timer = setTimeout(onOpen, 3000);
        return () => clearTimeout(timer);
    }, [onOpen]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bem vindo ao cafelab.pt!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src="assets/Primeira compra.png" alt="Ad Image" />
                        <Text mt={4}></Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
        
    );
};

export default AdPopup;