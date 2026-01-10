import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={`${styles.skeleton} ${styles.label}`}></div>
        <div className={`${styles.skeleton} ${styles.time}`}></div>
      </div>
      <div className={`${styles.skeleton} ${styles.title}`}></div>
      <div className={`${styles.skeleton} ${styles.description}`}></div>
      <div className={styles.vibes}>
        <div className={`${styles.skeleton} ${styles.vibe}`}></div>
        <div className={`${styles.skeleton} ${styles.vibe}`}></div>
        <div className={`${styles.skeleton} ${styles.vibe}`}></div>
      </div>
      <div className={`${styles.skeleton} ${styles.cta}`}></div>
    </div>
  );
};

export default SkeletonCard;