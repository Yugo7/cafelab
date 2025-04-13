import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token && token !== "null") {
            token
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.params = {
            ...config.params,
            isActive: false
        };

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;