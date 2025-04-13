export const clearCache = () => {
    localStorage.removeItem('products');
    localStorage.removeItem('productsTime');
    localStorage.removeItem('coffee');
    localStorage.removeItem('subscription');
    localStorage.removeItem('token');

    console.log('Cache cleared');
};