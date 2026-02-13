"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/molecules/Modals/Modal";
import { Fund } from "@/features/fund/types/fund";
import { formatCurrency } from "@/utils/formatters";
import { useBuyFund } from "@/features/fund/hooks/useBuyFund";
import * as styles from "../Modals.css";

interface FundBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  fund: Fund | null;
}

interface BuyFormValues {
  quantity: number;
}

export const FundBuyModal = ({ isOpen, onClose, fund }: FundBuyModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<BuyFormValues>({
    mode: "onChange",
  });

  const { mutate: buyFund, isPending } = useBuyFund();

  const quantity = watch("quantity");
  const total = fund ? (quantity || 0) * fund.value : 0;

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = (data: BuyFormValues) => {
    if (!fund) return;
    buyFund(
      { fundId: fund.id, quantity: Number(data.quantity) },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  if (!fund) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Comprar ${fund.name}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.field}>
          <span className={styles.label}>Valor Actual</span>
          <span className={styles.value}>
            {formatCurrency(fund.value, fund.currency)}
          </span>
        </div>

        <div className={styles.field}>
          <label htmlFor="quantity" className={styles.label}>
            Cantidad a comprar
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
                maxTotal: (value) =>
                  Number(value) * fund.value <= 10000 ||
                  "La compra no puede superar los 10.000,00 €",
              },
            })}
          />
          {errors.quantity && (
            <span className={styles.error}>{errors.quantity.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Precio Total (Estimado)</span>
          <span className={styles.value}>
            {formatCurrency(total, fund.currency)}
          </span>
        </div>

        <div className={styles.footer}>
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
            {isPending ? "Comprando..." : "Comprar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
