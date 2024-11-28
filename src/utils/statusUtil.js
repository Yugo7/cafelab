
export const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING':
            return 'yellow';
        case 'SHIPPED':
            return 'blue';
        case 'PAYMENT_SUCCESSFUL':
        case 'ACTIVE':
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
        case 'ACTIVE':
            return t('myOrders.status.active');
        default:
            return t('myOrders.status.unknown');
    }
};