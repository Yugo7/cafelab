import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProducts = async () => {
    try {
        // Try to get data from cache
        const cachedData = localStorage.getItem('products');
        const cachedTime = localStorage.getItem('productsTime');
        if (cachedData && cachedTime && new Date().getTime() - cachedTime < 360 * 60 * 1000) {
            return JSON.parse(cachedData);
        } else {
            console.log('qwe');
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
        return section ? products.filter(product => product.secao === section) : products;
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