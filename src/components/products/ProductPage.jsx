import React, {useState, useEffect} from "react";
import {Box, Image, Text, Button, Stack, Flex, Divider, List, ListItem} from "@chakra-ui/react";
import {useParams, useNavigate} from "react-router-dom";
import {useShoppingCart} from "../../context/ShoppingCartContext.jsx";
import {productService} from "@/services/productsService.jsx";
import {useTranslation} from "react-i18next";
import SidebarWithHeader from "@/components/shared/SideBar.jsx";
import {ButtonGroup} from "react-bootstrap";
import {MdAddShoppingCart} from "react-icons/md";

const ProductPage = () => {
    const navigate = useNavigate();
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity} = useShoppingCart();
    const {t, i18n} = useTranslation();
    const lang = i18n.language;

    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        productService.getProductsById(id)
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => console.error("Error fetching product:", error));
    }, [id]);

    if (!product) {
        return <Text>{t("productPage.notFound")}</Text>;
    }

    // Determine the correct fields based on the language
    const productName = product[`nome_${lang === "en" ? "en" : "pt"}`];
    const productDescription = product[`descricao_${lang === "en" ? "en" : "pt"}`];
    const productSize = product[`size_${lang === "en" ? "en" : "pt"}`];
    const quantityInCart = getItemQuantity(product.id);

    return (
        <SidebarWithHeader hero={false}>
            <Box position="relative" overflowX="hidden" bg="#fdfdfd" fontFamily="'Inter', sans-serif">
                {/* Decorative Coffee Grains */}
                <Image
                    src="https://www.svgrepo.com/download/163174/coffee-grains.svg"
                    position="absolute"
                    top="10%"
                    left="-40px"
                    boxSize="120px"
                    opacity={0.06}
                    zIndex={0}
                />
                <Image
                    src="https://www.svgrepo.com/download/163174/coffee-grains.svg"
                    position="absolute"
                    bottom="20%"
                    left="-50px"
                    boxSize="100px"
                    opacity={0.06}
                    zIndex={0}
                />
                <Image
                    src="https://www.svgrepo.com/download/163174/coffee-grains.svg"
                    position="absolute"
                    top="20%"
                    right="-50px"
                    boxSize="100px"
                    opacity={0.06}
                    zIndex={0}
                />
                <Image
                    src="https://www.svgrepo.com/download/163174/coffee-grains.svg"
                    position="absolute"
                    bottom="10%"
                    right="-40px"
                    boxSize="120px"
                    opacity={0.06}
                    zIndex={0}
                />

                {/* Product Container */}
                <Box
                    maxW="760px"
                    mx="auto"
                    mt={12}
                    bg="white"
                    p={8}
                    textAlign="center"
                    zIndex={1}
                    position="relative"
                >
                    <Image
                        src={`/${product.imagem}`}
                        alt={productName}
                        maxH="400px"
                        objectFit="contain"
                        mx="auto"
                    />

                    <Stack mt={4} align="center">
                        <Text fontSize="3xl" fontWeight="bold">
                            {productName}
                        </Text>
                        <Text fontSize="md" color="gray.500">
                            {t("productPage.size")}: {productSize}
                        </Text>
                        <Text fontSize="2xl" fontWeight="semibold" color="#092607">
                            €{(product.preco / 100).toFixed(2)}
                        </Text>

                        <Box mb={6}>
                            <ButtonGroup>
                                {quantityInCart > 0 ? (
                                    <>
                                        <Button variant="ghost"
                                                onClick={() => decreaseCartQuantity(product.id)}>-</Button>
                                        <Text alignSelf="center">{quantityInCart}</Text>
                                        <Button variant="ghost"
                                                onClick={() => increaseCartQuantity(product.id)}>+</Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="solid"
                                        backgroundColor="#092607"
                                        color="antiquewhite"
                                        leftIcon={<MdAddShoppingCart/>}
                                        onClick={() => increaseCartQuantity(product.id)}
                                    >
                                        {t('boutique.addToCart')}
                                    </Button>
                                )}
                                <Button
                                    ml={2}
                                    variant="solid"
                                    backgroundColor="#092607"
                                    color="antiquewhite"
                                    onClick={() => buyNow(product.id)}
                                >
                                    {t('boutique.buyNow')}
                                </Button>
                            </ButtonGroup>
                        </Box>

                        <Text fontSize="lg" color="gray.600">
                            {productDescription}
                        </Text>

                        <List spacing={3} mt={8} textAlign="left" px={[2, 6]}>
                            <ListItem>Blend: Robusta (Africa) + Arabica (Americas)</ListItem>
                            <ListItem>Wood-roasted for a rich, traditional flavor</ListItem>
                            <ListItem>Taste: Slightly sweet, aromatic, and intense</ListItem>
                            <ListItem>250g sealed pouch for freshness</ListItem>
                        </List>

                        <Flex justifyContent="center" mt={4} alignItems="center" gap={1} color="yellow.400">
                            <Text ml={2} fontSize="sm" color="gray.600">(24 reviews)</Text>
                        </Flex>

                        <Divider my={8}/>

                        <Flex justifyContent="center" gap={4} mt={4} flexWrap="wrap">
                            <Image src="coffee-cup.jpg" alt="Brewed coffee" w="100px" h="100px" borderRadius="md"
                                   objectFit="cover" boxShadow="md"/>
                            <Image src="coffee-beans.jpg" alt="Coffee beans" w="100px" h="100px" borderRadius="md"
                                   objectFit="cover" boxShadow="md"/>
                            <Image src="packaging.jpg" alt="Product packaging" w="100px" h="100px" borderRadius="md"
                                   objectFit="cover" boxShadow="md"/>
                        </Flex>
                    </Stack>
                </Box>
            </Box>
        </SidebarWithHeader>
    );
};

export default ProductPage;