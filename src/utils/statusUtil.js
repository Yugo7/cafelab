export const getStatusColor = (status) => {
    switch (status) {
        case 'PENDENTE':
        case 'CRIADO':
            return 'yellow';
        case 'ENVIADO':
            return 'blue';
        case 'PAGAMENTO EFETUADO':
        case 'ATIVO':
            return 'green';
        case 'CANCELADO':
            return 'red';
        default:
            return 'gray';
    }
};

export const getStatusText = (status, t) => {
    switch (status) {
        case 'PENDENTE':
            return t('myOrders.status.pending');
        case 'ENVIADO':
            return t('myOrders.status.shipped');
        case 'PAGAMENTO EFETUADO':
            return t('myOrders.status.paymentSuccessful');
        case 'CANCELADO':
            return t('myOrders.status.cancelled');
        case 'CRIADO':
            return t('myOrders.status.created');
        case 'ATIVO':
            return t('myOrders.status.active');
        default:
            return t('myOrders.status.unknown');
    }
};