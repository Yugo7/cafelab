import axiosInstance from "@/services/axiosInstance.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BalanceService = {
    deleteBalance: async (id) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}balances/${id}`, {});
            return response.data;
        } catch (error) {
            console.error('Error fetching website access data:', error);
            throw error;
        }
    },

    updateBalance: async (balance) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}balances/${balance.id}`, balance);
            return response.data;
        } catch (error) {
            console.error('Error updating balance detail:', error);
            throw error;
        }
    },

    createBalance: async (balance) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}balances`, balance);
            return response.data;
        } catch (error) {
            console.error('Error creating balance detail:', error);
            throw error;
        }
    }
}

export default BalanceService;