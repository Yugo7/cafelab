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

    createPaymentMethod: async (card, email, customerId) => {
        try {
            const response = await axios.post(`${BASE_URL}create-payment-method`, {
                card: card,
                email: email,
                customerId: customerId
            });
            return response.data;
        } catch (error) {
            console.error('Error creating payment method:', error);
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

export const createPaymentMethod = async (cardElement, email, customerId) => {

    const { error, paymentMethod } = await stripe.paymentMethods.create({
        type: 'card',
        card: cardElement,
        billing_details: {
            email: email,
            // add more billing details if necessary
        },
    });

    if (error) {
        console.log("Error creating payment method: ", error);
        return null;
    }

    console.log("paymentMethod: ", paymentMethod);
    const {attachError, attachedPaymentMethod} = await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customerId,
    })
    console.log("attachedPaymentMethod: ", attachedPaymentMethod);

    if (attachError) {
        console.log("Error attaching payment method: ", attachError);
        return null;
    }

    return paymentMethod;
}