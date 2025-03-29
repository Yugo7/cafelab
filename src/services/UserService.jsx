import axiosInstance from "@/services/axiosInstance.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getUsers = async () => {
    const response = await axiosInstance.get(`${BASE_URL}user`);
    return response.data;
};

const getUserOrders = async (userId) => {
    const response = await axiosInstance.get(`${BASE_URL}user/orders`);
    return response.data;
};

export default {
    getUsers,
    getUserOrders,
};