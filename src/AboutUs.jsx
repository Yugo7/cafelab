import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Stack, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const AboutUs = () => {

    const { t } = useTranslation();
    return (

        <SidebarWithHeader>
            <Stack m={4} justify="flex-start" align="center" spacing="24px">
                <Text className="headline mt-5" fontSize={"3xl"}>{t('aboutUs.title')}</Text>
            </Stack>
            <Stack  minHeight={"60vh"} justify={"center"} m={4} align="center" spacing="24px">
                <Text width='90%' >
                    {t('aboutUs.content')}
                </Text>
            </Stack>
        </SidebarWithHeader>
    );
}

export default AboutUs;