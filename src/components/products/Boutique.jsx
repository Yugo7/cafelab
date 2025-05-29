import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Stack,
    Spinner,
    Input,
    Select,
    Grid,
    GridItem,
    Button,
    Image,
    Divider, Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { getProductsBySection, Sections } from "../../services/productsService";
import ProductList from "./ProductList";
import OurPicks from "./OurPicks";
import SidebarWithHeader from "../shared/SideBar";
import { useTranslation } from "react-i18next";

export default function Boutique() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [section, setSection] = useState();
    const [sortOption, setSortOption] = useState("price");
    const [searchTerm, setSearchTerm] = useState("");

    const location = useLocation();
    const { coffeeId } = queryString.parse(location.search);

    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const productNameColumn = `nome_${lang === "en" ? "en" : "pt"}`;

    const filteredProducts = products.filter(product =>
        product[productNameColumn] && product[productNameColumn].toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setIsLoading(true);
        getProductsBySection(section)
            .then(data => {
                const sortedProducts = data.sort((a, b) => {
                    if (sortOption === "price") return a.preco - b.preco;
                    if (sortOption === "date") return new Date(a.created_at) - new Date(b.created_at);
                    return 0;
                });
                setProducts(sortedProducts);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [section, sortOption]);

    return (
        <SidebarWithHeader>
            <Box position="relative" overflow="hidden">
                <Image
                    src="https://www.svgrepo.com/download/163174/coffee-grains.svg"
                    position="absolute"
                    top="5%"
                    left="-40px"
                    boxSize={["60px", "80px", "100px"]}
                    opacity={0.06}
                    zIndex={0}
                />
                <Image
                    src="https://www.svgrepo.com/download/163174/coffee-grains.svg"
                    position="absolute"
                    bottom="10%"
                    right="-40px"
                    boxSize={["60px", "80px", "100px"]}
                    opacity={0.06}
                    zIndex={0}
                />

                <Stack justify="flex-start" align="center" my={6} mx={4} spacing={6} zIndex={1} position="relative">
                    <Text fontSize={["3xl", "5xl"]} fontWeight="bold" textAlign="center">
                        {t("boutique.title").toUpperCase()}
                    </Text>
                    <Text maxW="800px" fontSize={["md", "lg"]} color="gray.700" textAlign="center">
                        {t("boutique.description")}
                    </Text>
                </Stack>

                <Stack backgroundColor="whiteAlpha.50" spacing={6} px={4} zIndex={1} position="relative">
                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4} alignItems="center">
                        <GridItem />
                        <GridItem>
                            <Stack direction="row" justify="center">
                                <Button onClick={() => setSection(section === Sections.CAFE ? null : Sections.CAFE)}>
                                    {t("boutique.coffeeButton").toUpperCase()}
                                </Button>
                                <Button onClick={() => setSection(section === Sections.BOUTIQUE ? null : Sections.BOUTIQUE)}>
                                    {t("boutique.boutiqueButton").toUpperCase()}
                                </Button>
                            </Stack>
                        </GridItem>
                        <GridItem>
                            <Select maxW="200px" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                                <option value="price">{t("boutique.sortByPrice")}</option>
                                <option value="date">{t("boutique.sortByDate")}</option>
                            </Select>
                        </GridItem>
                    </Grid>

                    <Flex justify="center">
                        <Input
                            placeholder={t("boutique.searchPlaceholder")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            maxW="300px"
                        />
                    </Flex>

                    {isLoading ? (
                        <Spinner alignSelf="center" />
                    ) : (
                        <Stack spacing={6} divider={<Divider borderColor="gray.200" />}>
                            <ProductList products={filteredProducts} openProduct={coffeeId} />
                        </Stack>
                    )}
                </Stack>

                <Stack align="center" mx={10} py={10} zIndex={1} position="relative">
                    <OurPicks />
                </Stack>
            </Box>
        </SidebarWithHeader>
    );
}
