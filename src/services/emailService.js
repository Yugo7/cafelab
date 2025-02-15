import axiosInstance from "@/services/axiosInstance.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const NEW_BE = import.meta.env.VITE_API_RENDER_URL;

export const subscribeEmail = async (email) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}email/mailmarketing/signup`, { email });
        return response.data;
    } catch (error) {
        console.error('Error subscribing:', error);
        throw error;
    }
};

export const unsubscribeEmail = async (email, reason, comment) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}email/mailmarketing/signout`, { email, reason, comment});
        return response.data;
    } catch (error) {
        console.error('Error unsubscribing:', error);
        throw error;
    }
};

export const sendEmail = async (emailData) => {
    try {
        const response = await axiosInstance.post(`${NEW_BE}content`, emailData);
        console.log('Email data:', emailData);
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};