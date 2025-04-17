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
    const fontHl = useBreakpointValue({base: "3xl", lg: "5xl"});
    const fontImages = useBreakpointValue({base: "lg", lg: "1.3vw"});

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById('ad-popup-button').click();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SidebarWithHeader>
            <Stack w={"100%"} h={"15vh"} justifyContent={"start"} align="center" bgColor={"#D2B9A9"}>
                <Box height={"7vh"} w={"40vw"} alignSelf={"start"} alignContent={"end"} borderRadius={"3xl"}
                     overflow={"hidden"}
                     textAlign={"-webkit-center"} bgColor={"blackAlpha.800"} borderBottom={"white" + " 1px solid"}>
                    <Text className={"cafelab"} fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}}
                          color="white">
                        HOME
                    </Text>
                </Box>
            </Stack>
            <HStack w={"100%"} h={"15vh"} justifyContent={"space-around"} align="center" bgColor={"#D2B9A9"}>
                <Box height={"7vh"} w={"50vw"} alignSelf={"center"} alignContent={"end"} borderRadius={"3xl"}
                     overflow={"hidden"}
                     textAlign={"-webkit-center"} bgColor={"white"} borderBottom={"white" + " 1px solid"}>
                    <Box bgColor={"#faf0e6"}>
                        <Text className={"cafelab"} fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}}
                              color="black">
                            BOUTIQUE
                        </Text>
                    </Box>
                </Box>
            </HStack>
            <HStack w={"100%"} h={"15vh"} justifyContent={"end"} align="center" bgColor={"#D2B9A9"}>
                <Box height={"7vh"} w={"45vw"} alignSelf={"start"} alignContent={"end"} borderRadius={"3xl"}
                     overflow={"hidden"}
                     textAlign={"-webkit-center"} bgColor={"blackAlpha.800"}>
                    <Text className={"cafelab"} fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}}
                          color="white">
                        SUBSCRICAO
                    </Text>
                </Box>
            </HStack>
            <Stack pt={8} px={{base: "10px", md: "20px"}} bgColor={"#D2B9A9"}>
                <Stack bgColor={"white"} borderRadius={"3xl"} overflow="hidden">
                    <Box paddingY="10px" height={"10vh"} w={"100%"} alignSelf={"center"} alignContent={"end"}
                         textAlign={"-webkit-center"} bgColor={"#faf0e6"}>
                        <Text className={"cafelab"} px={useBreakpointValue({base: 4, md: 8})} fontWeight="normal"
                              align="center" fontSize={fontHl}
                              lineHeight={"100%"} letterSpacing="-0.04em">
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
                                <Button leftIcon={<FiShoppingBag/>} onClick={() => navigate('/boutique')} size='lg'  borderRadius={"3xl"}
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
                    <Stack spacing={0} width="100%" justify="center" pt={8} bgColor={"#faf0e6"}>
                        <Text className={"cafelab"} px={useBreakpointValue({base: 4, md: 8})} fontWeight="normal"
                              align="center" fontSize={fontHl}
                              lineHeight={"100%"} letterSpacing="-0.04em">
                            <Trans>{t('home.headlineText')}</Trans>
                        </Text>
                        <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={4} p={4} h={"auto"}
                              w={{base: "auto", md: "auto"}} alignItems={"center"} alignSelf={"anchor-center"}>
                            <Box bgColor={"white"} borderRadius={"3xl"} p={4} w={{base: "3xs", lg: "sm"}} justifySelf={{base: "center", lg: "start"}}
                                 alignSelf={"start"}>
                                <Image
                                    objectFit="cover"
                                    width="100%"
                                    height="auto"
                                    src="assets/1.png" alt="Subscription"/>

                                <Text className="cafelab" minH={"100px"}
                                      width="100%" fontSize={fontImages}
                                      textAlign={"Center"}>
                                    {t('subscription.choose').toUpperCase()}
                                </Text>
                            </Box>
                            <Box bgColor={"white"} h={{base: "xs", lg: "lg"}} w={{base: "xs", lg: "lg"}} borderRadius={"50%"} p={4}
                                 textAlign={"-webkit-center"} overflow={"hidden"}>
                                <Image
                                    objectFit="cover"
                                    width="80%"
                                    height="auto"
                                    src="assets/2.png" alt="Subscription"/>
                                <Text className="cafelab" minH={"100px"}
                                      width="100%" fontSize={fontImages}
                                      textAlign={"Center"}>
                                    {t('subscription.pay').toUpperCase()}
                                </Text>
                            </Box>
                            <Box bgColor={"white"} borderRadius={"3xl"} p={4} borderRadius={"50%"} w={{base: "3xs", lg: "md"}}
                                 alignSelf={"start"} justifySelf={{base: "center", lg: "start"}} overflow={"hidden"}>
                                <Image
                                    bgColor={"gray"}
                                    objectFit="cover"
                                    width="100%"
                                    height="auto"
                                    src="assets/3.png" alt="Subscription"/>
                                <Text className="cafelab" minH={"100px"}
                                      width="100%" fontSize={fontImages}
                                      textAlign={"Center"}>
                                    {t('subscription.assemble').toUpperCase()}
                                </Text>
                            </Box>
                            <Box bgColor={"white"} borderRadius={"3xl"} p={4} w={{base: "3xs", lg: "sm"}} alignSelf={"end"}
                                 justifySelf={{base: "center", lg: "end"}}>
                                <Image
                                    objectFit="cover"
                                    width="100%"
                                    height="auto"
                                    src="assets/4.png" alt="Subscription"/>
                                <Text className="cafelab" minH={"100px"}
                                      width="100%" fontSize={fontImages}
                                      textAlign={"Center"}>
                                    {t('subscription.receive').toUpperCase()}
                                </Text>
                            </Box>
                        </Grid>
                    <Stack align={"center"} alignSelf={"anchor-center"} spacing={stackSpacing} maxWidth="10%" py={8}>
                        <Button leftIcon={<FiPackage/>} onClick={() => navigate('/subscricao')} size='xl'  borderRadius={"3xl"}
                                height={{base: '80px', md: '100px'}} width={{base: '300px', md: '400px'}} border='2px'
                                variant={"solid"} backgroundColor={"black"} color={"white"}
                                fontSize={{base: "xl", lg: "2xl"}}>
                            {t('home.subscriptionButton')}
                        </Button>
                    </Stack>
                    </Stack>
                </Stack>#faf0e6
                <Box paddingY="10px">
                </Box>
                <Stack bgColor={"white"} borderRadius={"3xl"} overflow={"hidden"}>
                    <VStack direction={{base: "column", lg: 'row'}} minH={"200px"}
                            position="relative">
                        <Box height={"10vh"} w={"100%"} alignSelf={"center"} alignContent={"end"}
                             textAlign={"-webkit-center"} bgColor={"#faf0e6"} mb={4}>
                            <Text className={"cafelab"} px={useBreakpointValue({base: 4, md: 8})} fontWeight="normal"
                                  align="center" fontSize={fontHl}
                                  lineHeight={"100%"} letterSpacing="-0.04em">
                                {t('home.firstCoffeeShop').toUpperCase()}
                            </Text>
                        </Box>
                        <Button leftIcon={<FaMapMarkerAlt/>} alignSelf={"center"} borderRadius={"3xl"}
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