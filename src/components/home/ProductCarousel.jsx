
import { Box, Card, Image, Stack, Tag, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";
import { formatCurrency } from "../utilities/formatCurrency.jsx";

const ProductImageCarousel = () => {

    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const { products } = useShoppingCart();

    const productNameColumn = `nome_${lang === 'en' ? 'en' : 'pt'}`;
    const productDescriptionColumn = `descricao_${lang === 'en' ? 'en' : 'pt'}`;
    const productSizeColumn = `size_${lang === 'en' ? 'en' : 'pt'}`;

    const filteredProducts = products.filter(product => product.secao === 'CAFE');

    return (<Carousel
        centerMode={false}
        autoPlay
        autoPlaySpeed={5000}
        infinite
        minimumTouchDrag={80}
        pauseOnHover
        responsive={{
            desktop: {
                breakpoint: {
                    max: 3000,
                    min: 1023
                },
                items: 3,
                partialVisibilityGutter: 40
            },
            mobile: {
                breakpoint: {
                    max: 1022,
                    min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
            }
        }}
        slidesToSlide={1}
    >
        {filteredProducts.map((product) => (
            <Stack>
                <Card width='auto' height={"430px"} bgColor={"whiteAlpha.50"} variant={{ base: "", md: "" }} border={{ base: "none", md: '4px' }}  mx={4}>
                    <Stack m={6} className="image-container" alignItems="center"
                            height="100%">
                        <Image
                            objectFit="contain" 
                            width="auto"
                            height="100%"
                            src={product.imagem}
                            alt={product[productNameColumn]} />
                        <Stack className="hover-info">
                            <Text className="cafelab text-center" fontWeight={"bold"} fontSize={"2xl"}>{product[productNameColumn]}</Text>
                            <Box align='center'>
                                <Tag variant={"solid"} size={"md"}>{product[productSizeColumn]}</Tag>
                            </Box>
                            <Text maxW={"600px"} alignSelf={"center"} maxH={"75%"} overflow="auto">{product[productDescriptionColumn]}</Text>

                            <Text fontSize='2xl' alignSelf={"center"}>
                                {formatCurrency(product.preco)}
                            </Text>
                        </Stack>
                    </Stack>
                </Card>
            </Stack>

        ))}
    </Carousel>
    );
};

export default ProductImageCarousel;
