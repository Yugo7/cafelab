import {Box, Flex, Text} from "@chakra-ui/react";
import React from "react";
import {useNavigate} from "react-router-dom";

const TopMenu = () => {
    const navigate = useNavigate();
    return (
        <>
            <Flex
                w="100%"
                alignItems="center" // Vertically center the inner Box
                justifyContent="flex-start" // Horizontally position inner Box to the start (left)
                bgColor="#ADDCC8"
            >
                <Box
                    minHeight="7vh" // Allow height to grow if needed, or keep height="7vh"
                    w={{base: "80vw", sm: "60vw", md: "40vw"}} // Responsive width using breakpoints
                    borderRadius="3xl"
                    overflow="hidden"
                    bgColor="#092607"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    p={2}
                    onClick={() => navigate('/')}
                >
                    <Text className="cafelab" fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}} color="white">
                        HOME
                    </Text>
                </Box>
            </Flex>
            <Flex
                w="100%"
                alignItems="center" // Vertically center the inner Box
                justifyContent="center" // Horizontally position inner Box in the center
                bgColor="#ADDCC8"
            >
                <Box
                    minHeight="7vh"
                    w={{base: "80vw", sm: "70vw", md: "50vw"}}
                    borderRadius="3xl"
                    overflow="hidden"
                    bgColor="white"
                    onClick={() => navigate('/boutique')}
                >
                    <Box
                        bgColor="#ffbbac" // Inner background color
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        minHeight="7vh" // Ensure inner box takes height
                        p={2}
                    >
                        <Text className="cafelab" fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}} color="black">
                            BOUTIQUE
                        </Text>
                    </Box>
                </Box>
            </Flex>

            <Flex
                w="100%"
                alignItems="center" // Vertically center the inner Box
                justifyContent="flex-end" // Horizontally position inner Box to the end (right)
                bgColor="#ADDCC8"
            >
                <Box
                    minHeight="7vh"
                    w={{base: "80vw", sm: "65vw", md: "45vw"}}
                    borderRadius="3xl"
                    overflow="hidden"
                    bgColor="#092607"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center" // Standard text align
                    p={2}
                    onClick={() => navigate('/subscricao')}
                >
                    <Text className="cafelab" fontWeight="normal" fontSize={{base: "lg", lg: "2xl"}} color="white">
                        SUBSCRICAO
                    </Text>
                </Box>
            </Flex>
        </>
    )
}

export default TopMenu;