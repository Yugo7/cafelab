import {Box, Button, Grid, Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import React from "react";

export const CoffeeOfTheMonth = ({t, navigate, fontHl}) => {
        return (
            <Stack spacing={0} width="100%" justify="center" alignItems={"center"}>
                <Text className={"cafelab"} py={8} px={useBreakpointValue({base: 4, md: 8})} fontWeight="Bold"
                      align="center"
                      fontSize={fontHl}
                      lineHeight={"80%"} letterSpacing="-0.04em"
                      color="black">
                    {t('monthCoffee.coffeeOfTheMonth').toUpperCase()}
                </Text>
                <Grid templateColumns={{base: "1fr", md: "1fr 1fr"}} gap={4} m={8} borderWidth="4px" borderColor={"black"}
                      borderRadius="lg" overflow="hidden" alignItems={"center"} maxW={"1000px"}>
                    <Image
                        objectFit="cover"
                        width="auto"
                        height="auto"
                        src="assets/angola.png" alt="Coffee of the Month"/>
                    <Box textAlign="center" m={4}>
                        <Text className="cafelab" fontSize={useBreakpointValue({base: "5vw", md: "3vw"})} color="black"
                              mt={4}>
                            ANGOLA
                        </Text>
                        <Text className="cafelab" fontWeight="normal" fontSize={useBreakpointValue({base: "xl", md: "3xl"})}
                              color="black" mt={4}>
                            {t('monthCoffee.coffeeOfTheMonthDescription')}
                        </Text>
                        <Button mt={4} size='lg' variant={"solid"} backgroundColor={"black"} color={"white"}
                                onClick={() => navigate('/boutique?coffeeId=5')}>
                            {t('monthCoffee.learnMore')}
                        </Button>
                    </Box>
                </Grid>
            </Stack>
        );
    }
;