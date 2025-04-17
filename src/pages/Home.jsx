import React, {useEffect} from 'react';
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import ScrollLogoEffect from "../components/shared/ScrollLogoEffect.jsx";
import {Box, Button, Grid, HStack, Image, Stack, Text, useBreakpointValue, VStack, Divider} from "@chakra-ui/react";
import {FiCalendar, FiPackage, FiShoppingBag} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {FaMapMarkerAlt, FaRegHeart} from "react-icons/fa";
import {Trans, useTranslation} from "react-i18next";
import ProductImageCarousel from "../components/home/ProductCarousel.jsx";
import MailMarketing from "@/components/email/MailMarketing.jsx";
import MailMarketingSignup from "@/components/popups/MailMarketingSignup.jsx";
import {CoffeeOfTheMonth} from "@/components/home/CoffeeOfTheMonth.jsx";

const Home = () => {
    const {t, i18n} = useTranslation();

    const stackSpacing = useBreakpointValue({base: "20px", md: "30px"});
    const fontHl = useBreakpointValue({base: "3xl", md: "5xl"});

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById('ad-popup-button').click();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SidebarWithHeader>
            <Stack w={"100%"} h={"15vh"} justifyContent={"start"} align="center" >
                <Box height={"7vh"} w={"40vw"} alignSelf={"start"} alignContent={"end"}
                     textAlign={"-webkit-center"} bgColor={"blackAlpha.800"} borderBottom={"white" + " 1px solid"}>
                    <Text className={"cafelab"} fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}}
                          color="white">
                        HOME
                    </Text>
                </Box>
            </Stack>
            <HStack w={"100%"} h={"15vh"} justifyContent={"space-around"} align="center">
                <Box height={"7vh"} w={"50vw"} alignSelf={"center"} alignContent={"end"}
                     textAlign={"-webkit-center"}  bgColor={"blackAlpha.800"}  borderBottom={"white" + " 1px solid"}>
                    <Text className={"cafelab"} fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}}
                          color="white">
                        SUBSCRICAO
                    </Text>
                </Box>
            </HStack>
            <HStack w={"100%"} h={"15vh"} justifyContent={"end"} align="center">
                <Box height={"7vh"} w={"45vw"} alignSelf={"start"} alignContent={"end"}
                     textAlign={"-webkit-center"} bgColor={"blackAlpha.800"}>
                    <Text className={"cafelab"} fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}}
                          color="white">
                        HOME
                    </Text>
                </Box>
            </HStack>
            <Stack pt={8} px={{base: "10px", md: "20px" }} bgColor={"#D2B9A9"}>
                <Stack bgColor={"white"} borderRadius={"3xl"} overflow="hidden">
                    <Box paddingY="10px" height={"10vh"} w={"100%"} alignSelf={"center"} alignContent={"end"}
                         textAlign={"-webkit-center"} bgColor={"blackAlpha.800"}>
                        <Text className={"cafelab"} fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}}
                              letterSpacing="-0.04em"
                              color="white">
                            {t('home.homeBanner').toUpperCase()}
                        </Text>
                    </Box>
                    <Stack spacing={0} width="100%" justify="center" p={10}>
                        <ProductImageCarousel/>
                    </Stack>
                    <Stack spacing={0} direction={['column', 'row']} width="100%" justify="center">
                        <Stack align={"center"} spacing={stackSpacing} mb={10}>
                            <Stack alignSelf="stretch" direction={['column', 'row']} justify="center" align="center"
                                   spacing="12px">
                                <Button leftIcon={<FiShoppingBag/>} onClick={() => navigate('/boutique')} size='lg'
                                        height={{base: '80px', md: '100px'}} width={{base: '300px', md: '400px'}}
                                        border='2px'
                                        variant={"solid"} backgroundColor={"black"} color={"white"}
                                        fontSize={{base: "xl", lg: "2xl"}}>
                                    {t('home.storeButton')}
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Box paddingY="10px">
                </Box>
                <Stack bgColor={"white"} p={4} borderRadius={"3xl"}>
                    <Stack spacing={0} width="100%" justify="center" pt={8} >
                        <Text className={"cafelab"} px={useBreakpointValue({base: 4, md: 8})} fontWeight="normal"
                              align="center" fontSize={fontHl}
                              lineHeight={"100%"} letterSpacing="-0.04em">
                            <Trans>{t('home.headlineText')}</Trans>
                        </Text>
                        <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(2, 1fr)"}} gap={4} p={4} h={"auto"}
                              w={{base: "100%", md: "50%"}} alignItems={"center"} alignSelf={"anchor-center"}>
                            <Box>
                                <Image
                                    objectFit="cover"
                                    width="100%"
                                    height="auto"
                                    src="assets/1.png" alt="Subscription"/>

                                <Text className="cafelab" minH={"100px"}
                                      width="100%" fontSize={useBreakpointValue({base: "5vw", md: "3vw"})}
                                      textAlign={"Center"}>
                                    {t('subscription.choose').toUpperCase()}
                                </Text>
                            </Box>
                            <Box>
                                <Image
                                    objectFit="cover"
                                    width="100%"
                                    height="auto"
                                    src="assets/2.png" alt="Subscription"/>
                                <Text className="cafelab" minH={"100px"}
                                      width="100%" fontSize={useBreakpointValue({base: "5vw", md: "3vw"})}
                                      textAlign={"Center"}>
                                    {t('subscription.pay').toUpperCase()}
                                </Text>
                            </Box>
                            <Box>
                                <Image
                                    objectFit="cover"
                                    width="100%"
                                    height="auto"
                                    src="assets/3.png" alt="Subscription"/>
                                <Text className="cafelab" minH={"100px"}
                                      width="100%" fontSize={useBreakpointValue({base: "5vw", md: "2.55vw"})}
                                      textAlign={"Center"}>
                                    {t('subscription.assemble').toUpperCase()}
                                </Text>
                            </Box>
                            <Box>
                                <Image
                                    objectFit="cover"
                                    width="100%"
                                    height="auto"
                                    src="assets/4.png" alt="Subscription"/>
                                <Text className="cafelab" minH={"100px"}
                                      width="100%" fontSize={useBreakpointValue({base: "5vw", md: "2.5vw"})}
                                      textAlign={"Center"}>
                                    {t('subscription.receive').toUpperCase()}
                                </Text>
                            </Box>
                        </Grid>
                    </Stack>
                    <Stack align={"center"} alignSelf={"anchor-center"} spacing={stackSpacing} maxWidth="10%" pb={8}>
                        <Button leftIcon={<FiPackage/>} onClick={() => navigate('/subscricao')} size='xl'
                                height={{base: '80px', md: '100px'}} width={{base: '300px', md: '400px'}} border='2px'
                                variant={"solid"} backgroundColor={"black"} color={"white"}
                                fontSize={{base: "xl", lg: "2xl"}}>
                            {t('home.subscriptionButton')}
                        </Button>
                    </Stack>
                </Stack>
                <Box paddingY="10px">
                </Box>
                <Stack bgColor={"white"} p={4} borderRadius={"3xl"}>
                    <VStack direction={{base: "column", lg: 'row'}} my={"10"} minH={"400px"} justify="space-around"
                            position="relative">
                        <Box paddingY="10px" height={"10vh"} w={"60vw"} alignSelf={"center"} alignContent={"end"}
                             textAlign={"-webkit-center"} bgColor={"blackAlpha.800"}>
                            <Text className={"cafelab"} fontWeight="normal" fontSize={"2xl"}
                                  letterSpacing="-0.04em"
                                  color="white">
                                {t('home.visit').toUpperCase()}
                            </Text>
                        </Box>
                        <Button leftIcon={<FaMapMarkerAlt/>} alignSelf={"center"}
                                onClick={() => window.open("https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7", "_blank")}
                                size='lg' height='48px' width='200px' border='2px'
                                variant={"solid"} backgroundColor={"black"} color={"white"}>
                            {t('home.openOnMaps')}
                        </Button>
                    </VStack>
                </Stack>
                <MailMarketing/>
            </Stack>
        </SidebarWithHeader>
    )
}

export default Home;