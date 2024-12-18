import React from 'react';
import {Box, Card, CardBody, Image, Stack, Text, useBreakpointValue, Wrap, WrapItem} from "@chakra-ui/react";
import {useShoppingCart} from "../../context/ShoppingCartContext.jsx";
import {formatCurrency} from "../utilities/formatCurrency.jsx";

const MenuList = ({menuItems}) => {
    const fontHl3 = useBreakpointValue({base: "lg", md: "2xl"});
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity} = useShoppingCart();

    if (menuItems.length <= 0) {
        return (
            <Text mt={5}>No items available</Text>
        )
    }

    return (
        <Wrap justify={"center"} spacing={"30px"}>
            {
                menuItems.map((product) => {
                        return (
                            <WrapItem>
                                <Card width='100%' bgColor={"whiteAlpha.50"} variant='outline' border={"1px"}>
                                    <CardBody w={"xs"}>
                                        <Stack mt='6' spacing='8'>
                                            <Text className="cafelab text-center" fontWeight={"bold"} fontSize={fontHl3}>{product.name.toUpperCase()}</Text>
                                            <Box
                                                align='center'
                                            >
                                                <Image
                                                    src={product.imgUrl}
                                                    //TODO add alt text
                                                    alt="Description"
                                                    borderRadius='lg'
                                                    objectFit='contain'
                                                    maxHeight={"350px"}
                                                />
                                            </Box>
                                            <Text maxHeight={"100px"} overflow="hidden" textOverflow="ellipsis">
                                                {product.description}
                                            </Text>
                                            <Text color='black' fontSize='2xl' alignSelf={"right"}>
                                                {formatCurrency(product.price)}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            </WrapItem>
                        )
                    }
                )
            }
        </Wrap>
    );
};

export default MenuList;