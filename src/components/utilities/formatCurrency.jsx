const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "EUR",
    style: "currency",
})

export function formatCurrency(number) {
    if (typeof number === 'string') {
        console.error('number input:', number);
        number = Number(number);
    }
    if (isNaN(number)) {
        console.error('Invalid number input:', number);
        return '€0.00'; // Return a default value
    }
    number = number / 100;
    return CURRENCY_FORMATTER.format(number);
}