import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AmbitionIntent, AmbitionTimeWindow, AmbitionVibe } from '@/types';
import { mockAmbitions, mockMatches } from '@/mock/ambitions';
import styles from './Ambitions.module.css';

const Ambitions: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'matches'>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [intent, setIntent] = useState<AmbitionIntent>('coffee');
  const [timeWindow, setTimeWindow] = useState<AmbitionTimeWindow>('now');
  const [vibe, setVibe] = useState<AmbitionVibe>('chill');

  const intents: { value: AmbitionIntent; label: string; emoji: string; gradient: string }[] = [
    { value: 'coffee', label: 'Coffee', emoji: '☕', gradient: 'linear-gradient(135deg, #8B6914, #D4A574)' },
    { value: 'drinks', label: 'Drinks', emoji: '🍷', gradient: 'linear-gradient(135deg, #722F37, #C73866)' },
    { value: 'brunch', label: 'Brunch', emoji: '🥐', gradient: 'linear-gradient(135deg, #D4A373, #F4E4C1)' },
    { value: 'lunch', label: 'Lunch', emoji: '🍜', gradient: 'linear-gradient(135deg, #FF6B6B, #FFE66D)' },
    { value: 'dinner', label: 'Dinner', emoji: '🍝', gradient: 'linear-gradient(135deg, #E94560, #FF6B9D)' },
    { value: 'walk', label: 'Walk', emoji: '🚶', gradient: 'linear-gradient(135deg, #56AB2F, #A8E063)' },
    { value: 'gym', label: 'Gym', emoji: '💪', gradient: 'linear-gradient(135deg, #FF512F, #F09819)' },
    { value: 'clubbing', label: 'Clubbing', emoji: '🎵', gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)' },
    { value: 'movie', label: 'Movie', emoji: '🎬', gradient: 'linear-gradient(135deg, #2C3E50, #4CA1AF)' },
    { value: 'games', label: 'Games', emoji: '🎮', gradient: 'linear-gradient(135deg, #667EEA, #764BA2)' },
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
    
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  const getIntentConfig = (intentValue: AmbitionIntent) => {
    return intents.find(i => i.value === intentValue) || intents[0];
  };

  return (
    <div className={styles.page}>
      {/* Header Original */}
      <div className={styles.heroHeader}>
        <div className={styles.headerTop}>
          <button className={styles.iconBtn} onClick={() => navigate('/')}>
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

      {/* Tabs */}
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

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'active' && (
          <div className={styles.grid}>
            {mockAmbitions.map((ambition, index) => {
              const config = getIntentConfig(ambition.intent);
              return (
                <div
                  key={ambition.id}
                  className={styles.ambitionCard}
                  style={{
                    background: config.gradient,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className={styles.cardGlow}></div>
                  
                  <div className={styles.cardTop}>
                    <div className={styles.intentBadge}>
                      <span className={styles.intentEmoji}>{config.emoji}</span>
                      <span className={styles.intentLabel}>{config.label}</span>
                    </div>
                    <button className={styles.cardMenu}>⋮</button>
                  </div>

                  <div className={styles.cardCenter}>
                    <div className={styles.bigEmoji}>{config.emoji}</div>
                    <div className={styles.cardInfo}>
                      <div className={styles.infoChip}>
                        ⏰ {ambition.timeWindow}
                      </div>
                      <div className={styles.infoChip}>
                        ✨ {ambition.vibe}
                      </div>
                      {ambition.area && (
                        <div className={styles.infoChip}>
                          📍 {ambition.area}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.cardBottom}>
                    <div className={styles.timeRemaining}>
                      <span className={styles.timer}>⏱</span>
                      <span className={styles.timeText}>
                        {getTimeRemaining(ambition.expiresAt)} left
                      </span>
                    </div>
                    <button className={styles.cancelBtn}>Cancel</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'matches' && (
          <div className={styles.list}>
            {mockMatches.map((match) => {
              const config = getIntentConfig(match.ambitions[0].intent);
              return (
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
              );
            })}
          </div>
        )}
      </div>

      {/* FAB */}
      <button className={styles.createBtn} onClick={() => setShowCreateModal(true)}>
        <span className={styles.createIcon}>⚡</span>
        <span className={styles.createText}>New Ambition</span>
      </button>

      {/* Modal original sin cambios */}
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
                  {[
                    { value: 'now', label: 'Now' },
                    { value: 'tonight', label: 'Tonight' },
                    { value: 'weekend', label: 'Weekend' },
                  ].map(item => (
                    <button
                      key={item.value}
                      className={`${styles.timeBtn} ${timeWindow === item.value ? styles.selected : ''}`}
                      onClick={() => setTimeWindow(item.value as AmbitionTimeWindow)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <label className={styles.label}>Vibe?</label>
                <div className={styles.vibeGrid}>
                  {[
                    { value: 'chill', label: 'Chill' },
                    { value: 'social', label: 'Social' },
                    { value: 'active', label: 'Active' },
                    { value: 'party', label: 'Party' },
                  ].map(item => (
                    <button
                      key={item.value}
                      className={`${styles.vibeBtn} ${vibe === item.value ? styles.selected : ''}`}
                      onClick={() => setVibe(item.value as AmbitionVibe)}
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