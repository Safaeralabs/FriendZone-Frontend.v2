import React from 'react';
import styles from './PerkBadge.module.css';

const PerkBadge: React.FC = () => {
  return (
    <span className={styles.badge}>
      <span className={styles.icon}>🎁</span>
      <span className={styles.text}>Perk</span>
    </span>
  );
};

export default PerkBadge;