import { Fund } from '@/features/fund/types/fund';
import { successResponse, successResponseWithPagination } from '@/features/shared/types/apiResponses';

const API_URL = 'http://localhost:3000/funds';

export const getFunds = async (page: number = 1, limit: number = 10): Promise<successResponseWithPagination<Fund>> => {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export const buyFund = async (fundId: string, quantity: number): Promise<successResponse<unknown[]>> => {
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
