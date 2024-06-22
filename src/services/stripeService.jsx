import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StripeService = {
    createCustomer: async (email, name) => {
        try {
            const response = await axios.post(`${BASE_URL}sp/create-customer`, {
                email: email,
                name: name
            });
            return response.data;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    },

    createCheckoutSession: async (cart) => {
        try {
            const response = await axios.post(`${BASE_URL}sp/create-checkout`, {
                cart: cart
            });
            window.location.href =  response.data.session.url;
            return response.data;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }

    },

    createSubscriptionCheckoutSession: async (subscription) => {
        try {
            const response = await axios.post(`${BASE_URL}sp/create-checkout-session`, {
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
