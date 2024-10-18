import React, { useState } from 'react';
import { Box, Button, Card, CardBody, CardFooter, Divider, Image, Tag, Stack, Text, useBreakpointValue, Wrap, WrapItem } from "@chakra-ui/react";
import { ButtonGroup } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";
import { formatCurrency } from "../utilities/formatCurrency.jsx";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductDetailsModal.jsx";
import { useTranslation } from 'react-i18next';

const ProductList = ({ products }) => {
    const fontHl3 = useBreakpointValue({ base: "lg", md: "2xl" });
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
        <Wrap justify={"center"} spacing={"30px"} m={5}>
            {
                products.map((product) => {
                    const quantityInCart = getItemQuantity(product.id);
                    return (
                        <WrapItem>
                            <Card width='sm' bgColor={"whiteAlpha.50"} variant='outline' border={"1px"} height={"826px"}>
                                <CardBody onClick={() => handleCardClick(product)} >
                                    <Stack mt='6' spacing='8'>
                                        <Text className="cafelab text-center" fontWeight={"bold"} fontSize={fontHl3}>{product[productNameColumn].toUpperCase()}</Text>
                                        <Box
                                            align='center'
                                        >
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
                                        <Text maxHeight={"100px"} overflow="auto" >
                                            {product[productDescriptionColumn]}
                                        </Text>
                                        <Text color='black' fontSize='2xl' alignSelf={"right"}>
                                            {formatCurrency(product.preco)}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <CardFooter>
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
                            {currentProduct && (
                                <ProductModal isOpen={isModalOpen} onClose={handleCloseModal} product={currentProduct} />
                            )}
                        </WrapItem>
                    )
                }
                )
            }
        </Wrap>
    );
};

export default ProductList;