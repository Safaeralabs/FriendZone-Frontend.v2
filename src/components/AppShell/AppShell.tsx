import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '@/components/BottomNav/BottomNav';
import styles from './AppShell.module.css';

const AppShell: React.FC = () => {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('/onboarding');

  return (
    <div className={styles.shell}>
      <main className={styles.main}>
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default AppShell;