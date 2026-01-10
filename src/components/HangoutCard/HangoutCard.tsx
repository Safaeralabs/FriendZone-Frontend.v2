import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hangout } from '@/types';
import AvatarStack from '@/components/AvatarStack/AvatarStack';
import styles from './HangoutCard.module.css';

interface HangoutCardProps {
  hangout: Hangout;
}

const HangoutCard: React.FC<HangoutCardProps> = ({ hangout }) => {
  const navigate = useNavigate();

  const getTypeBadge = () => {
    switch (hangout.type) {
      case 'offer':
        return { label: hangout.vibe[0]?.toUpperCase() || 'FOOD', color: 'primary' };
      case 'event-linked':
        return { label: 'LIVE MUSIC', color: 'primary' };
      default:
        return { label: hangout.vibe[0]?.toUpperCase() || 'COFFEE', color: 'primary' };
    }
  };

  const getStatusBadge = () => {
    if (hangout.spotsLeft === 0) return { label: 'FULL', color: 'tertiary' };
    if (hangout.type === 'offer') return { label: 'OPEN', color: 'success' };
    return { label: `${hangout.spotsLeft} SPOTS LEFT`, color: 'warning' };
  };

  const getTimeString = () => {
    const time = new Date(hangout.time);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getLocationString = () => {
    if (hangout.location) {
      const parts = hangout.location.address.split(',');
      return parts[parts.length - 2]?.trim().toUpperCase() || 'NYC';
    }
    return 'TBD';
  };

  const typeBadge = getTypeBadge();
  const statusBadge = getStatusBadge();

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Aquí irían las opciones del menú
    console.log('Menu clicked for', hangout.id);
  };

  return (
    <div className={styles.card} onClick={() => navigate(`/hangouts/${hangout.id}`)}>
      <div className={styles.header}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles[typeBadge.color]}`}>
            {typeBadge.label}
          </span>
          <span className={`${styles.badge} ${styles[statusBadge.color]}`}>
            {statusBadge.label}
          </span>
        </div>
        <button className={styles.menu} onClick={handleMenuClick}>
          <span className={styles.menuDots}>⋮</span>
        </button>
      </div>

      <h3 className={styles.title}>{hangout.title}</h3>
      <p className={styles.description}>{hangout.description}</p>

      <div className={styles.footer}>
        <div className={styles.participants}>
          <AvatarStack participants={hangout.participants} size="sm" maxDisplay={2} />
          {hangout.participants.length > 2 && (
            <span className={styles.moreCount}>+{hangout.participants.length - 2}</span>
          )}
        </div>
        <div className={styles.meta}>
          <span className={styles.time}>{getTimeString()}</span>
          <span className={styles.location}>{getLocationString()}</span>
        </div>
      </div>
    </div>
  );
};

export default HangoutCard;