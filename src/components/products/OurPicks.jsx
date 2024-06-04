import {Card, CardBody, Image, SimpleGrid, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import ProductCard from "./ProductCard.jsx";

const OurPicks = () => {
    const stackSpacing = useBreakpointValue({base: "20px", md: "40px"});
    return (
        <Stack fluid className="my-5 text-center">
            <Text className="font-headline text-center" fontSize={stackSpacing}>Nossos favoritos</Text>
            /* TODO: fix image borders to fit in the card */
            <SimpleGrid spacing={4} mb={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                <ProductCard>

                </ProductCard>
                <Card
                    backgroundColor={"#FFFFFF"}>
                    <Image
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                        fluid
                        className="w-100"
                    />
                    <a href="#!">
                        <Stack className="mask">
                            <Stack className="d-flex justify-content-start align-items-end h-100">

                                <h5>
                                    <span className="badge bg-primary ms-2">New</span>
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
                        <a href="#!" className="text-reset">
                            <h5 className="card-title mb-3">Product name</h5>
                        </a>
                        <a href="#!" className="text-reset">
                            <p>Category</p>
                        </a>
                        <h6 className="mb-3">$61.99</h6>
                    </CardBody>
                </Card>
                <Card
                    backgroundColor={"#FFFFFF"}>
                    <Image
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                        fluid
                        className="w-100"
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
                        <a href="#!" className="text-reset">
                            <h5 className="card-title mb-3">Product name</h5>
                        </a>
                        <a href="#!" className="text-reset">
                            <p>Category</p>
                        </a>
                        <h6 className="mb-3">$61.99</h6>
                    </CardBody>
                </Card>
                <Card
                    backgroundColor={"#FFFFFF"}
                >
                    <Image
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/shoes%20(3).webp"

                        className="w-100"
                        objectFit="fill"
                    />
                    <a href="#!">
                        <Stack className="mask">
                            <Stack className="d-flex justify-content-start align-items-end h-100">
                                <h5>
                                    <span className="badge bg-danger ms-2">-10%</span>
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
                        <a href="#!" className="text-reset">
                            <h5 className="card-title mb-3">Product name</h5>
                        </a>
                        <a href="#!" className="text-reset">
                            <p>Category</p>
                        </a>
                        <h6 className="mb-3">
                            <s>$61.99</s>
                            <strong className="ms-2 text-danger">$50.99</strong>
                        </h6>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </Stack>
    );
}


export default OurPicks;