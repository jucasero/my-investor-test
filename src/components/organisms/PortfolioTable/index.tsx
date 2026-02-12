'use client';

import { usePortfolio } from '../../../features/portfolio/hooks/usePortfolio';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../atoms/Table';
import * as styles from './PortfolioTable.css';
import { ActionMenu } from '../../molecules/ActionMenu';
import { PortfolioModals } from './PortfolioModalsWrapper';
import React from 'react';
import { actionsCell } from '../../atoms/Table/Table.css';
import { formatCurrency } from '@/utils/formatters';
import { DefaultCurrency } from '@/utils/constants';

export enum PortfolioAction {Detail = 'detail', Buy = 'buy', Sell = 'sell', Transfer = 'transfer'}

export const PortfolioTable = () => {
  const { data, isLoading, isError } = usePortfolio();
  const [selectedItem, setSelectedItem] = React.useState<{ type: PortfolioAction, item: any } | null>(null);

  const handleAction = (type: PortfolioAction, item: any) => {
      setSelectedItem({ type, item });
  };
  
  const closeModal = () => setSelectedItem(null);

  if (isLoading) return <div>Cargando portafolio...</div>;
  if (isError) return <div>Error al cargar el portafolio</div>;

  return (
    <section  className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Mi Portafolio</h2>
      </header>

      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Cantidad</Th>
            <Th>Valor Total</Th>
            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.quantity}</Td>
              <Td>{formatCurrency(item.totalValue, DefaultCurrency)}</Td>
              <Td>
                  <div className={actionsCell}>
                    <ActionMenu 
                        options={[
                            { label: 'Comprar', onClick: () => handleAction(PortfolioAction.Buy, item) },
                            { label: 'Vender', onClick: () => {} },
                            { label: 'Traspasar', onClick: () => {} },
                            { label: 'Ver Detalle', onClick: () => handleAction(PortfolioAction.Detail, item) },
                        ]}
                    />
                  </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      {selectedItem && (
          <PortfolioModals 
              type={selectedItem.type} 
              selectedItem={selectedItem.item} 
              onClose={closeModal}
              allPortfolioItems={data?.data || []}
          />
      )}
    </section>
  );
};
