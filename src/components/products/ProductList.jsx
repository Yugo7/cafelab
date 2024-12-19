import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardBody, CardFooter, Image, Tag, Stack, Text, useBreakpointValue, SimpleGrid } from "@chakra-ui/react";
import { ButtonGroup } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { useShoppingCart } from "../../context/ShoppingCartContext.jsx";
import { formatCurrency } from "../utilities/formatCurrency.jsx";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductDetailsModal.jsx";
import { useTranslation } from 'react-i18next';

const ProductList = ({ products, openProduct }) => {
    const fontHl3 = useBreakpointValue({ base: "lg", md: "2xl" });
    const margin = useBreakpointValue({ base: "2", md: "4", xl: "10" });
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleCardClick = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (openProduct) {
            const product = products.find(p => p.id === parseInt(openProduct));
            if (product) {
                setCurrentProduct(product);
                setIsModalOpen(true);
            }
        }
    }, [openProduct, products]);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    function buyNow(id){
        increaseCartQuantity(id);
        navigate('/checkout')
    }
    const lang = i18n.language;

    const productNameColumn = `nome_${lang === 'en' ? 'en' : 'pt'}`;
    const productDescriptionColumn = `descricao_${lang === 'en' ? 'en' : 'pt'}`;
    const productSizeColumn = `size_${lang === 'en' ? 'en' : 'pt'}`;

    if (products.length <= 0) {
        return (
            <Text mt={5}> {t('boutique.notAvailable')}</Text>
        )
    }

    return (
        <SimpleGrid minChildWidth="min(300px, 95vw, 90vw)" spacing={"20px"} m={margin}>
            {
                products.map((product) => {
                    const quantityInCart = getItemQuantity(product.id);
                    return (
                        <Box key={product.id} display="flex" flexDirection="column">
                            <Card bgColor={"whiteAlpha.50"} variant='outline' border={"4px"} height="100%" display="flex" flexDirection="column">
                                <CardBody onClick={() => handleCardClick(product)} flex="1">
                                    <Stack mt='6' spacing='8'>
                                        <Text className="cafelab text-center" fontWeight={"bold"} fontSize={fontHl3}>{product[productNameColumn].toUpperCase()}</Text>
                                        <Box align='center'>
                                            <Image
                                                src={product.imagem}
                                                alt="Description"
                                                borderRadius='lg'
                                                objectFit='contain'
                                                maxHeight={"350px"}
                                            />
                                        </Box>
                                        <Box align='center'>
                                            <Tag size={"md"}>{product[productSizeColumn]}</Tag>
                                        </Box>
                                        <Text maxHeight={"100px"} overflow="auto">
                                            {product[productDescriptionColumn]}
                                        </Text>
                                        <Text color='black' fontSize='2xl' alignSelf={"center"}>
                                            {formatCurrency(product.preco)}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <CardFooter justifyContent={"center"} >
                                    <ButtonGroup spacing='2'>
                                        {
                                            quantityInCart > 0 ? (
                                                <>
                                                    <Button variant='ghost' onClick={() => decreaseCartQuantity(product.id)}>-</Button>
                                                    <Stack mx={2} alignSelf={"center"}>
                                                        <span fontSize={3}>{quantityInCart}</span>
                                                    </Stack>
                                                    <Button variant='ghost' onClick={() => increaseCartQuantity(product.id)}>+</Button>
                                                </>
                                            ) : (
                                                <Button variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} leftIcon={<MdAddShoppingCart />} onClick={() => increaseCartQuantity(product.id)}>
                                                    {t('boutique.addToCart')}
                                                </Button>
                                            )
                                        }
                                        <Button ml={2} variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} onClick={() => buyNow(product.id)}>
                                            {t('boutique.buyNow')}
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        </Box>
                    )
                })
            }
            {currentProduct && (
                <ProductModal isOpen={isModalOpen} onClose={handleCloseModal} product={currentProduct} />
            )}
        </SimpleGrid>
    );
};

export default ProductList;