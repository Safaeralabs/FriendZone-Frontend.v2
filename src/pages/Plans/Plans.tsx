import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Hangout } from '@/types';
import styles from './Plans.module.css';

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { hangouts, user } = useApp();
  const [activeTab, setActiveTab] = useState<'attending' | 'hosting'>('attending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Filter hangouts by tab
  const filteredHangouts = hangouts.filter(h => {
    if (activeTab === 'attending') {
      // Hangouts where user is participant (not host)
      return h.participants.some(p => p.id === user.id && p.status !== 'host');
    } else {
      // Hangouts where user is host
      return h.hostId === user.id;
    }
  });

  const getTimeStatus = (hangout: Hangout) => {
    const now = new Date();
    const hangoutTime = new Date(hangout.time);
    const diff = hangoutTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Check if it's happening now (within 15 min window)
    if (Math.abs(minutes) <= 15) {
      return { label: 'LIVE', color: 'live', time: 'Now' };
    }

    // Past
    if (diff < 0) {
      const absMinutes = Math.abs(minutes);
      if (absMinutes < 60) return { label: `${absMinutes}M AGO`, color: 'past', time: 'Past' };
      if (absMinutes < 1440) return { label: `${Math.floor(absMinutes / 60)}H AGO`, color: 'past', time: 'Past' };
      return { label: 'Yesterday', color: 'past', time: 'Past' };
    }

    // Future
    if (minutes < 60) {
      return { label: `IN ${minutes}M`, color: 'soon', time: `In ${minutes}m` };
    }
    if (hours < 24) {
      return { label: `IN ${hours}H`, color: 'upcoming', time: `In ${hours}h` };
    }
    if (days === 1) {
      return { label: 'TOMORROW', color: 'upcoming', time: 'Tomorrow' };
    }
    return { label: `IN ${days}D`, color: 'upcoming', time: `In ${days} days` };
  };

  const getLastMessage = (hangout: Hangout) => {
    // Mock last message - in real app, this would come from chat
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
    // In real app, this would be actual images
    // For now, return a gradient based on hangout type
    const gradients = {
      community: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      offer: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'event-linked': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    };
    return gradients[hangout.type];
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button 
          className={styles.searchBtn}
          onClick={() => setShowSearch(!showSearch)}
        >
          🔍
        </button>
        <h1 className={styles.title}>Hangouts</h1>
        <button 
          className={styles.addBtn}
          onClick={() => navigate('/create')}
        >
          +
        </button>
      </div>

      {/* Search Bar (collapsible) */}
      {showSearch && (
        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search hangouts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
      )}

      {/* Tabs */}
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

      {/* Hangouts List */}
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
              const hasNewMessages = Math.random() > 0.5; // Mock

              return (
                <div
                  key={hangout.id}
                  className={styles.hangoutCard}
                  onClick={() => navigate(`/hangouts/${hangout.id}`)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Hangout Image */}
                  <div 
                    className={styles.hangoutImage}
                    style={{ background: getHangoutImage(hangout) }}
                  >
                    {status.color === 'live' && (
                      <div className={styles.liveIndicator}>
                        <span className={styles.liveDot}></span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={styles.hangoutContent}>
                    <div className={styles.hangoutHeader}>
                      <div className={styles.hangoutTitleRow}>
                        <h3 className={styles.hangoutTitle}>{hangout.title}</h3>
                        {status.color === 'live' && (
                          <span className={styles.liveBadge}>LIVE</span>
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

                  {/* New message indicator */}
                  {hasNewMessages && <div className={styles.unreadDot}></div>}
                </div>
              );
            })}

            {/* End of list */}
            <div className={styles.endOfList}>
              <div className={styles.endIcon}>🎊</div>
              <p className={styles.endText}>END OF INBOX</p>
            </div>
          </div>
        )}
      </div>

      {/* FAB - Create Hangout */}
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