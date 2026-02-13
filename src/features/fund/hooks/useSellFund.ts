import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sellFund } from "@/features/fund/services/fundService";
import { useToast } from "@/components/atoms/Toast";
import { Portfolio } from "@/features/portfolio/types/portfolio";
import { successResponse } from "@/features/shared/types/apiResponses";

export const useSellFund = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ fundId, quantity }: { fundId: string; quantity: number }) =>
      sellFund(fundId, quantity),
    onMutate: async ({ fundId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["portfolio"] });
      const previousPortfolio = queryClient.getQueryData(["portfolio"]);

      queryClient.setQueryData(
        ["portfolio"],
        (old: successResponse<Portfolio[]>) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data
              .map((item) => {
                if (item.id === fundId) {
                  const unitPrice = item.totalValue / item.quantity;
                  return {
                    ...item,
                    quantity: item.quantity - quantity,
                    totalValue: (item.quantity - quantity) * unitPrice,
                  };
                }
                return item;
              })
              .filter((item: Portfolio) => item.quantity > 0),
          };
        },
      );

      return { previousPortfolio };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["portfolio"], context?.previousPortfolio);
      showToast(err.message || "Error al vender el fondo", "error");
    },
    onSuccess: () => {
      showToast("Fondo vendido exitosamente", "success");
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["funds"] });
    },
  });
};
