import { useQuery } from '@tanstack/react-query';
import { getFundById } from '../services/fundService';
import { Fund } from '../types/fund';
import { successResponse } from '../../shared/types/apiResponses';

export const useFund = (id: string | null) => {
    return useQuery<successResponse<Fund>, Error>({
        queryKey: ['fund', id],
        queryFn: () => getFundById(id!),
        enabled: Boolean(id),
        staleTime: 5 * 60 * 1000,
    });
};
