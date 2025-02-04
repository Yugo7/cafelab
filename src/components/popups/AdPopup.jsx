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
import {useTranslation} from "react-i18next";

const AdPopup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const {t} = useTranslation();

    React.useEffect(() => {
        const timer = setTimeout(onOpen, 1000);
        return () => clearTimeout(timer);
    }, [onOpen]);

    const handleButtonClick = () => {
        //navigator.clipboard.writeText('PRIMEIRA10');
        navigate('/valentines');
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('special.title')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src="https://aygbtvycljt8mna3.public.blob.vercel-storage.com/Brunch%20sao%20valentin-iOhlPcM7Ieh4DAcpp6eU11khG0Po1a.jpg" alt="Valentine's CafeLab" />
                        <Text mt={4}></Text>
                    </ModalBody>
                    <ModalFooter  justifyContent={"center"}>
                        <Button onClick={handleButtonClick}>
                            {t('special.findOutMore')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );
};

export default AdPopup;