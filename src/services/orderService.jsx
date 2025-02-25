import axiosInstance from './axiosInstance';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderService = {
    getOrders: async (page, size) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}orders`, {
                params: {
                    page: page,
                    size: size
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    getOrdersByUserId: async (userId) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}users/${userId}/orders`);
            return response.data.filter(order => !order.is_test);
        } catch (error) {
            console.error('Error fetching orders by user ID:', error);
            throw error;
        }
    },

    cancelSubscription: async (subscriptionId) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}subscription/cancel/${subscriptionId}`, {});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getOrdersSummary: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}orders/summary`);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders summary:', error);
            throw error;
        }
    }
}

export default OrderService;