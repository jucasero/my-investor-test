import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transferFund } from "../services/fundService";
import { useToast } from "@/components/atoms/Toast";

export const useTransferFund = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({
      fromFundId,
      toFundId,
      quantity,
    }: {
      fromFundId: string;
      toFundId: string;
      quantity: number;
    }) => transferFund(fromFundId, toFundId, quantity),
    onSuccess: () => {
      showToast("Fondo traspasado exitosamente", "success");
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["funds"] });
    },
    onError: (error) => {
      showToast(error.message || "Error al traspasar el fondo", "error");
    },
  });
};
