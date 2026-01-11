import React, { useState } from 'react';
import TopBar from '@/components/TopBar/TopBar';
import { AmbitionIntent, AmbitionTimeWindow, AmbitionVibe } from '@/types';
import { mockAmbitions, mockMatches } from '@/mock/ambitions';
import styles from './Ambitions.module.css';

const Ambitions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'matches'>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [intent, setIntent] = useState<AmbitionIntent>('coffee');
  const [timeWindow, setTimeWindow] = useState<AmbitionTimeWindow>('now');
  const [vibe, setVibe] = useState<AmbitionVibe>('chill');

  const intents: { value: AmbitionIntent; label: string; emoji: string }[] = [
    { value: 'coffee', label: 'Coffee', emoji: '☕' },
    { value: 'drinks', label: 'Drinks', emoji: '🍷' },
    { value: 'brunch', label: 'Brunch', emoji: '🥐' },
    { value: 'lunch', label: 'Lunch', emoji: '🍜' },
    { value: 'dinner', label: 'Dinner', emoji: '🍝' },
    { value: 'walk', label: 'Walk', emoji: '🚶' },
    { value: 'gym', label: 'Gym', emoji: '💪' },
    { value: 'clubbing', label: 'Clubbing', emoji: '🎵' },
    { value: 'movie', label: 'Movie', emoji: '🎬' },
    { value: 'games', label: 'Games', emoji: '🎮' },
  ];

  const timeWindows: { value: AmbitionTimeWindow; label: string }[] = [
    { value: 'now', label: 'Now' },
    { value: 'tonight', label: 'Tonight' },
    { value: 'weekend', label: 'Weekend' },
  ];

  const vibes: { value: AmbitionVibe; label: string }[] = [
    { value: 'chill', label: 'Chill' },
    { value: 'social', label: 'Social' },
    { value: 'active', label: 'Active' },
    { value: 'party', label: 'Party' },
  ];

  const handleCreateAmbition = () => {
    console.log('Creating ambition:', { intent, timeWindow, vibe });
    setShowCreateModal(false);
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}m left`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h left`;
  };

  const getIntentEmoji = (intentValue: AmbitionIntent) => {
    return intents.find(i => i.value === intentValue)?.emoji || '✨';
  };

  return (
    <div className={styles.page}>
      {/* New Hero Header */}
      <div className={styles.heroHeader}>
        <div className={styles.headerTop}>
          <button className={styles.iconBtn}>
            👤
          </button>
          <div className={styles.liveBadge}>
            <span className={styles.liveDot}></span>
            <span className={styles.liveText}>{mockAmbitions.length} LIVE NOW</span>
          </div>
          <button className={styles.iconBtn}>
            🔔
          </button>
        </div>
        <h1 className={styles.heroTitle}>
          What's the <span className={styles.highlight}>move?</span>
        </h1>
        <p className={styles.heroSubtitle}>PICK A SIGNAL TO BROADCAST</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'active' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active ({mockAmbitions.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'matches' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Matches ({mockMatches.length})
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'active' && (
          <div className={styles.list}>
            {mockAmbitions.map(ambition => (
              <div key={ambition.id} className={styles.ambitionCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.intentBadge}>
                    <span className={styles.intentEmoji}>{getIntentEmoji(ambition.intent)}</span>
                    <span className={styles.intentLabel}>{ambition.intent}</span>
                  </div>
                  <span className={styles.timeRemaining}>{getTimeRemaining(ambition.expiresAt)}</span>
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.tags}>
                    <span className={styles.tag}>{ambition.timeWindow}</span>
                    <span className={styles.tag}>{ambition.vibe}</span>
                    {ambition.area && <span className={styles.tag}>{ambition.area}</span>}
                  </div>
                  {ambition.groupSize && (
                    <p className={styles.groupSize}>
                      {ambition.groupSize.min}-{ambition.groupSize.max} people
                    </p>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.userName}>{ambition.userName}</span>
                  <button className={styles.deleteBtn}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'matches' && (
          <div className={styles.list}>
            {mockMatches.map(match => (
              <div key={match.id} className={styles.matchCard}>
                <div className={styles.matchHeader}>
                  <span className={styles.matchBadge}>New Match!</span>
                  <span className={styles.timeRemaining}>
                    {getTimeRemaining(match.expiresAt)} to respond
                  </span>
                </div>

                <h3 className={styles.matchTitle}>
                  {match.ambitions.length} people want to grab {match.ambitions[0].intent}
                </h3>

                <div className={styles.matchMembers}>
                  {match.ambitions.map(amb => (
                    <div key={amb.id} className={styles.member}>
                      <div className={styles.memberAvatar}>
                        {amb.userName.charAt(0)}
                      </div>
                      <span className={styles.memberName}>{amb.userName}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.matchActions}>
                  <button className={styles.declineBtn}>Decline</button>
                  <button className={styles.acceptBtn}>Accept & Create Hangout</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className={styles.createBtn} onClick={() => setShowCreateModal(true)}>
        <span className={styles.createIcon}>⚡</span>
        <span className={styles.createText}>New Ambition</span>
      </button>

      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Create Ambition</h2>
              <button className={styles.modalClose} onClick={() => setShowCreateModal(false)}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.section}>
                <label className={styles.label}>I want to...</label>
                <div className={styles.intentGrid}>
                  {intents.slice(0, 6).map(item => (
                    <button
                      key={item.value}
                      className={`${styles.intentBtn} ${intent === item.value ? styles.selected : ''}`}
                      onClick={() => setIntent(item.value)}
                    >
                      <span className={styles.emoji}>{item.emoji}</span>
                      <span className={styles.text}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <label className={styles.label}>When?</label>
                <div className={styles.timeGrid}>
                  {timeWindows.map(item => (
                    <button
                      key={item.value}
                      className={`${styles.timeBtn} ${timeWindow === item.value ? styles.selected : ''}`}
                      onClick={() => setTimeWindow(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <label className={styles.label}>Vibe?</label>
                <div className={styles.vibeGrid}>
                  {vibes.map(item => (
                    <button
                      key={item.value}
                      className={`${styles.vibeBtn} ${vibe === item.value ? styles.selected : ''}`}
                      onClick={() => setVibe(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.submitBtn} onClick={handleCreateAmbition}>
                Create Ambition
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ambitions;