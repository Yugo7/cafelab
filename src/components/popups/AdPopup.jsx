import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
    Text, Button, ModalFooter,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AdPopup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    React.useEffect(() => {
        const timer = setTimeout(onOpen, 1000);
        return () => clearTimeout(timer);
    }, [onOpen]);

    const handleButtonClick = () => {
        navigator.clipboard.writeText('PRIMEIRA10');
        navigate('/boutique');
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bem vindo ao cafelab.pt!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src="assets/ad.png" alt="Ad Image" />
                        <Text mt={4}></Text>
                    </ModalBody>
                    <ModalFooter  justifyContent={"center"}>
                        <Button onClick={handleButtonClick}>Ir a loja</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );
};

export default AdPopup;