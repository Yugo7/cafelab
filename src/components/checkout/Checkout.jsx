import React, {useContext, useEffect, useState} from 'react';
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
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from '/src/animations/emptybag.json';
import {useAuth} from "../context/AuthContext.jsx";
import StripeService from "../../services/stripeService.jsx";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

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
                        navigate('/');
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
        async function createPaymentIntent() {
            let total = cartItems.reduce((total, cartItem) => {
                const item = products.find(i => i.id === cartItem.id)
                return total + (item?.preco || 0) * cartItem.quantity
            }, 0);

            const order = {
                items: cartItems,
                total: total,
                paymentStatus: "PENDING"
            }
            if(customer){
                const stripeData = customer.stripeId ? customer.stripeId : await StripeService.createCustomer(customer.email, customer.name).then(data => data.id);

                order.user_id = customer.id;
                order.user_stripe_id = stripeData;
            }

            if (total === 0) return;
            const dbOrder = OrderService.addOrder(order);

            try {
                const paymentIntent =
                    await stripe.paymentIntents.create({
                        amount: Math.round(total * 100),
                        currency: 'EUR',
                        metadata: {order: "Normal purchase, order id: " + dbOrder.id}
                    });

                if (paymentIntent.client_secret == null) {
                    throw Error('Stripe failed to create payment intent');
                }

                setClientSecret(paymentIntent.client_secret);
            } catch (error) {
                showBoundary('Stripe failed to create payment intent: ' + error);
            }
        }

        try {
            createPaymentIntent();
        } catch (error) {
            showBoundary(error);
        }

    }, [cartItems, products]);

    if (!clientSecret) {
        return null; // or some loading state
    }

    return <CheckoutForm clientSecret={clientSecret}/>;
}