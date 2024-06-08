import {getProducts} from "./productsService.jsx";
import {useEffect} from "react";

export const fetchMenuItems = async () => {

    const cachedMenuItems = localStorage.getItem('menuItems');
    if (cachedMenuItems) {
        return JSON.parse(cachedMenuItems);
    }
    console.log('Fetching menu items from server...');
    const menuItems = Array.from({ length: 14 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
        price: (Math.random() * 10).toFixed(2),
        category: "Beverages",
        imageUrl: `http://example.com/item${i + 1}.jpg`,
        section: Math.random() > 0.5 ? Sections.FRIO : Sections.QUENTE // randomly assign true or false
    }));

    localStorage.setItem('menuItems', JSON.stringify(menuItems));

    return menuItems;
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