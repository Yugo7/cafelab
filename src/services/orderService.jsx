import SupabaseClientUtil from "../components/utilities/SupabaseClientUtil.jsx";
import {getProductsById} from "./productsService.jsx";

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


export const getRegularOrdersWithProducts = async (customer) => {
    console.log(customer)
    const {data} = await supabase
        .from('order')
        .select()
        .filter('products', 'neq', null);
    const orders = data
    const ordersWithProductDetails = await Promise.all(orders.map(async order => {
        if (!Array.isArray(order.products) || order.products.length <= 0) {
            return null;
        }
        const products = await Promise.all(order.products.map(async product => {
            const productDetails = await getProductsById(product.id);
            return {...productDetails[0], quantity: product.quantity};
        }));
        return {...order, products};
    }));

    return ordersWithProductDetails.filter(order => order !== null);
}

export default OrderService;