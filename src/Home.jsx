import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { Box, Button, Center, Grid, Image, Spacer, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { FiBook, FiCalendar, FiPackage, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Trans, useTranslation } from "react-i18next";
import ProductImageCarousel from "./components/home/ProductCarousel.jsx";

const Home = () => {
    const stackSpacing = useBreakpointValue({ base: "20px", md: "30px" });
    const boxPadding = useBreakpointValue({ base: "5px", md: "10px" });
    const fontSize = useBreakpointValue({ base: "6xl", md: "70px" });
    const fontHl = useBreakpointValue({ base: "3xl", md: "5xl" });
    const fontHl2 = useBreakpointValue({ base: "xl", md: "3xl" });
    const fontHl3 = useBreakpointValue({ base: "lg", md: "4xl" });
    const sectWidth = useBreakpointValue({ base: "100%", md: "50%" });
    const calendarioSectWidth = useBreakpointValue({ base: "100%", md: "50%" });
    const topValue = useBreakpointValue({ base: '200px', md: '-100px' });

    const navigate = useNavigate();

    const { t } = useTranslation();
    return (
        <SidebarWithHeader>
            <Stack spacing={0}>
                <Stack pt={{ base: "20px", md: "100px" }} align="center" maxWidth="100%" spacing="30px">
                    <Stack justify="flex-start" align="center" spacing={stackSpacing} width="100%" maxWidth="100%">
                        <Stack justify="flex-start" align="center" spacing="-20px">
                            <Text className="cafelab" fontSize={fontSize} color="#000000">
                                CAFELAB
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={0} width="100%" justify="center" pt={8}>
                    <Text className={"cafelab"} px={useBreakpointValue({ base: 4, md: 8 })} fontWeight="normal" align="center" fontSize={fontHl}
                        lineHeight={"90%"} letterSpacing="-0.04em"
                        color="#000000">
                        <Trans>{t('home.checkOutOurSubscription1')}</Trans>
                    </Text>
                    <Text py={4} px={useBreakpointValue({ base: 4, md: 8 })} className={"cafelab"} fontWeight="normal" align="center" fontSize={fontHl} lineHeight={"90%"} letterSpacing="-0.06em"
                        color="#000000">
                        <Trans>{t('home.checkOutOurSubscription2')}</Trans></Text>
                    <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4} p={4} m={8} h={"auto"} w={"100%"} alignItems={"center"}>
                        <Box>
                            <Image
                                objectFit="cover"
                                width="100%"
                                height="auto"
                                src="assets/1.png" alt="Subscription" />
                        </Box>
                        <Box>
                            <Image
                                objectFit="cover"
                                width="100%"
                                height="auto"
                                src="assets/2.png" alt="Subscription" />
                        </Box>
                        <Box>
                            <Image
                                objectFit="cover"
                                width="100%"
                                height="auto"
                                src="assets/3.png" alt="Subscription" />
                        </Box>
                        <Box>
                            <Image
                                objectFit="cover"
                                width="100%"
                                height="auto"
                                src="assets/4.png" alt="Subscription" />
                        </Box>
                    </Grid>
                </Stack>
                <Stack align={"center"} spacing={stackSpacing} maxWidth="100%" pb={8}>
                    <Button leftIcon={<FiPackage />} onClick={() => navigate('/subscricao')} size='xl' height='100px' width='400px' border='2px'
                        variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} fontSize={"3xl"}>
                        {t('home.subscriptionButton')}</Button>
                </Stack>
                <Stack spacing={0} width="100%" justify="center" p={10}>
                    <Text className={"cafelab"} py={8} px={useBreakpointValue({ base: 4, md: 8 })} fontWeight="normal" align="center" fontSize={fontHl}
                        lineHeight={"80%"} letterSpacing="-0.06em"
                        color="#000000">
                        {t('home.checkOutOurCoffee')}
                    </Text>
                    <ProductImageCarousel />
                </Stack>
                <Stack spacing={0} direction={['column', 'row']} width="100%" justify="center">
                    <Stack align={"center"} spacing={stackSpacing} mb={10}>
                        <Stack alignSelf="stretch" direction={['column', 'row']} justify="center" align="center" spacing="12px">

                            <Button leftIcon={<FiShoppingBag />} onClick={() => navigate('/boutique')} size='lg' height='100px' width='400px' border='2px'
                                variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} fontSize={"3xl"}>
                                {t('home.storeButton')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
                {/*
                <Stack spacing={0} width="100%" justify="center" py={8}>
                    <Text className={"cafelab"} px={useBreakpointValue({ base: 4, md: 8 })} fontWeight="normal" align="center" fontSize={fontHl}
                        lineHeight={"80%"} letterSpacing="-0.06em"
                        color="#000000">
                        {t('home.checkOutOurBoutique')}
                    </Text>
                    <ProductImageCarousel />
                </Stack>
                <Stack spacing={0} direction={['column', 'row']} width="100%" justify="center">
                    <Stack align={"center"} spacing={stackSpacing} maxWidth="100%" mb={10}>
                        <Stack alignSelf="stretch" direction={['column', 'row']} justify="center" align="center" spacing="12px">

                            <Button leftIcon={<FiShoppingBag />} onClick={() => navigate('/boutique')} size='lg' height='48px' width='200px' border='2px'
                                variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                {t('home.boutiqueButton')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>*/}

                <Box paddingY="10px">
                </Box>
                <Stack direction={["column", 'row']} my={"10"} pb={12}
                    bgPosition={useBreakpointValue({ base: "60% 70%", md: "80% 50%" })} maxWidth="100%" backgroundSize={"contain"} bgRepeat={"no-repeat"}
                    backgroundImage="assets/6.svg" spacing={stackSpacing} minH={"400px"} justify="space-around" position="relative">


                    <Stack width={calendarioSectWidth} m={useBreakpointValue({ base: 6, md: 8 })} alignSelf={"center"} pb={8}>
                        <Box backgroundColor="transparent" width={"100%"} padding={boxPadding} style={{ overflow: 'visible', position: 'relative' }}>
                            <Image src="assets/EVENTOS.png" h={{base: "350px", md: "520px"}} alt="Preguica" maxWidth="100%" objectFit={"cover"} justifyContent={"center"} />
                        </Box>
                        <Button leftIcon={<FiCalendar />} alignSelf={"center"} onClick={() => navigate('/agenda')} size='lg' height='48px' width='200px' border='2px'
                            variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                            {t('home.agendaButton')}
                        </Button>
                    </Stack>
                    <Stack width={calendarioSectWidth} m={useBreakpointValue({ base: 6, md: 8 })} alignSelf={"center"} pb={8}>
                        <Box backgroundColor="transparent" h={"500px"} width={"100%"} padding={boxPadding} style={{ overflow: 'visible', position: 'relative' }}>
                            <Image src="assets/CONHECA.png" h={{base: "400px", md: "580px"}} alt="Preguica" maxWidth="100%" objectFit={"cover"} justifyContent={"center"}/>
                        </Box>
                        <Button leftIcon={<FaMapMarkerAlt />} alignSelf={"center"} onClick={() => window.open("https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7", "_blank")}
                            size='lg' height='48px' width='200px' border='2px'
                            variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                            {t('home.openOnMaps')}
                        </Button>
                    </Stack>

                </Stack>
            </Stack>
        </SidebarWithHeader >
    )
}

export default Home;
