import {Box, Link, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube} from "react-icons/fa";

const Footer = () => {
    const paddingValue = useBreakpointValue({ base: "30px", md: "300px" });

    return (
        <Box className={"footer"} py="6" alignItems={"center"}>
            <Stack direction={['column', 'row']} spacing="4" align="center" justify="space-between">

                <Stack direction="column" spacing="1">
                    <Link href="/boutique">Coffee</Link>
                    <Link href="/sobre">About Us</Link>
                    <Link href="https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7">Location</Link>
                    <Link href="/contacto">Contact Us</Link>
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