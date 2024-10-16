import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { Box, Button, Flex, Image, Spacer, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { FiBook, FiCalendar, FiPackage, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Trans, useTranslation } from "react-i18next";
import ImagePanel from "./components/home/ImagePanel.jsx";

const Home = () => {
    const stackSpacing = useBreakpointValue({ base: "20px", md: "30px" });
    const boxPadding = useBreakpointValue({ base: "5px", md: "10px" });
    const fontSize = useBreakpointValue({ base: "6xl", md: "70px" });
    const fontHl = useBreakpointValue({ base: "4xl", md: "6xl" });
    const fontHl2 = useBreakpointValue({ base: "xl", md: "3xl" });
    const fontHl3 = useBreakpointValue({ base: "lg", md: "4xl" });
    const sectWidth = useBreakpointValue({ base: "100%", md: "50%" });
    const calendarioSectWidth = useBreakpointValue({ base: "90%", md: "35%" });

    const navigate = useNavigate();

    const { t } = useTranslation();
    return (
        <SidebarWithHeader>
            <Stack spacing={0}>
                <Stack paddingY="10px" align="center" maxWidth="100%" spacing="30px">
                    <Image src="assets/logo.png" alt="Logo" width="250px" />
                    <Stack justify="flex-start" align="center" spacing={stackSpacing} width="100%" maxWidth="100%">
                        <Stack justify="flex-start" align="center" spacing="-20px">
                            <Text className="cafelab" fontSize={fontSize} color="#000000">
                                CAFELAB.PT
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack className={"main-panel"} height={"350px"} paddingY="20px" justify="flex-end" align="center" direction="column" maxWidth="100%"
                    mb={5} backgroundImage="url('assets/Subscricao.svg')" bgPosition={"center"} bgSize={"cover"} spacing="40px">

                </Stack>
                <Stack align={"center"} spacing={stackSpacing} width="759px" maxWidth="100%" mb={10}>
                    <Button leftIcon={<FiPackage />} onClick={() => navigate('/subscricao')} size='xl' height='58px' width='300px' border='2px'
                        variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                        {t('home.subscriptionButton')}</Button>
                </Stack>
                <Stack spacing={0} width="100%" justify="center" py={8}>
                    <Text className={"cafelab"} px={useBreakpointValue({ base: 4, md: 8 })} fontWeight="normal" align="center" fontSize={fontHl}
                        lineHeight={"80%"} letterSpacing="-0.06em"
                        color="#000000">
                        <Trans>{t('home.checkOutOurSubscriptions')}</Trans>
                    </Text>
                    <ImagePanel />
                </Stack>
                <Stack spacing={0} width="100%" justify="center" py={8}>
                    <Text className={"cafelab"} px={useBreakpointValue({ base: 4, md: 8 })} fontWeight="normal" align="center" fontSize={fontHl}
                        lineHeight={"80%"} letterSpacing="-0.06em"
                        color="#000000">
                        {t('home.checkOutOurCoffee')}
                    </Text>
                    <ImagePanel />
                </Stack>
                <Stack spacing={0} direction={['column', 'row']} width="100%" justify="center">
                    <Stack align={"center"} spacing={stackSpacing} width="759px" maxWidth="100%" mb={10}>
                        <Stack alignSelf="stretch" direction={['column', 'row']} justify="center" align="center" spacing="12px">

                            <Button leftIcon={<FiShoppingBag />} onClick={() => navigate('/boutique')} size='lg' height='48px' width='200px' border='2px'
                                variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                {t('home.storeButton')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>

                <Box paddingY="10px">
                </Box>
                <Stack direction={["column", 'row']} className={"mainPanels"} my={"10"} align='stretch'
                    bgPosition={useBreakpointValue({ base: "60% 70%", md: "80% 50%" })} maxWidth="100%" backgroundSize={"cover"}
                    backgroundColor="cornsilk" spacing={stackSpacing} minH={"800px"} justify="space-between" position="relative">
                    <Stack width={calendarioSectWidth} m={useBreakpointValue({ base: 6, md: 8 })}>
                        <Stack justify="flex-end" align="center" width={useBreakpointValue({ base: "90%", md: "100%" })} mt={8} position={useBreakpointValue({ base: "absolute", md: "" })} bottom={useBreakpointValue({ base: "2", md: "" })}>
                            <Box backgroundColor="rgba(0, 0, 0,0.7)" width={"100%"} padding={boxPadding}>
                                <Text className="cafelab-inner text-center" color="#FFFFFF" fontSize={"3xl"}>{t('home.discoverProjects')}</Text>
                            </Box>
                            <Button leftIcon={<FiCalendar />} onClick={() => navigate('/agenda')} size='lg' height='48px' width='200px' border='2px'
                                variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                {t('home.agendaButton')}
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack width={calendarioSectWidth} m={useBreakpointValue({ base: 6, md: 8 })} alignSelf={"end"} p={8}>
                        <Stack justify="flex-end" align="center" width={useBreakpointValue({ base: "90%", md: "100%" })} mt={8} position={useBreakpointValue({ base: "absolute", md: "" })} bottom={useBreakpointValue({ base: "2", md: "" })}>
                            <Box backgroundColor="rgba(0, 0, 0,0.7)" width={"100%"} padding={boxPadding}>
                                <Text className="cafelab-inner text-center" color="#FFFFFF" fontSize={"3xl"}>{t('home.discoverProjects')}</Text>
                            </Box>                                    <Button leftIcon={<FaMapMarkerAlt />} onClick={() => window.open("https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7", "_blank")}
                                size='lg' height='48px' width='200px' border='2px'
                                variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                {t('home.openOnMaps')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack spacing={8} py={8} align="center" width="100%">

                    {/* Feature Highlights */}
                    <Stack direction={['column', 'row']} spacing={8} width="80%" justify="center">
                        <Box
                            backgroundColor="rgba(0, 0, 0, 0.7)"
                            padding={8}
                            borderRadius="md"
                            textAlign="center"
                            color="white"
                        >
                            <Text fontSize="2xl" fontWeight="bold">
                                {t('home.firstCoffeeShop')}
                            </Text>
                        </Box>
                    </Stack>

                </Stack>
                <Box paddingY="10px">
                </Box>
            </Stack>
        </SidebarWithHeader >
    )
}

export default Home;
