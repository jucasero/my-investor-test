import { useMutation } from '@tanstack/react-query';
import { buyFund } from '@/features/fund/services/fundService';
import { useToast } from '@/components/atoms/Toast';

export const useBuyFund = () => {
    const { showToast } = useToast();

    return useMutation({
        mutationFn: ({ fundId, quantity }: { fundId: string; quantity: number }) =>
            buyFund(fundId, quantity),
        onSuccess: () => {
            showToast('Fondo comprado exitosamente', 'success');
        },
        onError: (error) => {
            showToast('Error al realizar la compra', 'error');
        },
    });
};
