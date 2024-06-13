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
            console.log('userId:', userId);
            const response = await axios.get(`${BASE_URL}orders/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all events:', error);
            throw error;
        }
    },


    addOrder: async (orderData) => {
        try {
            const response = await axios.post(`${BASE_URL}orders`, {
                user_id: orderData.user_id,
                products: orderData.items,
                total: orderData.total,
                payment_status: orderData.paymentStatus,
                user_stripe_id: orderData.user_stripe_id
            });
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    },
}

export default OrderService;