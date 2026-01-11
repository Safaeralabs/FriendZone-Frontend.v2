import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/ambitions', label: 'Ambitions', icon: '⚡' },
    { to: '/', label: 'Hangouts', icon: '🏠', isMain: true }, // Cambio aquí
    { to: '/maps', label: 'Maps', icon: '🗺️' },
  ];

  return (
    <nav className={styles.navContainer}>
      <div className={styles.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''} ${item.isMain ? styles.mainItem : ''}`
            }
            end
          >
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{item.icon}</span>
            </div>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;