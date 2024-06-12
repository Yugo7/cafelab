import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

//const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = 'http://localhost:3000/sp/';

const StripeService = {
    createCustomer: async (email, name) => {
        try {
            const response = await axios.post(`${BASE_URL}create-customer`, {
                email: email,
                name: name
            });
            return response.data;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    },
    updateStripeCustomerAddress: async (customerId, shippingInfo) => {
        try {
            const response = await axios.post(`${BASE_URL}update-customer-address`, {
                customerId: customerId,
                shippingInfo: shippingInfo
            });
            return response.data;
        } catch (error) {
            console.error('Error updating customer address:', error);
            throw error;
        }
    },

    createStripeSubscription: async (stripeCustomer, priceId) => {
        try {
            const response = await axios.post(`${BASE_URL}create-subscription`, {
                stripeCustomer: stripeCustomer,
                priceId: priceId
            });
            return response.data;
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw error;
        }
    },

    createPaymentMethod: async (card, email) => {
        try {
            const response = await axios.post(`${BASE_URL}create-payment-method`, {
                card: card.getValue,
                email: email
            });
            return response.data;
        } catch (error) {
            console.error('Error creating payment method:', error);
            throw error;
        }
    },

    createCheckoutSession: async (priceId) => {
        console.log("Creating checkout session");
        try {
            const response = await axios.post(`${BASE_URL}create-checkout-session`, {
                priceId: priceId
            });
            console.log("Checkout session created: ", response.data.session.url);
            window.location.href =  response.data.session.url;
            return response.data;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }

    }
}

export default StripeService;

export const updateStripeCustomerAddress = async (customerId, shippingInfo) => {
    const customer = await stripe.customers.update(customerId, {
        address: {
            line1: shippingInfo.address.line1,
            city: shippingInfo.address.city,
            postal_code: shippingInfo.address.postal_code,
            country: shippingInfo.address.country,
        },
    });

    console.log("Updated customer: ", customer);
    return customer;
}

export const createStripeSubscription = async (stripeCustomer, priceId, cardElement) => {

    const subscription = await stripe.subscriptions.create({
        customer: stripeCustomer,
        items: [{price: priceId}],
        payment_settings: {
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription',
        },
    });

    console.log("subscription: " );
    return subscription;
}

export const createPaymentMethod = async (cardElement, email) => {

    const { error, paymentMethod } = await stripe.paymentMethods.create({
        type: 'card',
        card: cardElement,
        billing_details: {
            email: email,
        },
    });

    if (error) {
        console.log("Error creating payment method: ", error);
        return null;
    }

    return paymentMethod;
}