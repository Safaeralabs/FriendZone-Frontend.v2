import React from 'react';
import styles from './VibePill.module.css';

interface VibePillProps {
  text: string;
}

const VibePill: React.FC<VibePillProps> = ({ text }) => {
  return <span className={styles.pill}>{text}</span>;
};

export default VibePill;