import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/molecules/Modals/Modal";
import { Portfolio } from "@/features/portfolio/types/portfolio";
import * as styles from "../Modals.css";
import { useSellFund } from "@/features/fund/hooks/useSellFund";
import { formatCurrency } from "@/utils/formatters";

interface FundSellModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioItem: Portfolio | null;
}

interface SellFormValues {
  quantity: number;
}

export const FundSellModal = ({
  isOpen,
  onClose,
  portfolioItem,
}: FundSellModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<SellFormValues>({
    mode: "onChange",
  });

  const { mutate: sellFund, isPending } = useSellFund();
  const quantity = watch("quantity");
  const unitPrice = portfolioItem
    ? portfolioItem.totalValue / portfolioItem.quantity
    : 0;
  const estimatedTotal = (quantity || 0) * unitPrice;

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = (data: SellFormValues) => {
    if (!portfolioItem) return;
    sellFund(
      { fundId: portfolioItem.id, quantity: Number(data.quantity) },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  if (!portfolioItem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Vender ${portfolioItem.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.field}>
          <span className={styles.label}>Cantidad disponible</span>
          <span className={styles.value}>{portfolioItem.quantity}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Valor por unidad (Estimado)</span>
          <span className={styles.value}>
            {formatCurrency(unitPrice, "EUR")}
          </span>
        </div>

        <div className={styles.field}>
          <label htmlFor="quantity" className={styles.label}>
            Cantidad a vender
          </label>
          <input
            id="quantity"
            type="number"
            className={styles.input}
            {...register("quantity", {
              required: "La cantidad es requerida",
              min: { value: 1, message: "La cantidad debe ser mayor a 0" },
              validate: {
                integer: (value) =>
                  Number.isInteger(Number(value)) || "Solo números enteros",
                maxOwn: (value) =>
                  Number(value) <= portfolioItem.quantity ||
                  `No puedes vender más de ${portfolioItem.quantity}`,
              },
            })}
          />
          {errors.quantity && (
            <span className={styles.error}>{errors.quantity.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Valor Total Venta (Estimado)</span>
          <span className={styles.value}>
            {formatCurrency(estimatedTotal, "EUR")}
          </span>
        </div>

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onClose}
            disabled={isPending}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={!isValid || isPending}
          >
            {isPending ? "Vendiendo..." : "Vender"}
          </button>
        </footer>
      </form>
    </Modal>
  );
};
