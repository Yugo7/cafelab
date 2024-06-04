import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useBreakpointValue} from "@chakra-ui/react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Stack} from "react-bootstrap";
import Lottie from "react-lottie";

function SignupSuccess({ isOpen, onClose }) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader align={"center"}>
                    <Image
                        borderRadius='full'
                        src='assets/CafeLabLogo.png'
                        alt='Cafelab logo'
                        onClick={() => navigate('/')}
                    />
                    <Text className={"cafelab"} fontSize="3xl">
                        Bem vindo ao CAFELAB, confirme seu email para concluir seu cadastro!
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <Stack maxWidth={"50%"} mx={"auto"} mb={10}>
                        <Text className="font-headline text-center" fontSize={useBreakpointValue({base: "lg", md: "2xl"})}></Text>
                        <Lottie options={{animationData}} />
                    </Stack>
                </ModalBody>
                <ModalFooter alignSelf={"center"}>Será redirecionado em breve...</ModalFooter>
            </ModalContent>
        </Modal>
    );
}