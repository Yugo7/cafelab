import React, {useEffect, useState, useRef} from 'react';
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {Box, Button, Grid, Flex, Image, Stack, Text, useBreakpointValue, VStack, Divider} from "@chakra-ui/react";
import {FiCalendar, FiPackage, FiShoppingBag} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {FaMapMarkerAlt, FaRegHeart} from "react-icons/fa";
import {Trans, useTranslation} from "react-i18next";
import ProductImageCarousel from "../components/home/ProductCarousel.jsx";
import MailMarketing from "@/components/email/MailMarketing.jsx";
import MailMarketingSignup from "@/components/popups/MailMarketingSignup.jsx";
import {CoffeeOfTheMonth} from "@/components/home/CoffeeOfTheMonth.jsx";
import TopMenu from "@/components/home/TopMenu.jsx";

const Home = () => {
    const {t, i18n} = useTranslation();

    const stackSpacing = useBreakpointValue({base: "20px", md: "30px"});
    const fontHl = useBreakpointValue({base: "3xl", lg: "5xl"});
    const fontImages = useBreakpointValue({base: "lg", lg: "1.3vw"});

    const navigate = useNavigate();

    return (
        <SidebarWithHeader>
            <CoffeeOfTheMonth t={t} navigate={navigate}/>
            <TopMenu/>
            <Stack pt={8} px={{base: "10px", md: "20px"}} bgColor={"#ADDCC8"}>
                <Stack bgColor={"#fff5f4"} borderRadius={"3xl"} overflow="hidden">

                    <Box height="auto" w={"100%"} alignSelf={"center"} alignContent={"end"} p={4}
                         textAlign={"-webkit-center"} bgColor={"#ffbbac"}>
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
                                <Button leftIcon={<FiShoppingBag/>} onClick={() => navigate('/boutique')} size='lg'
                                        borderRadius={"3xl"}
                                        height={{base: '80px', md: '100px'}} width={{base: '220px', md: '400px'}}
                                        variant={"solid"} backgroundColor={"#092607"} textColor={"#fff5f4"}
                                        fontSize={{base: "xl", lg: "2xl"}}>
                                    {t('home.storeButton')}
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Box paddingY="10px">
                </Box>
                <Stack bgColor={"#ffbbac"} p={4} borderRadius={"3xl"}>
                    <Stack spacing={0} width="100%" justify="center" pt={8} bgColor={"#ffbbac"}>
                        <Text className={"cafelab"} px={useBreakpointValue({base: 4, md: 8})} fontWeight="normal"
                              align="center" fontSize={fontHl}
                              lineHeight={"100%"} letterSpacing="-0.04em">
                            <Trans>{t('home.headlineText')}</Trans>
                        </Text>
                        <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={4} p={4} h={"auto"}
                              w={{base: "auto", md: "auto"}} alignItems={"center"} alignSelf={"anchor-center"}>
                            <Box bgColor={"#fff5f4"} borderRadius={"3xl"} p={4} w={{base: "3xs", lg: "sm"}}
                                 justifySelf={{base: "center", lg: "start"}}
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
                            <Box bgColor={"#fff5f4"} h={{base: "xs", lg: "lg"}} w={{base: "3xs", lg: "lg"}}
                                 borderRadius={"50%"} p={4}
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
                            <Box bgColor={"#fff5f4"} borderRadius={"3xl"} p={4} w={{base: "3xs", lg: "md"}}
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
                            <Box bgColor={"#fff5f4"} borderRadius={"3xl"} p={4} w={{base: "3xs", lg: "sm"}}
                                 alignSelf={"end"}
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
                        <Stack align={"center"} alignSelf={"anchor-center"} spacing={stackSpacing} maxWidth="10%"
                               py={8}>
                            <Button leftIcon={<FiPackage/>} onClick={() => navigate('/subscricao')} size='xl'
                                    borderRadius={"3xl"}
                                    height={{base: '80px', md: '100px'}} width={{base: '220px', md: '400px'}}
                                    variant={"solid"} backgroundColor={"#092607"} textColor={"#fff5f4"}
                                    fontSize={{base: "xl", lg: "2xl"}}>
                                {t('home.subscriptionButton')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>#ffbbac
                <Box paddingY="10px">
                </Box>
                <Stack bgColor={"#fff5f4"} borderRadius={"3xl"} overflow={"hidden"}>
                    <VStack direction={{base: "column", lg: 'row'}} minH={"200px"}
                            position="relative">
                        <Box height="auto" w={"100%"} alignSelf={"center"} alignContent={"end"}
                             textAlign={"-webkit-center"} bgColor={"#ffbbac"} mb={4} p={4}>
                            <Text className={"cafelab"} px={useBreakpointValue({base: 4, md: 8})} fontWeight="normal"
                                  align="center" fontSize={fontHl}
                                  lineHeight={"100%"} letterSpacing="-0.04em">
                                {t('home.firstCoffeeShop').toUpperCase()}
                            </Text>
                        </Box>
                        <Box height="auto" w={"100%"} textAlign={"center"} mb={4}>
                            <Button leftIcon={<FaMapMarkerAlt/>} alignSelf={"center"} borderRadius={"3xl"}
                                    onClick={() => window.open("https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7", "_blank")}
                                    size='lg' height='48px' width='200px'
                                    variant={"solid"} backgroundColor={"#092607"} textColor={"#fff5f4"}>
                                {t('home.openOnMaps')}
                            </Button>
                        </Box>
                    </VStack>
                </Stack>
                <MailMarketing/>
            </Stack>
        </SidebarWithHeader>
    )
}

export default Home;