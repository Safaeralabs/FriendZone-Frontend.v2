import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import styles from './Plans.module.css';

type TabType = 'upcoming' | 'past' | 'hosting';

interface Hangout {
  id: string;
  title: string;
  type: string;
  emoji: string;
  time: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  host: string;
  isHost: boolean;
  status: 'confirmed' | 'happening' | 'completed';
  gradient: string;
}

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  // Mock data
  const upcomingHangouts: Hangout[] = [
    {
      id: '1',
      title: 'Coffee & Deep Convos',
      type: 'coffee',
      emoji: '☕',
      time: '2:30 PM',
      date: 'Today',
      location: 'Blue Bottle Coffee',
      attendees: 3,
      maxAttendees: 6,
      host: 'Sarah',
      isHost: false,
      status: 'happening',
      gradient: 'linear-gradient(135deg, #8B6914, #D4A574)',
    },
    {
      id: '2',
      title: 'Board Game Night',
      type: 'games',
      emoji: '🎲',
      time: '7:00 PM',
      date: 'Tomorrow',
      location: 'Gamescape North',
      attendees: 5,
      maxAttendees: 8,
      host: 'Mike',
      isHost: false,
      status: 'confirmed',
      gradient: 'linear-gradient(135deg, #667EEA, #764BA2)',
    },
    {
      id: '3',
      title: 'Sunday Brunch Vibes',
      type: 'brunch',
      emoji: '🥐',
      time: '11:00 AM',
      date: 'Jan 19',
      location: 'Zazie',
      attendees: 4,
      maxAttendees: 6,
      host: 'You',
      isHost: true,
      status: 'confirmed',
      gradient: 'linear-gradient(135deg, #D4A373, #F4E4C1)',
    },
  ];

  const pastHangouts: Hangout[] = [
    {
      id: '4',
      title: 'Trivia Night',
      type: 'games',
      emoji: '🎯',
      time: '8:00 PM',
      date: 'Jan 12',
      location: 'The Knockout',
      attendees: 6,
      maxAttendees: 8,
      host: 'Alex',
      isHost: false,
      status: 'completed',
      gradient: 'linear-gradient(135deg, #667EEA, #764BA2)',
    },
    {
      id: '5',
      title: 'Yoga in the Park',
      type: 'active',
      emoji: '🧘',
      time: '9:00 AM',
      date: 'Jan 10',
      location: 'Golden Gate Park',
      attendees: 8,
      maxAttendees: 12,
      host: 'Emma',
      isHost: false,
      status: 'completed',
      gradient: 'linear-gradient(135deg, #56AB2F, #A8E063)',
    },
  ];

  const hostingHangouts = upcomingHangouts.filter(h => h.isHost);

  const getHangouts = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingHangouts;
      case 'past':
        return pastHangouts;
      case 'hosting':
        return hostingHangouts;
      default:
        return upcomingHangouts;
    }
  };

  const getTimeUntil = (date: string, time: string) => {
    if (date === 'Today') return 'In 3h';
    if (date === 'Tomorrow') return 'In 1d';
    return date;
  };

  return (
    <div className={styles.page}>
      <div className={styles.heroHeader}>
        
        <h1 className={styles.heroTitle}>
          Your <span className={styles.highlight}>hangouts</span>
        </h1>
        <p className={styles.heroSubtitle}>TRACK ALL YOUR PLANS</p>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'hosting' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('hosting')}
        >
          Hosting
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'past' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {getHangouts().length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              {activeTab === 'upcoming' && '📅'}
              {activeTab === 'hosting' && '🎯'}
              {activeTab === 'past' && '✨'}
            </div>
            <h3 className={styles.emptyTitle}>
              {activeTab === 'upcoming' && 'No upcoming plans'}
              {activeTab === 'hosting' && 'Not hosting anything yet'}
              {activeTab === 'past' && 'No past hangouts'}
            </h3>
            <p className={styles.emptyDescription}>
              {activeTab === 'upcoming' && 'Browse Discovery to find something fun'}
              {activeTab === 'hosting' && 'Create your first hangout and bring people together'}
              {activeTab === 'past' && 'Join some hangouts to build your history'}
            </p>
            <button
              className={styles.emptyBtn}
              onClick={() => navigate(activeTab === 'hosting' ? '/create' : '/')}
            >
              {activeTab === 'hosting' ? 'Create Hangout' : 'Explore Now'}
            </button>
          </div>
        ) : (
          <div className={styles.timeline}>
            {getHangouts().map((hangout, index) => (
              <div
                key={hangout.id}
                className={styles.timelineItem}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/hangout/${hangout.id}`)}
              >
                {/* Timeline Dot */}
                <div className={styles.timelineDot}>
                  <div
                    className={`${styles.dot} ${
                      hangout.status === 'happening' ? styles.dotHappening : ''
                    }`}
                  />
                  {index < getHangouts().length - 1 && <div className={styles.line} />}
                </div>

                {/* Card */}
                <div className={styles.card}>
                  {/* Status Badge */}
                  {hangout.status === 'happening' && (
                    <div className={styles.happeningBadge}>
                      <span className={styles.liveDot}></span>
                      HAPPENING NOW
                    </div>
                  )}

                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div
                      className={styles.cardIcon}
                      style={{ background: hangout.gradient }}
                    >
                      {hangout.emoji}
                    </div>
                    <div className={styles.cardTime}>
                      <span className={styles.timeLabel}>
                        {activeTab === 'past' ? 'Was' : 'Starts'}
                      </span>
                      <span className={styles.timeValue}>
                        {activeTab === 'past'
                          ? hangout.date
                          : getTimeUntil(hangout.date, hangout.time)}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{hangout.title}</h3>
                    <div className={styles.cardDetails}>
                      <div className={styles.detail}>
                        <span className={styles.detailIcon}>🕐</span>
                        <span className={styles.detailText}>
                          {hangout.date} • {hangout.time}
                        </span>
                      </div>
                      <div className={styles.detail}>
                        <span className={styles.detailIcon}>📍</span>
                        <span className={styles.detailText}>{hangout.location}</span>
                      </div>
                      <div className={styles.detail}>
                        <span className={styles.detailIcon}>👥</span>
                        <span className={styles.detailText}>
                          {hangout.attendees}/{hangout.maxAttendees} going
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className={styles.cardFooter}>
                    <span className={styles.hostBadge}>
                      {hangout.isHost ? '👑 Hosting' : `🎯 Hosted by ${hangout.host}`}
                    </span>
                    <button
                      className={styles.arrowBtn}
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/hangout/${hangout.id}`);
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;