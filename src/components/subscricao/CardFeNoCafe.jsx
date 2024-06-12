import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Text,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {FaHandshake} from "react-icons/fa";
import React, {useState} from "react";
import {useSubscription} from "../context/SubscriptionContext.jsx";

function CardFeNoCafe() {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [variety, setVariety] = useState('');
    const [payment, setPayment] = useState('3');
    const toast = useToast();
    const {createFeNoCafelab} = useSubscription();

    const handleChangeVariety = (event) => {
        setVariety(event.target.value);
    };
    const handleChangePayment = (event) => {
        setPayment(event.target.value);
    };

    function finishSubscription() {
        if (variety === '') {
            toast({
                title: 'Erro',
                description: "Falta especificar como quer seu café.",
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        } else {
            createFeNoCafelab(variety, payment);
        }
    }

    function getPaymentText() {
        switch (payment) {
            case '1':
                return '€27.90 / mês';
            case '3':
                return '€83.70 / trimestre';
            case '6':
                return '€167.40 / semestre';
            case '12':
                return '€334.80 / ano';
            default:
                return '';
        }
    }

    return (
        <Card
              maxW='2xl'
              bgColor={"whiteAlpha.50"} variant='outline' border={"1px"}
              >
            <CardHeader align={"center"}>
                <Box my={8}>
                </Box>
                <Stack justify="flex-start" align="center" fontSize={"3xl"} spacing="0px">
                    <Text className="font-headline" textAlign={"center"}>
                        FÉ NO CAFELAB
                    </Text>
                </Stack>
            </CardHeader>
            <CardBody mx={4}>
                <Box my={5}>
                </Box>
                <Stack>
                    <Text align="center" fontSize={"lg"} fontWeight={"semibold"} mb={6}>
                        3 embalagens de 175g em grãos ou moídas<br/> de acordo com a sua indicação de consumo.
                    </Text>
                </Stack>
                <Text fontSize={"lg"} align="center">
                    Para os que nos conhecem, e amam uma surpresa.
                    Quem já pediu, sabe que uma indicação do nosso especialista nunca falha!
                    Receba na sua casa uma coleção de três cafés especiais, escolhidos a dedo todos os meses pelo nosso especialista.
                    <br/>
                    E ainda tenha acesso aos nossos cafés exclusivos da assinatura.
                </Text>
            </CardBody>

            <Image
                alignSelf="center"
                objectFit='cover'
                src='assets/subscricao_meexpresso.jpg'
                alt='Depois do cafelab eu me expresso'
                m={6}
                boxSize={"80%"}
                borderRadius='lg'
            />
            <CardFooter alignSelf="center">
                <Flex justifyContent="center" alignItems="center">
                    <Button leftIcon={<FaHandshake/>} onClick={onOpen} size='lg' height='48px' width='200px'
                            border='2px'
                            variant='outline' colorScheme='#FEEBC8'>
                        Confio
                    </Button>
                    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}
                           motionPreset='slideInBottom' size={"full"}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Fé no CafeLab</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody overflowY="auto">
                                <Stack my={4}>
                                    <Select placeholder='Como quer seu café?' value={variety} onChange={handleChangeVariety}>
                                        <option value='beans'>Grãos</option>
                                        <option value='expresso'>Moído para expresso</option>
                                        <option value='frenchpress'>Moído para prensa francesa/ italiana</option>
                                    </Select>
                                </Stack>
                                <Stack alignItems={"center"}>
                                    <Image
                                        src='assets/subscricao_fenocafe.jpg'
                                        maxH={"50vh"}
                                    />

                                </Stack>
                                <Stack my={4}>
                                    <Select width={"sm"} value={payment} onChange={handleChangePayment}>
                                        <option value='3'>Pagamentos trimestrais</option>
                                        <option value='6'>Pagamentos semestrais</option>
                                        <option value='12'>Pagamentos anuais</option>
                                    </Select>
                                </Stack>
                                <Text className="ms-auto fw-bold" fontSize={"2xl"}>
                                    {getPaymentText()}
                                </Text>
                                <Text className="ms-auto " fontSize={"2xl"}>
                                    Apenas €27.90 por mês
                                </Text>
                                <Stack pt={6} pb={6} className=" cafelab d-flex align-items-left">
                                    <Text fontSize={"md"}>
                                        Regras:
                                        <br/>
                                        - Subscreva até o dia 25 do mês, para receber os grãos torrados no último forno à lenha de Portugal. Entregas a partir
                                        do
                                        dia
                                        02 do mês seguinte;
                                        <br/>
                                        - Subscrições após o dia 25 de cada mês recebem a subscrição no mês subsequente;
                                        <br/>
                                        - Renovação automática – para que o Cafelab sempre esteja presente na sua casa;
                                        <br/>
                                        - Cancelamento gratuito após 3 meses;
                                        <br/>
                                        - Envio grátis.
                                    </Text>
                                </Stack>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={2} onClick={() => finishSubscription()}>Ir para o checkout</Button>
                                <Button onClick={onClose}>Fechar</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
            </CardFooter>
        </Card>
    )
}

export default CardFeNoCafe
