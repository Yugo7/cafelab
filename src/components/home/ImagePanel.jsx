
import { Box, Button, Image, HStack, Stack, Tag, Text } from "@chakra-ui/react";
import { FiBook, FiShoppingBag } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency.jsx";

import { useNavigate } from "react-router-dom";
const ImagePanel = () => {

    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const { products } = useShoppingCart();
    const navigate = useNavigate();

    const quantityInCart = 1;

    const productNameColumn = `nome_${lang === 'en' ? 'en' : 'pt'}`;
    const productDescriptionColumn = `descricao_${lang === 'en' ? 'en' : 'pt'}`;
    const productSizeColumn = `size_${lang === 'en' ? 'en' : 'pt'}`;
    return (<Carousel
        centerMode={false}
        containerClass="container"
        autoPlay
        autoPlaySpeed={5000}
        infinite
        minimumTouchDrag={80}
        pauseOnHover
        responsive={{
            desktop: {
                breakpoint: {
                    max: 3000,
                    min: 1024
                },
                items: 3,
                partialVisibilityGutter: 40
            },
            mobile: {
                breakpoint: {
                    max: 464,
                    min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
            },
            tablet: {
                breakpoint: {
                    max: 1024,
                    min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
            }
        }}
        slidesToSlide={1}
    >
        {products.map((product) => (

            <Stack >
                <Stack>
                    <Stack m={6} className="image-container" >
                        <Image src={product.imagem} alt={product[productNameColumn]} />
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
                </Stack>
            </Stack>
        ))}
    </Carousel>
    );
};

export default ImagePanel;
