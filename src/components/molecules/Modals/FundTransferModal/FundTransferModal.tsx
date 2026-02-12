import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/molecules/Modals/Modal';
import { Portfolio } from '@/features/portfolio/types/portfolio';
import { useTransferFund } from '@/features/fund/hooks/useTransferFund';
import * as styles from '../Modals.css';

interface FundTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceFund: Portfolio | null;
  allFunds: Portfolio[];
}

interface TransferFormValues {
  toFundId: string;
  quantity: number;
}

export const FundTransferModal = ({ isOpen, onClose, sourceFund, allFunds }: FundTransferModalProps) => {
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm<TransferFormValues>({
      mode: 'onChange'
  });
  
  const { mutate: transferFund, isPending } = useTransferFund();

  useEffect(() => {
      if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = (data: TransferFormValues) => {
      if (!sourceFund) return;
      transferFund(
          { fromFundId: sourceFund.id, toFundId: data.toFundId, quantity: Number(data.quantity) },
          {
              onSuccess: () => onClose()
          }
      );
  };

  if (!sourceFund) return null;

  const targetFunds = useMemo(() => {
    return allFunds.filter(f => f.id !== sourceFund.id);
  }, [allFunds, sourceFund]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Traspasar de ${sourceFund.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.field}>
            <span className={styles.label}>Fondo Origen</span>
            <span className={styles.value}>{sourceFund.name} (Disponibles: {sourceFund.quantity})</span>
        </div>

        <div className={styles.field}>
            <label htmlFor="quantity" className={styles.label}>Cantidad a traspasar</label>
            <input 
                id="quantity"
                type="number"
                className={styles.input}
                {...register('quantity', {
                    required: 'Requerido',
                    min: { value: 1, message: 'Minimo 1' },
                    validate: {
                        integer: (v) => Number.isInteger(Number(v)) || 'Solo enteros',
                        max: (v) => Number(v) <= sourceFund.quantity || 'Excede disponibles'
                    }
                })}
            />
             {errors.quantity && <span className={styles.error}>{errors.quantity.message}</span>}
        </div>

        <div className={styles.field}>
            <label htmlFor="toFundId" className={styles.label}>Fondo Destino</label>
            <select
                id="toFundId"
                className={styles.input}
                {...register('toFundId', { required: 'Selecciona un destino' })}
            >
                <option value="">Seleccionar fondo...</option>
                {targetFunds.map(fund => (
                    <option key={fund.id} value={fund.id}>
                        {fund.name}
                    </option>
                ))}
            </select>
             {errors.toFundId && <span className={styles.error}>{errors.toFundId.message}</span>}
        </div>

        <div className={styles.footer}>
             <button type="button" className={styles.secondaryButton} onClick={onClose} disabled={isPending}>
                Cancelar
            </button>
            <button 
                type="submit" 
                className={styles.primaryButton}
                disabled={!isValid || isPending}
            >
                {isPending ? 'Traspasando...' : 'Traspasar'}
            </button>
        </div>
      </form>
    </Modal>
  );
};
