import { Fund } from '@/features/fund/types/fund';
import { successResponseWithPagination } from '@/features/shared/types/apiResponses';

const API_URL = 'http://localhost:3000/funds';

export const getFunds = async (page: number = 1, limit: number = 10): Promise<successResponseWithPagination<Fund>> => {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};
