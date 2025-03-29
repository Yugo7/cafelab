import axiosInstance from "@/services/axiosInstance.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GiftCardService = {
    redeemGiftCard: async (code) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}giftcard/redeem/${code}`);
            return response.data;
        } catch (error) {
            console.error('Error redeeming gift card:', error);
            throw error;
        }
    }
}

export default GiftCardService;