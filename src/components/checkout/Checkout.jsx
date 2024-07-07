import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Stripe from 'stripe';
import {CheckoutForm} from './StripeCheckout.jsx';
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import OrderService from "../../services/orderService.jsx";
import {useErrorBoundary} from "react-error-boundary";
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
import {useAuth} from "../context/AuthContext.jsx";
import StripeService from "../../services/stripeService.jsx";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
const shipping = 5;

export default function Checkout() {
    const [clientSecret, setClientSecret] = useState(null);
    const {cartItems, subscription, products, emptyCart} = useShoppingCart()
    const navigate = useNavigate();
    const {showBoundary} = useErrorBoundary();
    const {onClose} = useDisclosure()
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
                    <AlertDialogOverlay/>

                    <AlertDialogContent>
                        <AlertDialogCloseButton/>
                        <AlertDialogBody>
                            <Lottie options={{animationData}}/>
                            Carrinho vazio
                        </AlertDialogBody>
                        <AlertDialogFooter>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>)
    }

    useEffect( () => {
        const cart = {
            user: customer,
            items: cartItems,
        };
        StripeService.createCheckoutSession(cart);

    }, [cartItems, products]);

    if (!clientSecret) {
        return null; // or some loading state
    }

    return <CheckoutForm clientSecret={clientSecret}/>;
}