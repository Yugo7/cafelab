import Stripe from 'stripe';
import {CheckoutFormSubscricao} from "./CheckoutFormSubscricao.jsx";
new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
export default function CheckoutSubscricao() {
    console.log(subscription)
    return <CheckoutFormSubscricao/>;
}