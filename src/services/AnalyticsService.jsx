import axiosInstance from "@/services/axiosInstance.jsx";
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LEGACY_URL = import.meta.env.VITE_API_LEGACY_URL;

const AnalyticsService = {
    getWebsiteAccessData: async (startDate, endDate) => {
        try {
            const response = await axios.post(`${LEGACY_URL}internal/vercel-analytics`, {
                start: startDate,
                end: endDate
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching website access data:', error);
            throw error;
        }
    },

    getWebsiteAccessStatistics: async (startDate, endDate) => {
        try {
            const response = await axios.post(`${LEGACY_URL}internal/vercel-analytics/statistics`, {
                start: startDate,
                end: endDate
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching website access data:', error);
            throw error;
        }
    },


    getBalance: async (startDate, endDate) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}balances/timeseries`, {
                params: {
                    start: startDate,
                    end: endDate
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching website access data:', error);
            throw error;
        }
    },
}

export default AnalyticsService;