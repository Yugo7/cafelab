import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProducts = async () => {
    try {
        const cachedData = localStorage.getItem('products');
        const cachedTime = localStorage.getItem('productsTime');
        if (cachedData && cachedTime && new Date().getTime() - cachedTime < 360 * 60 * 1000) {
            return JSON.parse(cachedData);
        } else {
            const {data} = await axios.get(`${BASE_URL}products/`);
            localStorage.setItem('products', JSON.stringify(data));
            localStorage.setItem('productsTime', new Date().getTime());

            return data;
        }
    } catch (e) {
        throw e;
    }
}

export const Sections = Object.freeze({
    BOUTIQUE: 'BOUTIQUE',
    CAFE: 'CAFE'
});

export const getProductsBySection = async (section) => {
    try {
        const products = await getProducts();
        return section ? products.filter(product => product.secao === section && product.is_active) : products.filter(product => product.is_active);
    } catch (e) {
        throw e;
    }
}

export const getProductsById = async (id) => {
    try {
        const products = await getProducts();
        return products.filter(product => product.id === id);
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