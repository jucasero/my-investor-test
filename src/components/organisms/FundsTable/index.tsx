'use client';

import { useState, useMemo } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/atoms/Table';
import { ChevronUp, ChevronDown, ChevronsUpDown } from '@/components/atoms/Icons/SortIcons';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { Fund } from '@/features/fund/types/fund';
import { useFunds } from '@/features/fund/hooks/useFunds';
import { Pagination } from '@/components/molecules/Pagination';
import * as styles from './FundsTable.css';

type SortField = keyof Fund | 'ytd' | '1a' | '3a' | '5a';
enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export const FundsTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder >(SortOrder.Asc);
  const { data, isLoading, isError } = useFunds(page, limit);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc);
    } else {
      setSortField(field);
      setSortOrder(SortOrder.Asc);
    }
  };

  const sortedData = useMemo(() => {
    if (!data?.data) return [];
    if (!sortField) return data.data;

    return [...data.data].sort((a, b) => {
      let aValue = a;
      let bValue = b;

      if (['ytd', '1a', '3a', '5a'].includes(sortField)) {
         const map: Record<string, keyof typeof a.profitability> = {
             'ytd': 'YTD',
             '1a': 'oneYear',
             '3a': 'threeYears',
             '5a': 'fiveYears'
         };
         aValue = a.profitability[map[sortField]] as unknown as Fund;
         bValue = b.profitability[map[sortField]] as unknown as Fund;
      } else {
          aValue = a[sortField as keyof Fund] as unknown as Fund;
          bValue = b[sortField as keyof Fund] as unknown as Fund;
      }

      if (aValue < bValue) return sortOrder === SortOrder.Asc ? -1 : 1;
      if (aValue > bValue) return sortOrder === SortOrder.Asc ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortOrder]);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ChevronsUpDown size={14} color="#ccc" />;
    return sortOrder === SortOrder.Asc ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  if (isLoading) return <div>Cargando fondos...</div>;

  if (isError) return <div>Error al cargar los fondos</div>;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Fondos de Inversión</h2>
      </header>

      <Table>
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('name')}>
                <div className={styles.sortHeaderContent}>Nombre {renderSortIcon('name')}</div>
            </Th>
            <Th onClick={() => handleSort('category')}>
                <div className={styles.sortHeaderContent}>Categoría {renderSortIcon('category')}</div>
            </Th>
            <Th onClick={() => handleSort('currency')}>
                <div className={styles.sortHeaderContent}>Moneda {renderSortIcon('currency')}</div>
            </Th>
            <Th onClick={() => handleSort('value')}>
                <div className={styles.sortHeaderContent}>Valor {renderSortIcon('value')}</div>
            </Th>
            <Th onClick={() => handleSort('ytd')}>
                <div className={styles.sortHeaderContent}>YTD {renderSortIcon('ytd')}</div>
            </Th>
            <Th onClick={() => handleSort('1a')}>
                <div className={styles.sortHeaderContent}>1 A {renderSortIcon('1a')}</div>
            </Th>
             <Th onClick={() => handleSort('3a')}>
                <div className={styles.sortHeaderContent}>3 A {renderSortIcon('3a')}</div>
            </Th>
             <Th onClick={() => handleSort('5a')}>
                <div className={styles.sortHeaderContent}>5 A {renderSortIcon('5a')}</div>
            </Th>
            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((fund) => (
            <Tr key={fund.id}>
              <Td>{fund.name}</Td>
              <Td>{fund.category}</Td>
              <Td>{fund.currency}</Td>
              <Td>{formatCurrency(fund.value, fund.currency)}</Td>
              <Td>{formatPercentage(fund.profitability.YTD)}</Td>
              <Td>{formatPercentage(fund.profitability.oneYear)}</Td>
              <Td>{formatPercentage(fund.profitability.threeYears)}</Td>
              <Td>{formatPercentage(fund.profitability.fiveYears)}</Td>
              <Td>
                  <p>acciones</p>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      <Pagination
        currentPage={page}
        totalPages={data?.pagination.totalPages || 1}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
        totalItems={data?.pagination.totalFunds || 0}
      />
    </section>
  );
};
