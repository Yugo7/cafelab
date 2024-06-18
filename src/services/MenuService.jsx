import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchMenuItems = async () => {
    try {
        const cachedData = localStorage.getItem('menu');
        const cachedTime = localStorage.getItem('menuTime');
        if (cachedData && cachedTime && new Date().getTime() - cachedTime < 360 * 60 * 1000) {
            return JSON.parse(cachedData);
        } else {
            const {data} = await axios.get(`${BASE_URL}menu/`);
            localStorage.setItem('menu', JSON.stringify(data));
            localStorage.setItem('menuTime', new Date().getTime());
            return data;
        }
    } catch (e) {
        throw e;
    }
}

export const Sections = Object.freeze({
    QUENTE: 'QUENTE',
    FRIO: 'FRIO'
});

export const getMenuItems = async (section) => {
    try {
        const products = await fetchMenuItems()
        return section ? products.filter(product => product.section === section) : products;
    } catch (e) {
        throw e;
    }
}