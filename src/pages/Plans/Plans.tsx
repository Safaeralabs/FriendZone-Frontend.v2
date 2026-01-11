import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Hangout } from '@/types';
import styles from './Plans.module.css';

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { hangouts, user } = useApp();
  const [activeTab, setActiveTab] = useState<'attending' | 'hosting'>('attending');

  const filteredHangouts = hangouts.filter(h => {
    if (activeTab === 'attending') {
      return h.participants.some(p => p.id === user.id && p.status !== 'host');
    } else {
      return h.hostId === user.id;
    }
  });

  const getTimeStatus = (hangout: Hangout) => {
    const now = new Date();
    const hangoutTime = new Date(hangout.time);
    const diff = hangoutTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));

    if (Math.abs(minutes) <= 15) {
      return { label: 'LIVE', color: 'live', time: 'Now' };
    }

    if (diff < 0) {
      const absMinutes = Math.abs(minutes);
      if (absMinutes < 60) return { label: `${absMinutes}M AGO`, color: 'past', time: 'Past' };
      if (absMinutes < 1440) return { label: `${Math.floor(absMinutes / 60)}H AGO`, color: 'past', time: 'Past' };
      return { label: 'Yesterday', color: 'past', time: 'Past' };
    }

    if (minutes < 60) {
      return { label: `IN ${minutes}M`, color: 'soon', time: `In ${minutes}m` };
    }
    if (minutes < 1440) {
      return { label: `IN ${Math.floor(minutes / 60)}H`, color: 'upcoming', time: `In ${Math.floor(minutes / 60)}h` };
    }
    const days = Math.floor(minutes / 1440);
    if (days === 1) {
      return { label: 'TOMORROW', color: 'upcoming', time: 'Tomorrow' };
    }
    return { label: `IN ${days}D`, color: 'upcoming', time: `In ${days} days` };
  };

  const getLastMessage = (hangout: Hangout) => {
    const messages = [
      `${hangout.hostName}: Just arrived at the cafe!`,
      `${hangout.hostName}: Running 5 min late`,
      `${hangout.participants[0]?.name}: See you guys there!`,
      `${hangout.hostName}: Bringing the blankets.`,
      `You: Can't wait!`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getHangoutImage = (hangout: Hangout) => {
    const gradients = {
      community: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      offer: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'event-linked': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    };
    return gradients[hangout.type];
  };

  const upcomingCount = hangouts.filter(h => {
    const time = new Date(h.time);
    return time > new Date() && h.participants.some(p => p.id === user.id);
  }).length;

  return (
    <div className={styles.page}>
      {/* New Hero Header */}
      <div className={styles.heroHeader}>
        <div className={styles.headerTop}>
          <button className={styles.iconBtn} onClick={() => navigate('/')}>
            🏠
          </button>
          <div className={styles.liveBadge}>
            <span className={styles.liveDot}></span>
            <span className={styles.liveText}>{upcomingCount} UPCOMING</span>
          </div>
          <button className={styles.iconBtn}>
            🔍
          </button>
        </div>
        <h1 className={styles.heroTitle}>
          Your <span className={styles.highlight}>hangouts</span>
        </h1>
        <p className={styles.heroSubtitle}>TRACK ALL YOUR PLANS</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'attending' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('attending')}
        >
          Attending
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'hosting' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('hosting')}
        >
          Hosting
        </button>
      </div>

      <div className={styles.content}>
        {filteredHangouts.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🎉</div>
            <p className={styles.emptyTitle}>
              {activeTab === 'attending' ? 'No hangouts yet' : 'No hosted hangouts'}
            </p>
            <p className={styles.emptyText}>
              {activeTab === 'attending' 
                ? 'Join a hangout from Discovery to see it here' 
                : 'Create your first hangout to get started'}
            </p>
          </div>
        ) : (
          <div className={styles.list}>
            {filteredHangouts.map((hangout, index) => {
              const status = getTimeStatus(hangout);
              const lastMessage = getLastMessage(hangout);
              const hasNewMessages = Math.random() > 0.5;

              return (
                <div
                  key={hangout.id}
                  className={styles.hangoutCard}
                  onClick={() => navigate(`/hangouts/${hangout.id}`)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div 
                    className={styles.hangoutImage}
                    style={{ background: getHangoutImage(hangout) }}
                  >
                    {status.color === 'live' && (
                      <div className={styles.liveIndicator}>
                        <span className={styles.liveDot2}></span>
                      </div>
                    )}
                  </div>

                  <div className={styles.hangoutContent}>
                    <div className={styles.hangoutHeader}>
                      <div className={styles.hangoutTitleRow}>
                        <h3 className={styles.hangoutTitle}>{hangout.title}</h3>
                        {status.color === 'live' && (
                          <span className={styles.liveBadge2}>LIVE</span>
                        )}
                      </div>
                      <span className={`${styles.timeBadge} ${styles[status.color]}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className={styles.hangoutFooter}>
                      <p className={styles.lastMessage}>{lastMessage}</p>
                      <span className={styles.timeLabel}>{status.time}</span>
                    </div>
                  </div>

                  {hasNewMessages && <div className={styles.unreadDot}></div>}
                </div>
              );
            })}

            <div className={styles.endOfList}>
              <div className={styles.endIcon}>🎊</div>
              <p className={styles.endText}>END OF INBOX</p>
            </div>
          </div>
        )}
      </div>

      <button 
        className={styles.fab}
        onClick={() => navigate('/create')}
      >
        <span className={styles.fabIcon}>+</span>
      </button>
    </div>
  );
};

export default Plans;