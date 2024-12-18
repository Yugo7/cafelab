import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from "../../context/ShoppingCartContext.jsx";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogOverlay,
    useDisclosure
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from '/src/animations/emptybag.json';
import { useAuth } from "../../context/AuthContext.jsx";
import StripeService from "../../services/stripeService.jsx";

export default function Checkout() {
    const { cartItems, subscription, products, variety } = useShoppingCart()
    const navigate = useNavigate();
    const { onClose } = useDisclosure()
    const { customer } = useAuth();

    if (!cartItems.length && !subscription.length) {
        return (
            <AlertDialog
                motionPreset='slideInBottom'
                onClose={() => {
                    onClose();
                    navigate('/boutique');
                }}
                isOpen={true}
                isCentered

            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Lottie options={{ animationData }} />
                        Carrinho vazio
                    </AlertDialogBody>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>)
    }

    useEffect(() => {
        console.log('customer', customer);
        const cart = {
            user: customer,
            items: cartItems,
            variety: variety
        };
        StripeService.createCheckoutSession(cart);
    }, [cartItems, products, customer]);
}