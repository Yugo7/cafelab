import React, { useEffect } from 'react';
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import { Box, Button, Grid, Image, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { FiCalendar, FiPackage, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { Trans, useTranslation } from "react-i18next";
import ProductImageCarousel from "../components/home/ProductCarousel.jsx";
import MailMarketing from "@/components/email/MailMarketing.jsx";
import MailMarketingSignup from "@/components/popups/MailMarketingSignup.jsx";
import AdPopup from "@/components/popups/AdPopup.jsx";
import {CoffeeOfTheMonth} from "@/components/home/CoffeeOfTheMonth.jsx";

const Home = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const stackSpacing = useBreakpointValue({ base: "20px", md: "30px" });
    const boxPadding = useBreakpointValue({ base: "5px", md: "10px" });
    const fontSize = useBreakpointValue({ base: "6xl", md: "70px" });
    const fontHl = useBreakpointValue({ base: "3xl", md: "5xl" });
    const calendarioSectWidth = useBreakpointValue({ base: "100%", lg: "50%" });
    const textFontSize = useBreakpointValue({ base: "5vw", md: "2.5vw" });

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById('ad-popup-button').click();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SidebarWithHeader>
            <Stack spacing={0} padding="20px">
                <Stack pt={{ base: "20px", lg: "100px" }} align="center" maxWidth="100%" spacing="30px">
                    <Stack justify="flex-start" align="center" spacing={stackSpacing} width="100%" maxWidth="100%">
                        <Stack justify="flex-start" align="center" spacing="-20px">
                            <Text className="cafelab" fontSize={fontSize}>
                                CAFELAB
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={0} width="100%" justify="center" pt={8}>
                    <Text className={"cafelab"} px={useBreakpointValue({ base: 4, md: 8 })} fontWeight="normal" align="center" fontSize={fontHl}
                        lineHeight={"100%"} letterSpacing="-0.04em">
                        <Trans>{t('home.headlineText')}</Trans>
                    </Text>
                    <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4} p={4} h={"auto"} w={"100%"} alignItems={"center"}>
                        <Box>
                            <Image
                                objectFit="cover"
                                width="100%"
                                height="auto"
                                src="assets/1.png" alt="Subscription" />

                            <Text className="cafelab" minH={"100px"}
                                width="100%" fontSize={useBreakpointValue({ base: "5vw", md: "3vw" })} textAlign={"Center"}>
                                {t('subscription.choose').toUpperCase()}
                            </Text>
                        </Box>
                        <Box>
                            <Image
                                objectFit="cover"
                                width="100%"
                                height="auto"
                                src="assets/2.png" alt="Subscription" />
                            <Text className="cafelab" minH={"100px"}
                                width="100%" fontSize={useBreakpointValue({ base: "5vw", md: "3vw" })} textAlign={"Center"}>
                                {t('subscription.pay').toUpperCase()}
                            </Text>
                        </Box>
                        <Box>
                            <Image
                                objectFit="cover"
                                width="100%"
                                height="auto"
                                src="assets/3.png" alt="Subscription" />
                            <Text className="cafelab" minH={"100px"}
                                width="100%" fontSize={useBreakpointValue({ base: "5vw", md: "2.55vw" })} textAlign={"Center"}>
                                {t('subscription.assemble').toUpperCase()}
                            </Text>
                        </Box>
                        <Box>
                            <Image
                                objectFit="cover"
                                width="100%"
                                height="auto"
                                src="assets/4.png" alt="Subscription" />
                            <Text className="cafelab" minH={"100px"}
                                width="100%" fontSize={useBreakpointValue({ base: "5vw", md: "2.5vw" })} textAlign={"Center"}>
                                {t('subscription.receive').toUpperCase()}
                            </Text>
                        </Box>
                    </Grid>
                </Stack>
                <Stack align={"center"} spacing={stackSpacing} maxWidth="100%" pb={8}>
                    <Button leftIcon={<FiPackage />} onClick={() => navigate('/subscricao')} size='xl' height={{ base: '80px', md: '100px' }} width={{ base: '300px', md: '400px' }} border='2px'
                        variant={"solid"} backgroundColor={"black"} color={"white"} fontSize={"3xl"}>
                        {t('home.subscriptionButton')}
                    </Button>
                </Stack>
                <Stack spacing={0} width="100%" justify="center" p={10}>
                    <Text className={"cafelab"} py={8} px={useBreakpointValue({ base: 4, md: 8 })} fontWeight="normal" align="center" fontSize={fontHl}
                        lineHeight={"90%"} letterSpacing="-0.04em"
                        color="black">
                        {t('home.checkOutOurCoffee')}
                    </Text>
                    <ProductImageCarousel />
                </Stack>
                <Stack spacing={0} direction={['column', 'row']} width="100%" justify="center">
                    <Stack align={"center"} spacing={stackSpacing} mb={10}>
                        <Stack alignSelf="stretch" direction={['column', 'row']} justify="center" align="center" spacing="12px">
                            <Button leftIcon={<FiShoppingBag />} onClick={() => navigate('/boutique')} size='lg' height={{ base: '80px', md: '100px' }} width={{ base: '300px', md: '400px' }} border='2px'
                                variant={"solid"} backgroundColor={"black"} color={"white"} fontSize={"3xl"}>
                                {t('home.storeButton')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Box paddingY="10px">
                </Box>

                <Stack width={calendarioSectWidth} m={useBreakpointValue({ base: 6, md: 8 })} alignSelf={"center"} pb={8}>

                    <Text className="cafelab" height={"auto"} width="100%" fontSize={"lg"} textAlign={"center"} color="black">
                        {t('special.title')}
                    </Text>
                    <Box backgroundColor="transparent" width={"100%"} padding={boxPadding} style={{ overflow: 'visible', position: 'relative' }}>
                        <Image src="https://aygbtvycljt8mna3.public.blob.vercel-storage.com/Brunch%20sao%20valentin-iOhlPcM7Ieh4DAcpp6eU11khG0Po1a.jpg" alt="Valentine's CafeLab" />
                    </Box>
                    <Text className="cafelab" height={"auto"} width="100%" fontSize={"sm"} textAlign={"center"} color="black"  whiteSpace="pre-line">
                        {t('special.description')}
                    </Text>
                    <Button onClick={() => navigate('/valentines')}  alignSelf={"center"}
                            leftIcon={<FaRegHeart />} rightIcon={<FaRegHeart />}
                            size='lg' height='48px' width='200px' border='2px'
                            variant={"solid"} backgroundColor={"black"} color={"white"}>
                        {t('special.findOutMore').toUpperCase()}
                    </Button>
                </Stack>
                <Stack direction={{ base: "column", lg: 'row' }} my={"10"} minH={"400px"} justify="space-around" position="relative">
                    <Stack width={calendarioSectWidth} m={useBreakpointValue({ base: 6, md: 8 })} alignSelf={"center"} pb={8}>
                        <Box backgroundColor="transparent" width={"100%"} padding={boxPadding} style={{ overflow: 'visible', position: 'relative' }}>
                            <Image src="assets/EVENTOS.png" h={{ base: "350px", md: "520px" }} alt="Conheça nosso projetos e eventos!" maxWidth="100%" objectFit={"cover"} justifyContent={"center"} />
                        </Box>
                        {currentLanguage !== 'pt' && (
                        <Text className="cafelab" height={"auto"}
                            width="100%" fontSize={textFontSize} textAlign={"Center"} color="black">
                            {t('home.discoverProjects').toUpperCase()}
                        </Text>
                        )}
                        <Button leftIcon={<FiCalendar />} alignSelf={"center"} onClick={() => navigate('/agenda')} size='lg' height='48px' width='200px' border='2px'
                            variant={"solid"} backgroundColor={"black"} color={"white"}>
                            {t('home.agendaButton')}
                        </Button>
                    </Stack>
                    <Stack width={calendarioSectWidth} m={useBreakpointValue({ base: 6, md: 8 })} alignSelf={"center"} pb={8}>
                        <Box backgroundColor="transparent" width={"100%"} padding={boxPadding} style={{ overflow: 'visible', position: 'relative' }}>
                            <Image src="assets/CONHECA.png" minH={{ base: "400px", md: "580px" }} alt="A primeira loja de café de especialidade de Oeiras!" maxWidth="100%" minW={"95%"} objectFit={"cover"} justifyContent={"center"} />
                        </Box>
                        {currentLanguage !== 'pt' && (
                            <Text className="cafelab" height={"auto"} width="100%" fontSize={textFontSize}
                            textAlign={"center"} color="black"  position="relative" top="-50px">
                                {t('home.firstCoffeeShop').toUpperCase()}
                            </Text>
                        )}
                        <Button leftIcon={<FaMapMarkerAlt />} alignSelf={"center"} onClick={() => window.open("https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7", "_blank")}
                            size='lg' height='48px' width='200px' border='2px'
                            variant={"solid"} backgroundColor={"black"} color={"white"}>
                            {t('home.openOnMaps')}
                        </Button>
                    </Stack>
                </Stack>
                <MailMarketing />
                <AdPopup />
            </Stack>
        </SidebarWithHeader>
    )
}

export default Home;