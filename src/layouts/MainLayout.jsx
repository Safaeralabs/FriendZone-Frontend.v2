import React from 'react';
import TabBar from '@/components/TabBar/TabBar';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
      <TabBar />
    </div>
  );
};

export default MainLayout;