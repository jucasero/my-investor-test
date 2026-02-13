import { Tab } from "@/utils/enums";
import * as styles from "./Navbar.css";

interface NavbarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  return (
    <nav className={styles.nav}>
      <button
        className={styles.navItem}
        data-active={activeTab === Tab.Funds}
        onClick={() => onTabChange(Tab.Funds)}
      >
        Fondos
      </button>
      <button
        className={styles.navItem}
        data-active={activeTab === Tab.Portfolio}
        onClick={() => onTabChange(Tab.Portfolio)}
      >
        Portafolio
      </button>
    </nav>
  );
};
