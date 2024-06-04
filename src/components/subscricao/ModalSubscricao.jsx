import {Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ModalQuiz from "./ModalQuiz.jsx";

function ModalSubscricao() {

    const {isOpen, onOpen, onClose} = useDisclosure();

    const navigate = useNavigate();

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent>
                <ModalHeader>Bem à subscrição CAFELAB</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Text>Caso não conheça sobre o mundo do café ficaremos felizes em te ajudar a encontrar o café mais adequado ao seu paladar.
                        Caso já tenha alguma experiencia fique a vontade para selecionar sua própria combinação</Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onOpen} colorScheme='blue' mr={3}>
                        Vamos lá!
                    </Button>
                    <Button onClick={onClose}>Prefiro escolher</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalSubscricao