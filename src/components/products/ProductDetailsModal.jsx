import {
    Box,
    Button,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {formatCurrency} from "../utilities/formatCurrency.jsx";
import {useNavigate} from "react-router-dom";
import React from "react";

const ProductModal = ({isOpen, onClose, product}) => {
    const fontHl3 = useBreakpointValue({base: "lg", md: "2xl"});
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity} = useShoppingCart();
    const navigate = useNavigate();
    const quantityInCart = getItemQuantity(product.id);

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size={"6xl"} >
            <ModalOverlay
                bg='rgba(0, 0, 0, 0.5)'
            />
            <ModalContent textAlign={"center"} p={4} m={2} shadow={"none"} border={"1px"} >
                <ModalHeader ><Text className="cafelab text-center" fontWeight={"bold"} fontSize={fontHl3}>{product.nome.toUpperCase()}</Text></ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack m={6}>
                        <Image maxH={"400px"} src={product.imagem} alt={product.nome} alignSelf={"center"}/>
                    </Stack>
                    <Stack m={6} >
                        <Text maxW={"600px"} alignSelf={"center"} >{product.descricao}</Text>

                        <Text color='black' fontSize='2xl' alignSelf={"right"}>
                            {formatCurrency(product.preco)}
                        </Text>
                    </Stack>

                    <HStack justifyContent={"center"} py={6}>
                        {quantityInCart > 0 ? (
                            <>
                                <Button variant='ghost' onClick={() => decreaseCartQuantity(product.id)}>-</Button>
                                <Box mx={2} alignSelf={"center"}>
                                    <span fontSize={3}>{quantityInCart}</span>
                                </Box>
                                <Button variant='ghost' onClick={() => increaseCartQuantity(product.id)}>+</Button>
                            </>
                        ) : (
                            <Button variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}
                                    onClick={() => increaseCartQuantity(product.id)}>
                                Add to cart
                            </Button>
                        )}

                        <Button ml={2} variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} onClick={() => navigate('/checkout')}>
                            Buy now
                        </Button> </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ProductModal;