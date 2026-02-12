import { config } from '@/config/config';
import { Fund } from '@/features/fund/types/fund';
import { Portfolio } from '@/features/portfolio/types/portfolio';
import { successResponse, successResponseWithPagination } from '@/features/shared/types/apiResponses';

const API_URL = `${config.apiBaseUrl}/funds`;

export const getFunds = async (page: number = 1, limit: number = 10): Promise<successResponseWithPagination<Fund>> => {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export const buyFund = async (fundId: string, quantity: number): Promise<successResponse<Portfolio[]>> => {
    const response = await fetch(`${API_URL}/${fundId}/buy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
        throw new Error('Error al comprar el fondo');
    }

    return response.json();
};

export const getFundById = async (id: string): Promise<successResponse<Fund>> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Error al obtener el fondo');
    return response.json();
};

export const sellFund = async (fundId: string, quantity: number): Promise<successResponse<Portfolio[]>> => {
    const response = await fetch(`${API_URL}/${fundId}/sell`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    });
    if (!response.ok) throw new Error('Error al vender el fondo');
    return response.json();
};

export const transferFund = async (fromFundId: string, toFundId: string, quantity: number): Promise<successResponse<Portfolio[]>> => {
    const response = await fetch(`${API_URL}/transfer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fromFundId, toFundId, quantity }),
    });
    if (!response.ok) throw new Error('Error al traspasar el fondo');
    return response.json();
};
