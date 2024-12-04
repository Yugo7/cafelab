import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}user`);
    return response.data;
};

const getUserOrders = async (userId) => {
    const response = await axios.get(`${BASE_URL}user/${userId}/orders`);
    return response.data;
};

export default {
    getUsers,
    getUserOrders,
};