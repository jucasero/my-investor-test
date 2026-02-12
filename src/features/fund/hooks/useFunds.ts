import { useQuery } from '@tanstack/react-query';
import { getFunds } from '@/features/fund/services/fundService';
import { Fund } from '@/features/fund/types/fund';
import { successResponseWithPagination } from '@/features/shared/types/apiResponses';

export const useFunds = (page: number, limit: number) => {
    return useQuery<successResponseWithPagination<Fund>, Error>({
        queryKey: ['funds', page, limit],
        queryFn: () => getFunds(page, limit),
        placeholderData: (previousData) => previousData,
        staleTime: 60 * 1000 * 10,
    });
};
