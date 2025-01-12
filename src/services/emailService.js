import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const new_url = "http://localhost:8080/email/";

export const subscribeEmail = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}email/signup`, { email });
        return response.data;
    } catch (error) {
        console.error('Error subscribing:', error);
        throw error;
    }
};

export const unsubscribeEmail = async (email, reason, comment) => {
    try {
        const response = await axios.post(`${BASE_URL}email/signout`, { email, reason, comment});
        return response.data;
    } catch (error) {
        console.error('Error unsubscribing:', error);
        throw error;
    }
};

export const sendEmail = async (emailData) => {
    try {
        const response = await axios.post(`${new_url}content`, emailData);
        console.log('Email data:', emailData);
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};