import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  // Mock stats
  const stats = {
    hangoutsAttended: 42,
    reliability: 98,
    mutuals: 12,
  };

  const vibes = [
    { id: 1, icon: '🤝', label: 'Insanely-Friendly', color: '#6527fc' },
    { id: 2, icon: '🎲', label: 'Board Game Fan', color: '#6527fc' },
    { id: 3, icon: '☕', label: 'Coffee Lover', color: '#6527fc' },
    { id: 4, icon: '🌙', label: 'Night Owl', color: '#6527fc' },
    { id: 5, icon: '🏃', label: 'Urban Explorer', color: '#6527fc' },
  ];

  const languages = [
    { code: 'en', flag: '🇺🇸', name: 'English', level: '(Native)' },
    { code: 'es', flag: '🇪🇸', name: 'Spanish', level: '(Fluent)' },
  ];

  const latestRecap = {
    date: 'Oct 12, 2024',
    attendees: 4,
    title: 'Shoreditch Board Games',
    highlight: 'Voted "MVP Strategist" during Catan sessions.',
    feedback: '"Alex brings great energy and explains rules smoothly"',
  };

  return (
    <div className={styles.page}>
      {/* New Header */}
      <div className={styles.heroHeader}>
        <div className={styles.headerTop}>
          <button className={styles.iconBtn} onClick={() => navigate('/')}>
            🏠
          </button>
          <div className={styles.liveBadge}>
            <span className={styles.liveDot}></span>
            <span className={styles.liveText}>{stats.hangoutsAttended} HANGOUTS</span>
          </div>
          <button className={styles.iconBtn}>
            ⚙️
          </button>
        </div>
        <h1 className={styles.heroTitle}>
          Your social <span className={styles.highlight}>passport</span>
        </h1>
        <p className={styles.heroSubtitle}>SHARE YOUR VIBE WITH THE WORLD</p>
      </div>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.username}>
          @{user.name.toLowerCase().replace(' ', '_')} • San Francisco
        </p>
        <p className={styles.bio}>"{user.bio}"</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{stats.hangoutsAttended}</div>
            <div className={styles.statLabel}>
              <span className={styles.statIcon}>👥</span>
              HANGOUTS
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{stats.reliability}%</div>
            <div className={styles.statLabel}>
              <span className={styles.statIcon}>⭐</span>
              RELIABILITY
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{stats.mutuals}</div>
            <div className={styles.statLabel}>
              <span className={styles.statIcon}>🤝</span>
              MUTUALS
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className={styles.content}>
        {/* Vibes Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>VIBES</h3>
            <button className={styles.editBtn}>✏️</button>
          </div>
          <div className={styles.vibesGrid}>
            {vibes.map(vibe => (
              <div key={vibe.id} className={styles.vibePill}>
                <span className={styles.vibeIcon}>{vibe.icon}</span>
                <span className={styles.vibeLabel}>{vibe.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>LANGUAGES</h3>
          <div className={styles.languagesGrid}>
            {languages.map(lang => (
              <div key={lang.code} className={styles.languageItem}>
                <span className={styles.languageFlag}>{lang.flag}</span>
                <span className={styles.languageName}>
                  {lang.name} <span className={styles.languageLevel}>{lang.level}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Hangout Recap */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>LATEST HANGOUT RECAP</h3>
          <div className={styles.recapCard}>
            <div className={styles.recapHeader}>
              <span className={styles.recapDate}>{latestRecap.date}</span>
              <span className={styles.recapAttendees}>• {latestRecap.attendees} attendees</span>
            </div>
            <h4 className={styles.recapTitle}>
              ⭐ {latestRecap.title}
            </h4>
            
            <div className={styles.recapSection}>
              <div className={styles.recapLabel}>
                <span className={styles.recapIcon}>⭐</span>
                YOUR HIGHLIGHT
              </div>
              <p className={styles.recapText}>{latestRecap.highlight}</p>
            </div>

            <div className={styles.recapSection}>
              <div className={styles.recapLabel}>
                <span className={styles.recapIcon}>💬</span>
                GROUP FEEDBACK
              </div>
              <p className={styles.recapText}>"{latestRecap.feedback}"</p>
            </div>

            <button className={styles.viewStoryBtn}>View Full Story</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;