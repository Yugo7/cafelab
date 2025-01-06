// src/services/adsService.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCoupons = async () => {
    try {
        const response = await axios.get('${BASE_URL}ads/coupons');
        console.log('Fetched coupons:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
};

export const createCoupon = async (coupon) => {
    try {
        const response = await axios.post(BASE_URL, coupon);
        return response.data;
    } catch (error) {
        console.error('Error creating coupon:', error);
        throw error;
    }
};

export const editCoupon = async (couponId, updatedCoupon) => {
    try {
        const response = await axios.put(`${BASE_URL}/${couponId}`, updatedCoupon);
        return response.data;
    } catch (error) {
        console.error('Error editing coupon:', error);
        throw error;
    }
};