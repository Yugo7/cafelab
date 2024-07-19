import {Button, Card, CardBody, CardFooter, Image, SimpleGrid, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {ButtonGroup} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import { useTranslation } from 'react-i18next';
import React from "react";

const OurPicks = () => {
    const stackSpacing = useBreakpointValue({base: "20px", md: "40px"});
    const {increaseCartQuantity} = useShoppingCart();
    
    const { t, i18n } = useTranslation();

    return (
        <Stack fluid className="my-5 text-center">
            <Text className="font-headline text-center" fontSize={stackSpacing}>Nossos favoritos</Text>
            /* TODO: fix image borders to fit in the card */
            <SimpleGrid spacing={4} mb={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                <Card
                    backgroundColor={"#FFFFFF"}>
                    <Image
                        src="assets/tanzania.png"
                        fluid
                        className="w-100"
                    />
                    <a href="#!">
                        <Stack className="mask">
                            <Stack className="d-flex justify-content-start align-items-end h-100">
                                <h5>
                                    <span className="badge bg-primary ms-2">Top Robusta</span>
                                </h5>
                            </Stack>
                        </Stack>
                        <Stack className="hover-overlay">
                            <Stack
                                className="mask"
                                style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}
                            ></Stack>
                        </Stack>
                    </a>
                    <CardBody>
                        <Text mb={3} fontWeight={"semibold"}>Tanzânia</Text>
                        <Text>Café</Text>
                        <Text mb={3} fontWeight={"semibold"}>€8.00</Text>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <Button ml={2} variant={"solid"} onClick={() => increaseCartQuantity(6)} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                
                            {t('boutique.addToCart')}
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card
                    backgroundColor={"#FFFFFF"}>
                    <Image
                        src="assets/ecobag.png"
                        fluid
                        className="w-100"
                        maxH={"260px"}
                    />
                    <a href="#!">
                        <Stack className="mask">
                            <Stack className="d-flex justify-content-start align-items-end h-100">
                                <h5>
                                    <span className="badge bg-success ms-2">Eco</span>
                                </h5>
                            </Stack>
                        </Stack>
                        <Stack className="hover-overlay">
                            <Stack
                                className="mask"
                                style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}
                            ></Stack>
                        </Stack>
                    </a>
                    <CardBody>
                        <Text mb={3} fontWeight={"semibold"}>Ecobag personalizada CAFELAB</Text>
                        <Text>Boutique</Text>
                        <Text mb={3} fontWeight={"semibold"}>€25.00</Text>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <Button ml={2} variant={"solid"} onClick={() => increaseCartQuantity(11)} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                
                            {t('boutique.addToCart')}
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card
                    backgroundColor={"#FFFFFF"}
                >
                    <Image
                        src="assets/etiopia.png"
                        className="w-100"
                        objectFit="fill"
                    />
                    <a href="#!">
                        <Stack className="mask">
                            <Stack className="d-flex justify-content-start align-items-end h-100">
                                <h5>
                                    <span className="badge bg-danger ms-2">Top Arábica</span>
                                </h5>
                            </Stack>
                        </Stack>
                        <Stack class="hover-overlay">
                            <Stack
                                className="mask"
                                style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}
                            ></Stack>
                        </Stack>
                    </a>
                    <CardBody>
                        <Text mb={3} fontWeight={"semibold"}>Etiópia</Text>
                        <Text>Café</Text>
                        <Text mb={3} fontWeight={"semibold"}>€12.50</Text>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <Button ml={2} variant={"solid"} onClick={() => increaseCartQuantity(1)} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                
                            {t('boutique.addToCart')}
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </SimpleGrid>
        </Stack>
    )
        ;
}


export default OurPicks;