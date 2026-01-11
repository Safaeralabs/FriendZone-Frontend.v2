import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hangout } from '@/types';
import styles from './HangoutCard.module.css';

interface HangoutCardProps {
  hangout: Hangout;
}

const HangoutCard: React.FC<HangoutCardProps> = ({ hangout }) => {
  const navigate = useNavigate();

  const getTypeBadge = () => {
    if (hangout.type === 'offer') {
      return { label: 'VENUE OFFER', color: 'success' };
    } else if (hangout.eventId) {
      return { label: 'EVENT HANGOUT', color: 'warning' };
    } else if (hangout.type === 'event-linked') {
      return { label: 'EVENT', color: 'warning' };
    } else {
      return { label: 'HANGOUT', color: 'primary' };
    }
  };

  const getSpotsBadge = () => {
    if (hangout.spotsLeft === 0) {
      return { label: 'FULL', color: 'gray' };
    } else if (hangout.spotsLeft <= 2) {
      return { label: `${hangout.spotsLeft} SPOTS LEFT`, color: 'orange' };
    } else {
      return { label: `${hangout.spotsLeft} SPOTS LEFT`, color: 'green' };
    }
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const hangoutTime = new Date(hangout.time);
    const diff = hangoutTime.getTime() - now.getTime();
    
    if (diff < 0) return null; // Past event

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const getTime = () => {
    const date = new Date(hangout.time);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getLocation = () => {
    if (!hangout.location) return 'TBD';
    const parts = hangout.location.address.split(',');
    return parts.slice(-2).join(',').trim();
  };

  const typeBadge = getTypeBadge();
  const spotsBadge = getSpotsBadge();
  const timeRemaining = getTimeRemaining();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/hangouts/${hangout.id}`)}
    >
      {/* Time Remaining - Large Background */}
      {timeRemaining && (
        <div className={styles.timeRemainingBg}>
          {timeRemaining}
        </div>
      )}

      {/* Header with badges */}
      <div className={styles.header}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles[typeBadge.color]}`}>
            {typeBadge.label}
          </span>
          <span className={`${styles.badge} ${styles[spotsBadge.color]}`}>
            {spotsBadge.label}
          </span>
        </div>
        <button className={styles.menuBtn}>⋮</button>
      </div>

      {/* Title & Description */}
      <h3 className={styles.title}>{hangout.title}</h3>
      <p className={styles.description}>{hangout.description}</p>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.avatarStack}>
          {hangout.participants.slice(0, 3).map((participant, index) => (
            <div key={participant.id} className={styles.avatar} style={{ zIndex: 3 - index }}>
              {participant.name.charAt(0)}
            </div>
          ))}
          {hangout.participants.length > 3 && (
            <div className={styles.avatarMore}>
              +{hangout.participants.length - 3}
            </div>
          )}
        </div>
        <div className={styles.timeLocation}>
          <p className={styles.time}>{getTime()}</p>
          <p className={styles.location}>{getLocation()}</p>
        </div>
      </div>
    </div>
  );
};

export default HangoutCard;