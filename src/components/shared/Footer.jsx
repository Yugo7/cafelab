import {Box, Link, Stack, useBreakpointValue} from "@chakra-ui/react";
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const paddingValue = useBreakpointValue({ base: "30px", md: "300px" });
    const { t } = useTranslation();

    return (
        <Box className={"footer"} py="6" alignItems={"center"}>
            <Stack direction={['column', 'row']} spacing="4" align="center" justify="space-between">
                <Stack direction="column" spacing="1">
                    <Link href="/sobre">{t('footer.aboutUs')}</Link>
                    <Link href="https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7">{t('footer.location')}</Link>
                    <Link href="/contacto">{t('footer.contactUs')}</Link>
                    <Link href="/servico">{t('footer.termsOfService')}</Link>
                    <Link href="/reembolso">{t('footer.refundPolicy')}</Link>
                </Stack>

                <Stack direction="row" pl={paddingValue} spacing="4">
                    <Link href="https://www.facebook.com/cafelablisbon" isExternal>
                        <FaFacebook />
                    </Link>
                    <Link href="https://www.instagram.com/cafelabpt/" isExternal>
                        <FaInstagram />
                    </Link>
                    <Link href="https://www.youtube.com/channel/UCQl_vcXvPTqBoX_cTEWklFg" isExternal>
                        <FaYoutube />
                    </Link>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Footer;