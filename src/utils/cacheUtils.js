export const clearCache = () => {
    localStorage.removeItem('products');
    localStorage.removeItem('productsTime');
    localStorage.removeItem('coffee');
    localStorage.removeItem('subscription');

    console.log('Cache cleared');
};