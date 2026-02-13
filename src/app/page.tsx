"use client";

import { useState } from "react";
import { Tab } from "@/utils/enums";
import { Navbar } from "@/components/molecules/Navbar";
import { FundsTable } from "@/components/organisms/FundsTable";
import { PortfolioTable } from "@/components/organisms/PortfolioTable";
import * as styles from "./page.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Funds);

  return (
    <main className={styles.main}>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === Tab.Funds ? <FundsTable /> : <PortfolioTable />}
    </main>
  );
}
