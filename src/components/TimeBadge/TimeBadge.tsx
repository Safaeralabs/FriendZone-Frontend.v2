import React, { useState, useEffect } from 'react';
import styles from './TimeBadge.module.css';

interface TimeBadgeProps {
  time: string; // ISO datetime
}

const TimeBadge: React.FC<TimeBadgeProps> = ({ time }) => {
  const [timeText, setTimeText] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const target = new Date(time);
      const diff = target.getTime() - now.getTime();

      if (diff < 0) {
        setTimeText('Started');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const days = Math.floor(hours / 24);

      if (days > 0) {
        setTimeText(`In ${days}d`);
      } else if (hours > 0) {
        setTimeText(`In ${hours}h ${minutes}m`);
      } else {
        setTimeText(`In ${minutes}m`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [time]);

  return <span className={styles.badge}>{timeText}</span>;
};

export default TimeBadge;