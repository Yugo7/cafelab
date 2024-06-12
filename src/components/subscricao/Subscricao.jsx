import SidebarWithHeader from "../shared/SideBar.jsx";
import {
    Stack,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";
import React from "react";
import ModalQuiz from "./ModalQuiz.jsx";
import CardFeNoCafe from "./CardFeNoCafe.jsx";
import CardMeExpresso from "./CardMeExpresso.jsx";

const Subscricao = () => {

    const fontSize = useBreakpointValue({base: "5xl", md: "62px"});
    const stackSpacing = useBreakpointValue({base: "20px", md: "40px"});
    const sectWidth = useBreakpointValue({base: "100%", md: "50%"});

    return (
        <SidebarWithHeader>
            <Stack backgroundColor={"whiteAlpha.50"}>
                <Stack justify="flex-start" align="center" my={6} mx={4} spacing="24px">
                    <Text className="cafelab" align="center" fontSize={fontSize} color="#000000">
                        SUBSCRIÇÃO CAFELAB
                    </Text>
                </Stack>

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
                <Stack direction={["column", 'row']} spacing="6" align="center" justify="space-between">
                    <Stack spacing={stackSpacing} alignItems={"center"} width={sectWidth} mb={8}>
                        <CardFeNoCafe/>
                    </Stack>
                    <Stack width={sectWidth} alignItems={"center"} pb={8}>
                        <CardMeExpresso/>
                    </Stack>
                </Stack>
                <ModalQuiz/>
            </Stack>
        </SidebarWithHeader>
    );
}

export default Subscricao;
