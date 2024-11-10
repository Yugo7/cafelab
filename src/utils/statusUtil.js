
export const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING':
            return 'yellow';
        case 'SHIPPED':
            return 'blue';
        case 'PAYMENT_SUCCESSFUL':
            return 'green';
        case 'CANCELLED':
            return 'red';
        default:
            return 'gray';
    }
};

export const getStatusText = (status, t) => {
    switch (status) {
        case 'PENDING':
            return t('myOrders.status.pending');
        case 'SHIPPED':
            return t('myOrders.status.shipped');
        case 'PAYMENT_SUCCESSFUL':
            return t('myOrders.status.paymentSuccessful');
        case 'CANCELLED':
            return t('myOrders.status.cancelled');
        case 'CREATED':
            return t('myOrders.status.created');
        default:
            return t('myOrders.status.unknown');
    }
};