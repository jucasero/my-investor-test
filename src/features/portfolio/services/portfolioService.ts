import { Portfolio } from '../types/portfolio';

const API_URL = 'http://localhost:3000/portfolio';

export const getPortfolio = async (): Promise<{ data: Portfolio[] }> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};
