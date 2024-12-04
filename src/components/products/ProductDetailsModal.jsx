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
    Stack, Tag,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";
import { formatCurrency } from "../utilities/formatCurrency.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation } from 'react-i18next';

const ProductModal = ({ isOpen, onClose, product }) => {
    const fontHl3 = useBreakpointValue({ base: "lg", md: "2xl" });
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
    const navigate = useNavigate();
    const quantityInCart = getItemQuantity(product.id);
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const productNameColumn = `nome_${lang === 'en' ? 'en' : 'pt'}`;
    const productDescriptionColumn = `descricao_${lang === 'en' ? 'en' : 'pt'}`;
    const productSizeColumn = `size_${lang === 'en' ? 'en' : 'pt'}`;

    function buyNow(id) {
        increaseCartQuantity(id);
        navigate('/checkout');
        onClose(); // Close the modal after navigating
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size={"xl"}>
            <ModalOverlay bg='rgba(0, 0, 0, 0.5)' />
            <ModalContent textAlign={"center"} p={4} m={2} shadow={"none"} border={"1px"} maxHeight="80vh" overflowY="auto">
                <ModalHeader>
                    <Text className="cafelab text-center" fontWeight={"bold"} fontSize={fontHl3}>
                        {product[productNameColumn]}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody maxHeight="70vh" overflowY="auto">
                    <Stack m={6}>
                        <Image maxH={"400px"} src={product.imagem} alt={product[productNameColumn]} alignSelf={"center"} />
                    </Stack>
                    <Box align='center'>
                        <Tag size={"md"}>{product[productSizeColumn]}</Tag>
                    </Box>
                    <Stack m={6}>
                        <Text maxW={"600px"} alignSelf={"center"}>{product[productDescriptionColumn]}</Text>
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
                                {t('boutique.addToCart')}
                            </Button>
                        )}
                        <Button ml={2} variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} onClick={() => buyNow(product.id)}>
                            {t('boutique.buyNow')}
                        </Button>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ProductModal;