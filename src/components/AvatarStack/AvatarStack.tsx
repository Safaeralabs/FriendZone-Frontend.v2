import React from 'react';
import { Participant } from '@/types';
import styles from './AvatarStack.module.css';

interface AvatarStackProps {
  participants: Participant[];
  size?: 'sm' | 'md' | 'lg';
  maxDisplay?: number;
}

const AvatarStack: React.FC<AvatarStackProps> = ({
  participants,
  size = 'md',
  maxDisplay = 3,
}) => {
  const displayedParticipants = participants.slice(0, maxDisplay);
  const remaining = participants.length - maxDisplay;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={styles.stack}>
      {displayedParticipants.map((participant, index) => (
        <div
          key={participant.id}
          className={`${styles.avatar} ${styles[size]}`}
          style={{ zIndex: maxDisplay - index }}
          title={participant.name}
        >
          {getInitials(participant.name)}
        </div>
      ))}
      {remaining > 0 && (
        <div className={`${styles.avatar} ${styles[size]} ${styles.more}`}>
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default AvatarStack;