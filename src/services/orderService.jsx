import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderService = {
    getOrders: async () => {
        try {
            const response = await axios.get(`${BASE_URL}orders/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all events:', error);
            throw error;
        }
    },

    getOrdersByUserId: async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}orders/${userId}`);
            console.log('response', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching all events:', error);
            throw error;
        }
    },

    cancelSubscription: async (subscriptionId) => {
        try {
            const response = await axios.post(`${BASE_URL}subscription/cancel/${subscriptionId}`, {});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default OrderService;