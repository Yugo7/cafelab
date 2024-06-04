import SupabaseClientUtil from "../components/utilities/SupabaseClientUtil.jsx";

const supabase = SupabaseClientUtil.supabaseClient

export const getProducts = async () => {
    try {
        // Try to get data from cache
        const cachedData = localStorage.getItem('products');
        const cachedTime = localStorage.getItem('productsTime');

        if (cachedData && cachedTime && new Date().getTime() - cachedTime < 360 * 60 * 1000) {
            return JSON.parse(cachedData);
        } else {
            const { data } = await supabase
                .from('products')
                .select()
                .order('secao', { ascending: false });
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
        console.log(section);
        const products = await getProducts();
        console.log(products);
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