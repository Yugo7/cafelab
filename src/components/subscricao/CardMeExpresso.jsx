import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {FaCheck, FaHandshake} from "react-icons/fa";
import ProductsCarousel from "../products/ProductsCarousel.jsx";
import React, {useState} from "react";
import {useSubscription} from "../context/SubscriptionContext.jsx";


const CardMeExpresso = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [payment, setPayment] = useState('3');
    const [isOpenIndex, setIsOpenIndex] = useState(0); // 0 for payment, 1 for coffee selection
    const {boxQuantity, createEuMeExpresso} = useSubscription();
    const [variety, setVariety] = useState('');
    const toast = useToast();

    const handleNextClick = () => {
        if (variety === '') {
            toast({
                title: 'Erro',
                description: "Falta especificar como quer seu café.",
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        } else {
            setIsOpenIndex(1);
        } // Open the coffee selection accordion item
    };

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
            createEuMeExpresso(variety, payment);
        }
    }

    function getPaymentText() {
        switch (payment) {
            case '1':
                return '€25.00 / mês';
            case '3':
                return '€75.00 / trimestre';
            case '6':
                return '€150.00 / semestre';
            case '12':
                return '€300.00 / ano';
            default:
                return '';
        }
    }

    return (
        <Card height={"auto"}
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
                    <Text align="center" fontSize={"lg"} fontWeight={"semibold"} mb={6}>
                        3 embalagens de 175g em grãos ou moídas<br/> de acordo com a sua indicação de consumo.
                    </Text>
                </Stack>
                <Text fontSize={"lg"} align="center">
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
                                <Accordion allowToggle={false} index={isOpenIndex} onChange={setIsOpenIndex}>
                                    <AccordionItem>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left">
                                                Selecção dos cafés
                                            </Box>
                                        </AccordionButton>
                                        <AccordionPanel>
                                            <Stack>
                                                <Stack my={4}>
                                                    <Select placeholder='Como quer seu café?' value={variety} onChange={handleChangeVariety}>
                                                        <option value='beans'>Grãos</option>
                                                        <option value='expresso'>Moído para expresso</option>
                                                        <option value='frenchpress'>Moído para prensa francesa/ italiana</option>
                                                    </Select>
                                                </Stack>
                                                <Stack direction={"row"} my={4}>
                                                    <Text className={"cafelab"} fontWeight={"bold"} fontSize={"xl"}>
                                                        ESCOLHA SEUS CAFÉS: {boxQuantity}/3
                                                    </Text>
                                                    <Stack px={4}>
                                                        <Button leftIcon={<FaCheck/>} onClick={() => handleNextClick()} size='sm' border='2px'
                                                                variant='outline' colorScheme='#FEEBC8' disabled={boxQuantity !== 3}>
                                                            Pronto
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                            <ProductsCarousel/>
                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left">
                                                Forma de pagamento
                                            </Box>
                                        </AccordionButton>
                                        <AccordionPanel>
                                            <Stack my={4}>
                                                <Select value={payment} width={"sm"} onChange={handleChangePayment}>
                                                    <option value='3'>Pagamentos trimestrais</option>
                                                    <option value='6'>Pagamentos semestrais</option>
                                                    <option value='12'>Pagamentos anuais</option>
                                                </Select>
                                            </Stack>
                                            <Text className="ms-auto fw-bold" fontSize={"2xl"}>
                                                {getPaymentText()}
                                            </Text>
                                            <Text className="ms-auto" fontSize={"2xl"}>
                                                Apenas €25.00 por mês
                                            </Text>
                                            <Button m={2} colorScheme={"green"} onClick={() => finishSubscription()}>Ir para o checkout</Button>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>

                                <Stack p={6} className=" cafelab d-flex align-items-left">
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
                        </ModalContent>
                    </Modal>
                </Stack>
            </CardFooter>
        </Card>
    )
}

export default CardMeExpresso;