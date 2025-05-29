import React, {useEffect} from "react";
import { Box, Image, AbsoluteCenter, Text } from "@chakra-ui/react";
import logo from '/assets/logo.png';
import { Stack } from "react-bootstrap";

const ScrollLogoEffect = (isScrolled) => {

    return (
        <Box
            position="fixed"
            top="0"
            left="50%"
            transform="translateX(-50%)"
            width={isScrolled ? "100px" : "1000px"}
            zIndex="1000"
            transition="all 0.4s ease"
        >
            <Box
                height={isScrolled ? "120px" : "300px"}
                position="relative"
                transition="height 0.9s ease"
            >
                <AbsoluteCenter>
                    <Image
                        src={logo}
                        alt="Logo"
                        height="auto"
                        objectFit="cover"
                        transition="all 0.9s ease"
                    />

                    <Stack py={{ base: "20px", lg: "30px" }}
                           transition="all 0.9s ease"
                           align="center" maxWidth="100%" spacing="30px">
                        <Stack justify="flex-start" align="center" width="100%" maxWidth="100%">
                            <Stack justify="flex-start" align="center" spacing="-20px">
                                <Text className="cafelab" fontSize={isScrolled ? "3xl" : "60px"} color={"Black"}>
                                    CAFELAB
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </AbsoluteCenter>
            </Box>
        </Box>
    );
};

export default ScrollLogoEffect;
