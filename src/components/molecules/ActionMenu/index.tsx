'use client';

import { useState, useRef, useEffect } from 'react';
import * as styles from './ActionMenu.css';
import { MoreHorizontal } from '@/components/atoms/Icons/MoreHorizontal';

interface ActionOption {
  label: string;
  onClick: () => void;
}

interface ActionMenuProps {
  options: ActionOption[];
}

export const ActionMenu = ({ options }: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={menuRef}>
      <button 
        className={styles.trigger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Actions"
        aria-expanded={isOpen}
      >
        <MoreHorizontal size={20} />
      </button>
      
      <div className={styles.menu} data-open={isOpen}>
        {options.map((option, index) => (
          <button
            key={index}
            className={styles.menuItem}
            onClick={() => {
              option.onClick();
              setIsOpen(false);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
