import axios from "axios";
import axiosInstance from "@/services/axiosInstance.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProducts = async (useCache = true) => {
    try {
        if (useCache) {
            const cachedData = localStorage.getItem('products');
            const cachedTime = localStorage.getItem('productsTime');
            if (cachedData && cachedTime && new Date().getTime() - cachedTime < 10 * 60 * 1000) {
                return JSON.parse(cachedData);
            }
        }
        const { data } = await axiosInstance.get(`${BASE_URL}products`);
        localStorage.setItem('products', JSON.stringify(data));
        localStorage.setItem('productsTime', new Date().getTime());
        return data;
    } catch (e) {
        throw e;
    }
};

export const Sections = Object.freeze({
    BOUTIQUE: 'BOUTIQUE',
    CAFE: 'CAFE',
    VOUCHER: 'VOUCHER',
});

export const getProductsBySection = async (section) => {
    try {
        const products = await getProducts();
        return section ? products.filter(product => product.secao === section) : products;
    } catch (e) {
        throw e;
    }
}

export const getProductsById = async (id) => {
    try {
        const products = await getProducts();
        const product = products.find(product => product.id === parseInt(id, 10));
        return product || null;
    } catch (e) {
        throw e;
    }
}

const createProduct = async (productData) => {
    try {
        const formData = new FormData();
        Object.keys(productData).forEach(key => {
            formData.append(key, productData[key]);
        });

        console.log(formData)
        const response = await axios.post(`${BASE_URL}products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

const updateProduct = async (productData) => {
    try {
        const formData = new FormData();
        console.log(productData)
        Object.keys(productData).forEach(key => {
            formData.append(key, productData[key]);
        });

        const response = await axios.put(`${BASE_URL}products/${productData.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${BASE_URL}products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        throw error;
    }
};

const getSecaoValues = async () => {
    try {
        const response = await axios.get(`${BASE_URL}products/sections`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        throw error;
    }
};

export const productService = {
    getProducts,
    getSecaoValues,
    getProductsBySection,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
};