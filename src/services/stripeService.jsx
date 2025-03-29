import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StripeService = {
    createCustomer: async (customer) => {
        try {
            console.log('Creating customer:', customer);
            const response = await axios.post(`${BASE_URL}user`, {
                customer
            });
            return response.data;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    },

    createCheckoutSession: async (cart) => {
        try {
            const response = await axios.post(`${BASE_URL}checkout/payment`, {
                cart: cart,
            });
            window.location.href =  response.data.url;
            return response.data;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
    },

    createSubscriptionCheckoutSession: async (subscription, user) => {
        try {
            const response = await axios.post(`${BASE_URL}checkout/subscription`, {
                subscription: subscription,
                user: user
            });
            window.location.href =  response.data.url;
            return response.data;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
    }
}

export default StripeService;
