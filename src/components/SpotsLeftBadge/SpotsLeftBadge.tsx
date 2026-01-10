import React from 'react';
import styles from './SpotsLeftBadge.module.css';

interface SpotsLeftBadgeProps {
  spotsLeft: number;
  capacity: number;
}

const SpotsLeftBadge: React.FC<SpotsLeftBadgeProps> = ({ spotsLeft, capacity }) => {
  const isFull = spotsLeft === 0;
  const isAlmostFull = spotsLeft <= 2 && !isFull;

  return (
    <span
      className={`${styles.badge} ${isFull ? styles.full : ''} ${
        isAlmostFull ? styles.almostFull : ''
      }`}
    >
      {isFull ? 'Full' : `${spotsLeft}/${capacity} spots`}
    </span>
  );
};

export default SpotsLeftBadge;