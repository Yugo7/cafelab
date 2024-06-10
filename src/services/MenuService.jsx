import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchMenuItems = async () => {
    try {
        // Try to get data from cache
        /*const cachedData = localStorage.getItem('products');
        const cachedTime = localStorage.getItem('productsTime');
        if (cachedData && cachedTime && new Date().getTime() - cachedTime < 360 * 60 * 1000) {
            return JSON.parse(cachedData);
        } else {
            console.log('qwe');*/
            const {data} = await axios.get(`${BASE_URL}menu/`);
          /*  localStorage.setItem('products', JSON.stringify(data));
            localStorage.setItem('productsTime', new Date().getTime());
*/
            return data;

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
        console.log(section);
        const products = await fetchMenuItems()
        return section ? products.filter(product => product.section === section) : products;
    } catch (e) {
        throw e;
    }
}