import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderService = {
    getOrders: async () => {
        try {
            const response = await axios.get(`${BASE_URL}orders`);
            console.log(response.data)
            return response.data.content.filter(order => !order.is_test);
        } catch (error) {
            console.error('Error fetching all orders:', error);
            throw error;
        }
    },

    getOrdersByUserId: async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}users/${userId}/orders`);
            return response.data.filter(order => !order.is_test);
        } catch (error) {
            console.error('Error fetching orders by user ID:', error);
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

    async getUsress(id) {
        try {
            const response = await axios.get(`https://cafelab-service.onrender.com/users`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    }
}

export default OrderService;