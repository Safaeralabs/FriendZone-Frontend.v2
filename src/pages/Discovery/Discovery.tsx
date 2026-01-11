import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import HangoutCard from '@/components/HangoutCard/HangoutCard';
import EmptyState from '@/components/EmptyState/EmptyState';
import styles from './Discovery.module.css';

const Discovery: React.FC = () => {
  const navigate = useNavigate();
  const { hangouts, user } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  }, []);

  // Check if a date has hangouts
  const hasHangouts = (date: Date) => {
    return hangouts.some(h => {
      const hangoutDate = new Date(h.time);
      return hangoutDate.toDateString() === date.toDateString();
    });
  };

  const filteredHangouts = useMemo(() => {
    return hangouts.filter(h => {
      const hangoutDate = new Date(h.time);
      return hangoutDate.toDateString() === selectedDate.toDateString();
    });
  }, [hangouts, selectedDate]);

  const formatDate = (date: Date) => {
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date: date.getDate(),
    };
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const friendsOut = 12;
  const nearbyHangouts = filteredHangouts.length;

  return (
    <div className={styles.page}>
      {/* Top Icons */}
      <div className={styles.topIcons}>
        <button className={styles.iconBtn} onClick={() => navigate('/profile')}>
          <div className={styles.avatar}>
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
        </button>
        <button className={styles.iconBtn} onClick={() => navigate('/plans')}>
          📋
        </button>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.locationTime}>
          <span className={styles.sunIcon}>☀️</span>
          <span className={styles.locationText}>NEW YORK • {getCurrentTime()}</span>
        </div>
        <h1 className={styles.greeting}>Hello {user.name.split(' ')[0]}</h1>
        <div className={styles.statsCard}>
          <span className={styles.pulseDot}></span>
          <span className={styles.statsText}>
            {friendsOut} friends are out <span className={styles.separator}>•</span> {nearbyHangouts} hangouts near you
          </span>
        </div>
      </div>

      {/* Date picker */}
      <div className={styles.datePicker}>
        {weekDays.map((date, index) => {
          const { day, date: dateNum } = formatDate(date);
          const selected = date.toDateString() === selectedDate.toDateString();
          const today = isToday(date);
          const hasEvents = hasHangouts(date);

          return (
            <button
              key={index}
              className={`${styles.dateBtn} ${selected ? styles.selected : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              <span className={styles.dayLabel}>{day}</span>
              <span className={styles.dateLabel}>{dateNum}</span>
              {hasEvents && <span className={styles.eventDot}></span>}
            </button>
          );
        })}
      </div>

      {/* Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>HAPPENING TODAY</h2>
          <button className={styles.seeAll}>See all</button>
        </div>

        <div className={styles.content}>
          {filteredHangouts.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No hangouts today"
              description="Be the first to create one or check another day."
              action={{
                label: 'Create Hangout',
                onClick: () => navigate('/create'),
              }}
            />
          ) : (
            <div className={styles.list}>
              {filteredHangouts.map(hangout => (
                <HangoutCard key={hangout.id} hangout={hangout} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <button className={styles.fab} onClick={() => navigate('/create')}>
        <span className={styles.fabIcon}>+</span>
      </button>
    </div>
  );
};

export default Discovery;