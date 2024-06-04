import SupabaseClientUtil from "../components/utilities/SupabaseClientUtil.jsx";
import {getProductsById} from "./productsService.jsx";

const supabase = SupabaseClientUtil.supabaseClient

export const getOrders = async () => {

    console.log("Fetching orders...")
    // Todo: implement put cache on orders table
    const {data} = await supabase
        .from('order')
        .select();

    return data;
}

export const addOrder = async (order) => {
    console.log(order)
    const {data} = await supabase
        .from("order")
        .insert({
            user: order.user, // This will be converted to JSON
            products: order.items, // This will be converted to JSON
            total: order.total,
            payment_status: order.paymentStatus
        })
    return data;
}

export const getRegularOrdersWithProducts = async (customer) => {
    console.log(customer)
    const {data} = await supabase
        .from('order')
        .select()
        .filter('products', 'neq', null);
    const orders = data
    const ordersWithProductDetails = await Promise.all(orders.map(async order => {
        if (!Array.isArray(order.products) || order.products.length <= 0) {
            return null;
        }
        const products = await Promise.all(order.products.map(async product => {
            const productDetails = await getProductsById(product.id);
            return {...productDetails[0], quantity: product.quantity};
        }));
        return {...order, products};
    }));

    return ordersWithProductDetails.filter(order => order !== null);
}