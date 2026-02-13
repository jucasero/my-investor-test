import React from "react";
import * as styles from "./Table.css";

export const Table = ({ children }: { children: React.ReactNode }) => (
  <table className={styles.table}>{children}</table>
);

export const Thead = ({ children }: { children: React.ReactNode }) => (
  <thead className={styles.thead}>{children}</thead>
);

export const Tbody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

export const Tr = ({ children }: { children: React.ReactNode }) => (
  <tr className={styles.tr}>{children}</tr>
);

interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Th = ({ children, onClick, ...props }: ThProps) => (
  <th className={styles.th} onClick={onClick} {...props}>
    {children}
  </th>
);

export const Td = ({ children }: { children: React.ReactNode }) => (
  <td className={styles.td}>{children}</td>
);
