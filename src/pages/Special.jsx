import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import React from "react";
import {useTranslation} from "react-i18next";

const Special = () => {
    const fontHeadlineSize = useBreakpointValue({base: "lg", md: "2xl"});
    const {t} = useTranslation();
    return (
        <SidebarWithHeader>
            <Stack m={4} justify="flex-start" align="center" spacing="24px" textAlign={"center"}>
                <Text className="headline mt-5" fontSize={"3xl"}>{t('special.title').toUpperCase()}</Text>
                <Text className="font-headline" fontSize={"3xl"} textAlign={"center"}>
                    €25.00
                </Text>
            </Stack>
            <Stack justify="flex-start" align="center">
                <Text maxW={"800px"} fontFamily="Roboto" fontWeight="regular" fontSize={fontHeadlineSize}
                      letterSpacing="tighter" color="black"
                      textAlign="center" mx={4}
                      whiteSpace="pre-line">
                    {t('special.description')}
                </Text>

            </Stack>


            <Image
                alignSelf="center"
                src='https://aygbtvycljt8mna3.public.blob.vercel-storage.com/Brunch%20sao%20valentin-iOhlPcM7Ieh4DAcpp6eU11khG0Po1a.jpg'
                alt='Chakra UI'
                maxH={{base: "", md: "500px"}}
                maxW={{base: "90vw", md: "600px"}}
            />

            <Stack m={4} justify="flex-start" align="center" spacing="24px" textAlign={"center"}>
                <Text maxW={"800px"} fontFamily="Roboto" fontWeight="regular" fontSize={fontHeadlineSize}
                      letterSpacing="tighter" color="black"
                      textAlign="center" mx={4} whiteSpace="pre-line">
                    {t('special.brunchItems')}
                </Text>
            </Stack>

            <Stack m={4} p={6}  alignSelf={"center"} maxW={"500px"} className=" cafelab d-flex align-items-left">
                <Text alignSelf={"center"} color="red.500" fontSize="xl">
                    {t('special.saleOver')}
                </Text>
                <Text m={4} fontSize={"md"}>
                    {t('special.rules.name')}
                    <br/>
                    - {t('special.rules.redeemDate')}
                    <br/>
                    - {t('special.rules.redeemHour')}
                    <br/>
                    - {t('special.rules.includes')}
                    <br/>
                    - {t('special.rules.noShipping')}
                    <br/>
                    - {t('special.rules.limit')}
                </Text>
            </Stack>
        </SidebarWithHeader>
    );
}

export default Special;