import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/context/ToastContext';
import VibePill from '@/components/VibePill/VibePill';
import AvatarStack from '@/components/AvatarStack/AvatarStack';
import PerkBadge from '@/components/PerkBadge/PerkBadge';
import styles from './HangoutDetail.module.css';

const HangoutDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hangouts, joinHangout, user } = useApp();
  const { showToast } = useToast();
  const [isJoining, setIsJoining] = useState(false);

  const hangout = hangouts.find(h => h.id === id);

  if (!hangout) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>Hangout not found</div>
      </div>
    );
  }

  const isHost = hangout.hostId === user.id;
  const hasJoined = hangout.participants.some(p => p.id === user.id);
  const isFull = hangout.spotsLeft === 0;

  const handleJoin = async () => {
    if (isFull || hasJoined || isHost) return;

    setIsJoining(true);
    
    // Simulate API call
    setTimeout(() => {
      joinHangout(hangout.id);
      setIsJoining(false);
      showToast('Request sent! The host will review shortly.', 'success');
    }, 500);
  };

  const getCtaText = () => {
    if (isHost) return 'You\'re the host';
    if (hasJoined) return 'Request pending';
    if (isFull) return 'This hangout is full';
    
    switch (hangout.type) {
      case 'offer':
        return 'Claim your spot';
      case 'event-linked':
        return 'Join this group';
      default:
        return 'Request to join';
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.typeLabel}>
          {hangout.type === 'offer' && 'Venue Offer'}
          {hangout.type === 'event-linked' && 'Event Group'}
          {hangout.type === 'community' && 'Community'}
        </div>

        <h1 className={styles.title}>{hangout.title}</h1>
        <p className={styles.description}>{hangout.description}</p>

        <div className={styles.vibes}>
          {hangout.vibe.map((v, i) => (
            <VibePill key={i} text={v} />
          ))}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>The Plan</h3>
          <ul className={styles.planList}>
            {hangout.plan.map((item, i) => (
              <li key={i} className={styles.planItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Group Preview</h3>
          <div className={styles.tags}>
            {hangout.groupTags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.languages}>
            <span className={styles.languageLabel}>Languages:</span>
            {hangout.languages.map((lang, i) => (
              <span key={i} className={styles.language}>
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Who's Coming</h3>
          <div className={styles.participants}>
            <AvatarStack participants={hangout.participants} size="lg" maxDisplay={5} />
            <span className={styles.participantCount}>
              {hangout.participants.length} {hangout.participants.length === 1 ? 'person' : 'people'}
            </span>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Location</h3>
          {hangout.locationLocked ? (
            <div className={styles.locationLocked}>
              <span className={styles.lockIcon}>🔒</span>
              <div>
                <p className={styles.lockedText}>Location locked</p>
                <p className={styles.lockedSubtext}>
                  You'll get the address once the host approves your request
                </p>
              </div>
            </div>
          ) : hangout.location ? (
            <div className={styles.location}>
              <p className={styles.locationName}>{hangout.location.name}</p>
              <p className={styles.locationAddress}>{hangout.location.address}</p>
            </div>
          ) : (
            <p className={styles.locationTbd}>Location TBD</p>
          )}
        </div>

        {hangout.type === 'offer' && (
          <div className={styles.perkSection}>
            <PerkBadge />
            <p className={styles.perkText}>
              This venue is offering a special perk for this hangout
            </p>
          </div>
        )}
      </div>

      <div className={styles.ctaBar}>
        <button
          className={styles.ctaButton}
          onClick={handleJoin}
          disabled={isFull || hasJoined || isHost || isJoining}
        >
          {isJoining ? 'Sending...' : getCtaText()}
        </button>
      </div>
    </div>
  );
};

export default HangoutDetail;