import React from 'react';
import styles from './TopBar.module.css';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  showRadar?: boolean;
  actions?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ title, subtitle, showRadar, actions }) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.content}>
        {showRadar && (
          <div className={styles.radar}>
            <span className={styles.radarPulse}></span>
            <span className={styles.radarText}>Live Social Radar</span>
          </div>
        )}
        {title && (
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export default TopBar;