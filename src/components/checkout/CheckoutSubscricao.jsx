import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Stripe from 'stripe';
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {CheckoutFormSubscricao} from "./CheckoutFormSubscricao.jsx";
import {CardElement, useElements} from "@stripe/react-stripe-js";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export default function CheckoutSubscricao() {
    const [clientSecret, setClientSecret] = useState(null);
    const {cartItems, subscription, products, emptyCart} = useShoppingCart()
    const navigate = useNavigate();

    console.log(subscription)


    return <CheckoutFormSubscricao clientSecret={clientSecret}/>;
}