'use client';

import { useState } from 'react';
import { Tab } from '@/utils/enums';
import { Navbar } from '@/components/molecules/Navbar';
import * as styles from './page.css';
import { FundsTable } from '@/components/organisms/FundsTable';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Funds);

  return (
    <main className={styles.main}>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === Tab.Funds ? <FundsTable /> : <p>Portafolio</p>}
    </main>
  );
}
