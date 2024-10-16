import SidebarWithHeader from "../shared/SideBar.jsx";
import {
    Box,
    Image,
    Stack,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";
import React from "react";
import ModalQuiz from "./ModalQuiz.jsx";
import CardFeNoCafe from "./CardFeNoCafe.jsx";
import CardMeExpresso from "./CardMeExpresso.jsx";
import { useTranslation } from "react-i18next";
import ImagePanel from "../../components/home/ImagePanel.jsx";

const Subscricao = () => {
    const { t } = useTranslation();
    const fontSize = useBreakpointValue({ base: "5xl", md: "62px" });

    return (
        <SidebarWithHeader>
            <Stack pb={8} backgroundColor={"whiteAlpha.50"}>
                <Stack justify="flex-start" align="center" my={6} mx={4} >
                    <Text className="cafelab" align="center" fontSize={fontSize} color="#000000">
                        {t('subscription.subscriptionTitle')}
                    </Text>
                </Stack>

                <Stack spacing={0} px={8} direction={['column', 'row']} width="100%" justify="center">

                    <Image
                        width={{ base: '100%', md: '60%' }}
                        src='assets/Subscricao.svg'
                    />
                </Stack>
                
                <Text align="center" fontWeight={"bold"} fontSize="2xl" px={8} my={4}> ESCOLHA, COMPRE, RECEBA TODOS OS MESES EM SUA CASA</Text>
                {
                    /*
                <Stack alignItems={"center"} width={"100%"}>
                    <Card height="100%"
                          maxW='100%'
                          backgroundColor={"#FFFFFF"}>
                        <CardBody mx={8}>
                            <Stack direction={"row"}>
                                <Stack maxHeight={"100px"}>
                                    <Image
                                        alignSelf="center"
                                        objectFit='cover'
                                        src='assets/bundle.png'
                                        alt='Chakra UI'
                                        m={6}
                                        boxSize={"100%"}
                                        borderRadius='lg'
                                    />
                                </Stack>
                                <Stack>
                                    <Stack justify="flex-center" align="center" fontSize={"3xl"} spacing="0px">
                                        <Text className="font-oliveAntique" fontWeight="extrabold" letterSpacing="-0.08em" color="#000000">
                                            Kit Experiência Cafelab
                                        </Text>
                                    </Stack>
                                    <Text align="center">
                                        Para os nossos clientes decididos, ou menos aventureiros.
                                        <br/>
                                        Escolha e monte sua própria subscrição com os cafés que já ama.
                                        <br/>
                                        Selecione três dos nossos
                                        cafés especiais e receba todos os meses na sua casa, o melhor do Cafelab.
                                        <br/>
                                    </Text>
                                    <Text align="center" fontSize={"xs"} mt={6}>
                                        8 embalagens de 13 em grãos ou moídas<br/> de acordo com a sua indicação de consumo.
                                    </Text>
                                </Stack>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>
                */
                }
                <Stack direction={["column", 'row']} pt={8}>
                    <CardFeNoCafe />
                    <CardMeExpresso />
                </Stack>
                <ModalQuiz />
            </Stack>
        </SidebarWithHeader>
    );
}

export default Subscricao;
