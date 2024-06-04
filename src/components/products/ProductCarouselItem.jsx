import {Box, Button, Grid, GridItem, Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {FiPackage} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import {useSubscription} from "../context/SubscriptionContext.jsx";

export default function ProductCarouselItem({id, nome, descricao, origem, variedade, grao, preco, imagem, alt}) {
    const stackSpacing = useBreakpointValue({base: "20px", md: "40px"});
    const fontHl = useBreakpointValue({base: "2xl", md: "52px"});
    const fontHl2 = useBreakpointValue({base: "lg", md: "2xl"});
    const fontContent = useBreakpointValue({base: "md", md: "2xl"});
    const buttonSize = useBreakpointValue({base: "sm", md: "lg"});
    const sectionHeight = useBreakpointValue({base: "90%", md: "90%"});
    const imageHeight = useBreakpointValue({base: "200px", md: "350px"});
    const gridValue = useBreakpointValue({base: "1fr", md: "repeat(2, 1fr)"});

    const navigate = useNavigate();
    const gridTemplateColumns = useBreakpointValue({ base: "1fr", md: "repeat(2, 1fr)" });

    const {
        getCoffeeQuantity,
        addCoffee,
        removeCoffee,
        boxQuantity,
        emptyBox
    } = useSubscription();

    const [coffeeQuantity, setCoffeeQuantity] = useState(getCoffeeQuantity(nome));

    useEffect(() => {
        setCoffeeQuantity(getCoffeeQuantity(nome));
    }, [getCoffeeQuantity, nome]);

    return (
        <Box className={id === 1 ? "carousel-item active" : "carousel-item"}>
            <Stack mb={8} align={'center'}>
                <Stack direction={"row"}>
                    <Button variant='ghost' onClick={() => removeCoffee(nome)}>-</Button>
                    <Stack mx={2} alignSelf={"center"}>
                        <span fontSize={3}>{coffeeQuantity}</span>
                    </Stack>
                    <Button variant='ghost' onClick={() => addCoffee(nome)}>+</Button>
                </Stack>
            </Stack>
            <Stack alignItems="center" align="center" mx={4}>
                <Stack m={2} height={sectionHeight} align='stretch' maxWidth="100%" backgroundSize={"cover"}
                       backgroundColor="cornsilk" spacing={stackSpacing}>
                    <Grid
                        m={4}
                        height={sectionHeight}
                        templateColumns={gridValue}
                    >
                        <Box
                            minW={'300px'}
                            align='center'
                            mt={8}
                        >
                            <Image
                                src={imagem}
                                alt="Description"
                                borderRadius='lg'
                                objectFit='contain'
                                maxHeight={imageHeight}
                            />
                        </Box>

                        <GridItem rowSpan={1}>
                            <Stack justify="flex-end" maxWidth="100%" mt={4}>
                                <Text className="font-headline text-center" fontSize={fontHl}>{nome}</Text>
                                <Text className="font-headline text-center" fontSize={fontHl2}>Origem:{origem}</Text>
                            </Stack>
                            <Stack justify="flex-end" maxWidth="100%" mt={5}>
                                <Text className="roboto  text-left" fontWeight={"bold"} fontSize={fontContent}>{descricao}</Text>
                            </Stack>
                            <Stack justify="flex-end" maxWidth="100%">
                                <Text className="roboto text-left" fontSize={fontContent}>Variedade: {variedade}</Text>
                            </Stack>
                        </GridItem>
                    </Grid>
                </Stack>
            </Stack>
        </Box>
    )
}