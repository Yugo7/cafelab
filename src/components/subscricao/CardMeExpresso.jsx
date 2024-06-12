import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text, useDisclosure
} from "@chakra-ui/react";
import {FaHandshake} from "react-icons/fa";
import ProductsCarousel from "../products/ProductsCarousel.jsx";
import React from "react";


const CardMeExpresso = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Card height="100%"
              maxW='2xl'
              bgColor={"whiteAlpha.50"} variant='outline' border={"1px"}
              mx={4}>
            <CardHeader align={"center"}>
                <Stack justify="flex-start" align="center" fontSize={"3xl"} spacing="0px">
                    <Text className="font-headline">
                        DEPOIS DO CAFELAB,
                        <br/>EU ME EXPRESSO
                    </Text>
                </Stack>
            </CardHeader>
            <CardBody mx={8}>
                <Stack>
                    <Text align="center" fontSize={"md"} fontWeight={"semibold"} mb={6}>
                        3 embalagens de 175g em grãos ou moídas<br/> de acordo com a sua indicação de consumo.
                    </Text>
                </Stack>
                <Text align="center">
                    Para os nossos clientes decididos, ou menos aventureiros.
                    Escolha e monte sua própria subscrição com os cafés que já ama.
                    Selecione três dos nossos cafés especiais e receba todos os meses na sua casa, o melhor do CAFELAB.

                </Text>
            </CardBody>

            <Image
                objectFit='cover'
                src='assets/subscricao_fenocafe.jpg'
                alt='Fé no cafelab'
                m={6}
            />

            <CardFooter alignSelf="center">
                <Stack alignSelf="center" justifyContent="center">
                    <Button leftIcon={<FaHandshake/>} onClick={onOpen} size='lg' height='48px' border='2px'
                            variant='outline' colorScheme='#FEEBC8'>
                        Já sei o meu cafelab
                    </Button>
                    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}
                           motionPreset='slideInBottom' size={"full"}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>SUA SUBSCRIÇÃO</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody overflowY="auto">
                                <ProductsCarousel/>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose}>Fechar</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Stack>
            </CardFooter>
        </Card>
    )
}

export default CardMeExpresso;