import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AnalyticsService = {
    getWebsiteAccessData: async (startDate, endDate) => {
        try {
            const response = await axios.post(`${BASE_URL}internal/vercel-analytics`, {
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
            const response = await axios.post(`${BASE_URL}internal/vercel-analytics/statistics`, {
                start: startDate,
                end: endDate
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching website access data:', error);
            throw error;
        }
    },
}

export default AnalyticsService;