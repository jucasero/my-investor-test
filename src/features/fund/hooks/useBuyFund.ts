import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyFund } from "@/features/fund/services/fundService";
import { useToast } from "@/components/atoms/Toast";

export const useBuyFund = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ fundId, quantity }: { fundId: string; quantity: number }) =>
      buyFund(fundId, quantity),
    onSuccess: () => {
      showToast("Fondo comprado exitosamente", "success");
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
    onError: () => {
      showToast("Error al realizar la compra", "error");
    },
  });
};
