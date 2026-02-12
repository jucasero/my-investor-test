export const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency,
    }).format(value);
};

export const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'percent',
        maximumFractionDigits: 2,
    }).format(value);
};