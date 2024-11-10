import SidebarWithHeader from "../shared/SideBar.jsx";
import {
    Image,
    Stack,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";
import React from "react";
import CardFeNoCafe from "./CardFeNoCafe.jsx";
import CardMeExpresso from "./CardMeExpresso.jsx";
import { useTranslation } from "react-i18next";

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

                <Text align="center" fontWeight={"bold"} fontSize="2xl" px={8} my={4}>{t('subscription.motto')}</Text>
                <Stack direction={["column", 'row']} pt={8}>
                    <CardFeNoCafe />
                    <CardMeExpresso />
                </Stack>
            </Stack>
        </SidebarWithHeader>
    );
}

export default Subscricao;
