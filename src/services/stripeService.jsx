import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
//const BASE_URL = 'http://localhost:3000/sp/';

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

    createCheckoutSession: async (subscription) => {
        try {
            const response = await axios.post(`${BASE_URL}create-checkout-session`, {
                subscription: subscription
            });
            window.location.href =  response.data.session.url;
            return response.data;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }

    }
}

export default StripeService;
