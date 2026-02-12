import { DefaultLocale } from "./constants";

export const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat( DefaultLocale, {
        style: 'currency',
        currency: currency,
    }).format(value);
};

export const formatPercentage = (value: number) => {
    return new Intl.NumberFormat( DefaultLocale, {
        style: 'percent',
        maximumFractionDigits: 2,
    }).format(value);
};