import * as styles from "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  totalItems: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  totalItems,
}: PaginationProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.info}>
        Mostrando {(currentPage - 1) * limit + 1} -{" "}
        {Math.min(currentPage * limit, totalItems)} de {totalItems} fondos
      </p>

      <div className={styles.controls}>
        <>
          <label htmlFor="limit-select" className={styles.info}>
            Filas por página:
          </label>
          <select
            id="limit-select"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className={styles.select}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </>

        <button
          className={styles.button}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </button>
        <span className={styles.info}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className={styles.button}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
