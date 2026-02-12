'use client';

import { useState, useMemo } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/atoms/Table';
import { ChevronUp, ChevronDown, ChevronsUpDown } from '@/components/atoms/Icons/SortIcons';
import * as styles from './FundsTable.css';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { Fund } from '@/features/fund/types/fund';

type SortField = keyof Fund | 'ytd' | '1a' | '3a' | '5a';
enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

const data = { 
  "data":  [
    {
      "id": "1",
      "name": "Global Equity Fund",
      "symbol": "GEF",
      "value": 120.45,
      "currency": "USD",
      "category": "GLOBAL",
      "profitability": {
        "YTD": 0.05,
        "oneYear": 0.12,
        "threeYears": 0.35,
        "fiveYears": 0.5
      }
    },
    {
      "id": "2",
      "name": "Tech Growth Fund",
      "symbol": "TGF",
      "value": 210.32,
      "currency": "EUR",
      "category": "TECH",
      "profitability": {
        "YTD": 0.08,
        "oneYear": 0.18,
        "threeYears": 0.42,
        "fiveYears": 0.65
      }
    },
    {
      "id": "3",
      "name": "Healthcare Opportunities",
      "symbol": "HCO",
      "value": 145.9,
      "currency": "USD",
      "category": "HEALTH",
      "profitability": {
        "YTD": 0.03,
        "oneYear": 0.09,
        "threeYears": 0.28,
        "fiveYears": 0.41
      }
    },
    {
      "id": "4",
      "name": "Energy Sector Fund",
      "symbol": "ESF",
      "value": 98.67,
      "currency": "EUR",
      "category": "GLOBAL",
      "profitability": {
        "YTD": -0.02,
        "oneYear": 0.15,
        "threeYears": 0.22,
        "fiveYears": 0.33
      }
    },
    {
      "id": "5",
      "name": "Emerging Markets Equity",
      "symbol": "EME",
      "value": 130.21,
      "currency": "USD",
      "category": "GLOBAL",
      "profitability": {
        "YTD": 0.06,
        "oneYear": 0.14,
        "threeYears": 0.31,
        "fiveYears": 0.47
      }
    },
    {
      "id": "6",
      "name": "US Small Cap Fund",
      "symbol": "USC",
      "value": 110.12,
      "currency": "EUR",
      "category": "MONEY_MARKET",
      "profitability": {
        "YTD": 0.04,
        "oneYear": 0.11,
        "threeYears": 0.29,
        "fiveYears": 0.38
      }
    },
    {
      "id": "7",
      "name": "Real Estate Income",
      "symbol": "REI",
      "value": 88.45,
      "currency": "USD",
      "category": "GLOBAL",
      "profitability": {
        "YTD": 0.07,
        "oneYear": 0.16,
        "threeYears": 0.35,
        "fiveYears": 0.52
      }
    },
    {
      "id": "8",
      "name": "International Value",
      "symbol": "IVF",
      "value": 132.77,
      "currency": "EUR",
      "category": "GLOBAL",
      "profitability": {
        "YTD": 0.02,
        "oneYear": 0.13,
        "threeYears": 0.26,
        "fiveYears": 0.44
      }
    },
    {
      "id": "9",
      "name": "Dividend Leaders Fund",
      "symbol": "DLF",
      "value": 102.54,
      "currency": "USD",
      "category": "MONEY_MARKET",
      "profitability": {
        "YTD": 0.09,
        "oneYear": 0.17,
        "threeYears": 0.32,
        "fiveYears": 0.48
      }
    },
    {
      "id": "10",
      "name": "Bond Index Fund",
      "symbol": "BIF",
      "value": 50.12,
      "currency": "EUR",
      "category": "MONEY_MARKET",
      "profitability": {
        "YTD": 0.01,
        "oneYear": 0.04,
        "threeYears": 0.08,
        "fiveYears": 0.12
      }
    }
  ]
}

export const FundsTable = () => {
  
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder >(SortOrder.Asc);
  
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
      let aValue: any = a;
      let bValue: any = b;

      if (['ytd', '1a', '3a', '5a'].includes(sortField)) {
         const map: Record<string, keyof typeof a.profitability> = {
             'ytd': 'YTD',
             '1a': 'oneYear',
             '3a': 'threeYears',
             '5a': 'fiveYears'
         };
         aValue = a.profitability[map[sortField as string]];
         bValue = b.profitability[map[sortField as string]];
      } else {
          aValue = a[sortField as keyof Fund];
          bValue = b[sortField as keyof Fund];
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
    </section>
  );
};
