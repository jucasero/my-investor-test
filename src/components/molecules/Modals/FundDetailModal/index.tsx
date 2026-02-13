import { Modal } from "@/components/molecules/Modals/Modal";
import { Fund } from "@/features/fund/types/fund";
import * as styles from "../Modals.css";
import { formatCurrency, formatPercentage } from "@/utils/formatters";

interface FundDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  fund: Fund | null;
}

export const FundDetailModal = ({
  isOpen,
  onClose,
  fund,
}: FundDetailModalProps) => {
  if (!fund) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={fund.name}>
      <section className={styles.container}>
        <div className={styles.field}>
          <span className={styles.label}>Categoría</span>
          <span className={styles.value}>{fund.category}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Moneda</span>
          <span className={styles.value}>{fund.currency}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Valor Actual</span>
          <span className={styles.value}>
            {formatCurrency(fund.value, fund.currency)}
          </span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Rentabilidad</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            <div>
              YTD:{" "}
              <span className={styles.value}>
                {formatPercentage(fund.profitability.YTD)}
              </span>
            </div>
            <div>
              1 Año:{" "}
              <span className={styles.value}>
                {formatPercentage(fund.profitability.oneYear)}
              </span>
            </div>
            <div>
              3 Años:{" "}
              <span className={styles.value}>
                {formatPercentage(fund.profitability.threeYears)}
              </span>
            </div>
            <div>
              5 Años:{" "}
              <span className={styles.value}>
                {formatPercentage(fund.profitability.fiveYears)}
              </span>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <button className={styles.primaryButton} onClick={onClose}>
          Cerrar
        </button>
      </footer>
    </Modal>
  );
};
