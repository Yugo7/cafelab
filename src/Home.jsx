import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Box, Button, Flex, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {FiBook, FiCalendar, FiPackage, FiShoppingBag} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {FaMapMarkerAlt} from "react-icons/fa";


const Home = () => {
    const stackSpacing = useBreakpointValue({base: "20px", md: "30px"});
    const boxPadding = useBreakpointValue({base: "5px", md: "10px"});
    const fontSize = useBreakpointValue({base: "6xl", md: "100px"});
    const fontSizeMenu = useBreakpointValue({base: "6xl", md: "62px"});
    const fontHl = useBreakpointValue({base: "6xl", md: "102px"});
    const fontHl2 = useBreakpointValue({base: "xl", md: "3xl"});
    const fontHl3 = useBreakpointValue({base: "lg", md: "4xl"});
    const sectWidth = useBreakpointValue({base: "100%", md: "50%"});
    const calendarioSectWidth = useBreakpointValue({base: "90%", md: "35%"});
    const sectionHeight = useBreakpointValue({base: "720px", md: "700px"});
    const sectionPadding = useBreakpointValue({base: "150px", md: "200px"});
    const stickerPadding = useBreakpointValue({base: "20px 20px 20px 20px", md: "30px 30px 30px 30px"});
    const displayValue = useBreakpointValue({base: "none", md: "grid"});
    const gridValue = useBreakpointValue({base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"});

    const navigate = useNavigate();

    return (

        <SidebarWithHeader>
            <Stack>
                <Stack paddingY="10px" align="center" maxWidth="100%" spacing="30px">
                    <Stack justify="flex-start" align="center" spacing={stackSpacing} width="100%" maxWidth="100%">
                        <Stack justify="flex-start" align="center" spacing="-20px">
                            <Text className="cafelab" fontSize={fontSize} color="#000000">
                                CAFELAB
                            </Text>

                            <Text fontFamily="Roboto" fontWeight="regular" fontSize={fontHl2} letterSpacing="tighter" color="#FFFFFF"
                                  textAlign="center" mx={4}>
                                <Box as="span" color="#000000">
                                    Uma nova loja! O seu novo café!
                                </Box>
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack className={"main-panel"} height={"500px"} paddingY="20px" justify="flex-end" align="center" direction="column" maxWidth="100%"
                       mb={5} backgroundImage="url('assets/capa.png')" bgPosition={"75% 25%"} bgSize={"cover"} spacing="40px">

                    <Stack align={"center"} spacing={stackSpacing} width="759px" maxWidth="100%" mb={10}>

                        <div className="sticker-home">
                            NOVIDADE!
                        </div>
                        <Stack alignSelf="stretch" direction={['column', 'row']} justify="center" align="center" spacing="12px">

                            <Button leftIcon={<FiPackage/>} onClick={() => navigate('/subscricao')} size='lg' height='48px' width='200px' border='2px'
                                    variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                SUBSCRIÇÃO</Button>
                            <Button leftIcon={<FiShoppingBag/>} onClick={() => navigate('/boutique')} size='lg' height='48px' width='200px' border='2px'
                                    variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                BOUTIQUE
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={["column", 'row']} spacing="4" align="center" justify="space-between">
                    <Stack spacing={stackSpacing} width={sectWidth} mt={8}>
                        <Text className={"cafelab"} mt={useBreakpointValue({base: 0, md: 8})} fontWeight="normal" align="center" fontSize={fontSize}
                              lineHeight={"80%"} letterSpacing="-0.08em"
                              color="#000000">
                            VISITE NOSSO ESPAÇO
                        </Text>
                        <Stack className={"mainPanels"} mx={4} align="center" backgroundSize={"cover"}  bgPosition={"75% 25%"}
                               backgroundColor="cornsilk" backgroundImage="url('assets/IMG_8054.JPG')">
                            <Stack justify="flex-start" height={"600px"} w={"100%"} mt={4} mb={10}>
                                <Flex direction="column" justify="space-between" align="center" width={"100%"} height="100%">
                                    <Button leftIcon={<FaMapMarkerAlt/>} onClick={() => window.open("https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7", "_blank")}
                                            size='lg' height='48px' width='200px' border='2px'
                                            variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                        ABRA NO MAPS
                                    </Button>

                                    <Stack justify="center" align="center" spacing={stackSpacing} my={4} width="60%" height="50%">
                                    </Stack>
                                    <Stack justify="center" align="center" width={"80%"} spacing={stackSpacing}>
                                        <Box mx={4} backgroundColor="rgba(0, 0, 0,0.7)" width={"100%"} align="center" padding={boxPadding}>
                                            <Text className={"cafelab"} lineHeight="1.48" fontWeight="regular" fontSize={fontHl2} letterSpacing="-0.02em"
                                                  color="#FFFFFF"
                                                  alignSelf="stretch" textAlign="center" mx={4}>
                                                <Box as="span" color="#FFFFFF">
                                                    A PRIMEIRA LOJA DE CAFÉ DE<br/>ESPECIALIDADE DE OEIRAS.
                                                </Box>
                                            </Text>
                                        </Box>
                                        <Stack direction={['column', 'row']} justify="center" align="center" spacing={stackSpacing} mt={"20px"} mx={4}>
                                            <Box backgroundColor="rgba(0, 0, 0,0.7)" mx={2} padding={boxPadding} align="center">
                                                <Text className={"cafelab"} fontSize={"2xl"} letterSpacing="-0.004em" color="#FFFFFF" mx={2}>
                                                    PET & WORK FRIENDLY
                                                </Text>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Flex>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack justify="center" align="center" width={sectWidth}>
                        <Stack className={"mainPanels main-panel"} p={4} backgroundSize={"cover"} height={"800px"}
                               backgroundColor="cornsilk" backgroundImage="url('assets/menu.jpg')" spacing={stackSpacing}>
                            <div className="sticker p-3">
                                NOVO!
                            </div>
                            <Stack justify="flex-end" w="100%" h={"100%"} paddingBottom={"30px"}>
                                <Box backgroundColor="rgba(0, 0, 0,0.7)" mx={"5%"} padding={boxPadding}>
                                    <Text className="cafelab text-center" fontWeight={"bold"} color="#FFFFFF" fontSize={fontHl3}>MENU PRIMAVERA</Text>
                                </Box>
                                <Box backgroundColor="rgba(0, 0, 0,0.7)" mt={"25%"} padding={boxPadding}>
                                    <Text className="cafelab text-center" color="#FFFFFF" fontSize={"xl"}>DRINKS REFRESCANTES PARA A PRIMAVERA</Text>
                                </Box>
                                <Stack direction={"column"} justify="flex-end" align="center" style={{marginTop: 'auto'}}>
                                    <Button leftIcon={<FiBook/>} onClick={() => navigate('/menu')} size='lg' height='48px' width='200px' border='2px'
                                            variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                        MENU
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Box paddingY="10px">
                </Box>
                <Stack className={"mainPanels"} my={"10"} align='stretch' bgImage={"assets/cafelab_cultural.jpg"}
                       bgPosition={useBreakpointValue({base: "60% 70%", md: "80% 50%"})} maxWidth="100%" backgroundSize={"cover"}
                       backgroundColor="cornsilk" spacing={stackSpacing} minH={"800px"} direction={["column", "column"]} justify="space-between" position="relative">
                    <Stack width={calendarioSectWidth} m={useBreakpointValue({base: 6, md: 8})}>
                        <Box backgroundColor="rgba(0, 0, 0,0.7)" width={"100%"} padding={boxPadding}>
                            <Text className="cafelab text-center" color="#FFFFFF" fontSize={"6xl"}>CALENDÁRIO CULTURAL</Text>
                        </Box>
                        <Stack justify="flex-end" align="center" width={useBreakpointValue({base:"90%", md: "100%"})} mt={8} position={useBreakpointValue({base:"absolute", md:""})} bottom={useBreakpointValue({base:"2", md:""})}>
                            <Box backgroundColor="rgba(0, 0, 0,0.7)" width={"100%"} padding={boxPadding}>
                                <Text className="cafelab text-center"  color="#FFFFFF" fontSize={"3xl"}>Descubra nossos projetos e eventos</Text>
                            </Box>
                            <Button leftIcon={<FiCalendar/>} onClick={() => navigate('/agenda')} size='lg' height='48px' width='200px' border='2px'
                                    variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                AGENDA
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>

                <Box paddingY="10px">
                </Box>
            </Stack>
        </SidebarWithHeader>
    )
}

export default Home;
