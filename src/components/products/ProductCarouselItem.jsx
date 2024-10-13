import {Box, Button, Card, Grid, GridItem, Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import React, {useEffect, useMemo, useState} from "react";
import {useSubscription} from "../context/SubscriptionContext.jsx";
import { useTranslation } from 'react-i18next';

export default function ProductCarouselItem({product, isActive}) {
    const stackSpacing = useBreakpointValue({base: "20px", md: "40px"});
    const fontHl = useBreakpointValue({base: "2xl", md: "52px"});
    const fontHl2 = useBreakpointValue({base: "lg", md: "2xl"});
    const fontContent = useBreakpointValue({base: "md", md: "xl"});
    const sectionHeight = useBreakpointValue({base: "90%", md: "90%"});
    const imageHeight = useBreakpointValue({base: "200px", md: "350px"});
    const gridValue = useBreakpointValue({base: "1fr", md: "repeat(2, 1fr)"});

    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const productNameColumn = `nome_${lang === 'en' ? 'en' : 'pt'}`;
    const productDescriptionColumn = `descricao_${lang === 'en' ? 'en' : 'pt'}`;
    const productSizeColumn = `size_${lang === 'en' ? 'en' : 'pt'}`;

    const {
        getCoffeeQuantity,
        addCoffee,
        removeCoffee
    } = useSubscription();
    
    console.log("product => ", product);

    const [coffeeQuantity, setCoffeeQuantity] = useState(getCoffeeQuantity(product[productNameColumn]));

    useEffect(() => {
        setCoffeeQuantity(getCoffeeQuantity(product[productNameColumn]));
    }, [getCoffeeQuantity, product[productNameColumn]]);

    return (
        <Box className={isActive ? "carousel-item active" : "carousel-item"}>
            <Stack mb={8} align={'center'}>
                <Stack direction={"row"}>
                    <Button variant='ghost' onClick={() => removeCoffee(product[productNameColumn])}>-</Button>
                    <Stack mx={2} alignSelf={"center"}>
                        <span>{coffeeQuantity}</span>
                    </Stack>
                    <Button variant='ghost' onClick={() => addCoffee(product[productNameColumn])}>+</Button>
                </Stack>
            </Stack>
            <Stack alignItems="center" align="center">
                <Card height={sectionHeight} align='stretch' maxWidth="100%" backgroundSize={"cover"}
                       backgroundColor="whiteAlpha.50" variant='outline' border={"1px"} spacing={stackSpacing}>
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
                                src={product.imagem}
                                alt="Description"
                                borderRadius='lg'
                                objectFit='contain'
                                maxHeight={imageHeight}
                                mb={5}
                            />
                        </Box>

                        <GridItem rowSpan={1}>
                            <Stack justify="flex-end" maxWidth="100%" mt={4}>
                                <Text className="font-headline text-center" fontSize={fontHl}>{product[productNameColumn]}</Text>
                                <Text className="font-headline text-center" fontSize={fontHl2}>Origem: {product.origem}</Text>
                            </Stack>
                            <Stack justify="flex-end" maxWidth="100%" my={5}>
                                <Text className="roboto  text-left" fontSize={fontContent}>{product[productDescriptionColumn]}</Text>
                            </Stack>
                            <Stack justify="flex-end" maxWidth="100%" mb={5}>
                                <Text className="roboto text-left" fontWeight={"bold"} fontSize={fontContent}>Variedade: {product.grao}</Text>
                            </Stack>
                        </GridItem>
                    </Grid>
                </Card>
            </Stack>
        </Box>
    )
}