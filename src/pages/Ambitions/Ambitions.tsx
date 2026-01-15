import React, { useState } from 'react';
import styles from './Ambitions.module.css';

interface Ambition {
  id: string;
  emoji: string;
  title: string;
  timeWindow: string;
  vibe: string;
  area?: string;
  expiresAt: string;
}

interface Match {
  id: string;
  users: Array<{ id: string; name: string; avatar: string }>;
  intent: string;
  emoji: string;
  expiresAt: string;
}

const Ambitions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'matches'>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<string>('coffee');
  const [selectedTime, setSelectedTime] = useState<string>('now');
  const [selectedVibe, setSelectedVibe] = useState<string>('chill');

  // Mock data
  const activeAmbitions: Ambition[] = [
    {
      id: '1',
      emoji: '☕',
      title: 'Coffee & Chat',
      timeWindow: 'Now',
      vibe: 'Chill',
      area: 'Mission',
      expiresAt: new Date(Date.now() + 45 * 60000).toISOString(),
    },
    {
      id: '2',
      emoji: '🍜',
      title: 'Grab Lunch',
      timeWindow: 'In 2h',
      vibe: 'Social',
      area: 'Downtown',
      expiresAt: new Date(Date.now() + 120 * 60000).toISOString(),
    },
  ];

  const matches: Match[] = [
    {
      id: '1',
      users: [
        { id: '1', name: 'Sarah', avatar: 'SC' },
        { id: '2', name: 'Mike', avatar: 'MJ' },
        { id: '3', name: 'Emma', avatar: 'ER' },
      ],
      intent: 'Coffee',
      emoji: '☕',
      expiresAt: new Date(Date.now() + 30 * 60000).toISOString(),
    },
  ];

  const intents = [
    { value: 'coffee', label: 'Coffee', emoji: '☕' },
    { value: 'drinks', label: 'Drinks', emoji: '🍷' },
    { value: 'brunch', label: 'Brunch', emoji: '🥐' },
    { value: 'lunch', label: 'Lunch', emoji: '🍜' },
    { value: 'dinner', label: 'Dinner', emoji: '🍝' },
    { value: 'walk', label: 'Walk', emoji: '🚶' },
  ];

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  const handleCreateAmbition = () => {
    console.log('Creating ambition:', { selectedIntent, selectedTime, selectedVibe });
    setShowCreateModal(false);
  };

  return (
    <div className={styles.page}>
      {/* Header Original - SIN CAMBIOS */}
      <div className={styles.heroHeader}>
        <h1 className={styles.heroTitle}>
          What's the <span className={styles.highlight}>move?</span>
        </h1>
        <p className={styles.heroSubtitle}>PICK A SIGNAL TO BROADCAST</p>
      </div>

      {/* Tabs Originales - SIN CAMBIOS */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'active' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active ({activeAmbitions.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'matches' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Matches ({matches.length})
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Active Tab */}
        {activeTab === 'active' && (
          <>
            {activeAmbitions.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>📡</div>
                <h3 className={styles.emptyTitle}>No active ambitions</h3>
                <p className={styles.emptyDescription}>
                  Create an ambition to broadcast what you want to do right now
                </p>
              </div>
            ) : (
              <div className={styles.list}>
                {activeAmbitions.map((ambition, index) => (
                  <div
                    key={ambition.id}
                    className={styles.ambitionCard}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIcon}>{ambition.emoji}</div>
                      <div className={styles.cardInfo}>
                        <h3 className={styles.cardTitle}>{ambition.title}</h3>
                        <div className={styles.cardMeta}>
                          <span className={styles.metaItem}>
                            <span className={styles.metaIcon}>⏰</span>
                            {ambition.timeWindow}
                          </span>
                          <span className={styles.metaDot}>•</span>
                          <span className={styles.metaItem}>
                            <span className={styles.metaIcon}>✨</span>
                            {ambition.vibe}
                          </span>
                          {ambition.area && (
                            <>
                              <span className={styles.metaDot}>•</span>
                              <span className={styles.metaItem}>
                                <span className={styles.metaIcon}>📍</span>
                                {ambition.area}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.timeChip}>
                        <span className={styles.pulseDot}></span>
                        {getTimeRemaining(ambition.expiresAt)} left
                      </div>
                      <button className={styles.cancelBtn}>Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <>
            {matches.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>🎯</div>
                <h3 className={styles.emptyTitle}>No matches yet</h3>
                <p className={styles.emptyDescription}>
                  When someone wants the same thing, you'll see them here
                </p>
              </div>
            ) : (
              <div className={styles.list}>
                {matches.map((match, index) => (
                  <div
                    key={match.id}
                    className={styles.matchCard}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.matchHeader}>
                      <div className={styles.matchBadge}>
                        <span className={styles.matchBadgeIcon}>✨</span>
                        New Match!
                      </div>
                      <div className={styles.matchTimer}>
                        {getTimeRemaining(match.expiresAt)} to respond
                      </div>
                    </div>

                    <div className={styles.matchBody}>
                      <div className={styles.matchIntent}>
                        <span className={styles.matchEmoji}>{match.emoji}</span>
                        <h3 className={styles.matchTitle}>
                          {match.users.length} people want {match.intent}
                        </h3>
                      </div>

                      <div className={styles.matchUsers}>
                        {match.users.map(user => (
                          <div key={user.id} className={styles.matchUser}>
                            <div className={styles.userAvatar}>{user.avatar}</div>
                            <span className={styles.userName}>{user.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.matchActions}>
                      <button className={styles.declineBtn}>Decline</button>
                      <button className={styles.acceptBtn}>Accept & Plan</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* FAB */}
      <button className={styles.createBtn} onClick={() => setShowCreateModal(true)}>
        <span className={styles.createIcon}>⚡</span>
        <span className={styles.createText}>New Ambition</span>
      </button>

      {/* Create Modal */}
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
                  {intents.map(item => (
                    <button
                      key={item.value}
                      className={`${styles.intentBtn} ${
                        selectedIntent === item.value ? styles.selected : ''
                      }`}
                      onClick={() => setSelectedIntent(item.value)}
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
                      className={`${styles.timeBtn} ${
                        selectedTime === item.value ? styles.selected : ''
                      }`}
                      onClick={() => setSelectedTime(item.value)}
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
                      className={`${styles.vibeBtn} ${
                        selectedVibe === item.value ? styles.selected : ''
                      }`}
                      onClick={() => setSelectedVibe(item.value)}
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