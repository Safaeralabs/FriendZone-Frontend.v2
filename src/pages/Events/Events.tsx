import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import TopBar from '@/components/TopBar/TopBar';
import EmptyState from '@/components/EmptyState/EmptyState';
import styles from './Events.module.css';

const Events: React.FC = () => {
  const navigate = useNavigate();
  const { events } = useApp();

  return (
    <div className={styles.page}>
      <TopBar title="Events" subtitle="Find groups going together" />
      
      {events.length === 0 ? (
        <EmptyState
          icon="🎉"
          title="No events today"
          description="Check back tomorrow for new events and groups forming around them."
        />
      ) : (
        <div className={styles.list}>
          {events.map(event => (
            <div key={event.id} className={styles.card} onClick={() => navigate(`/events/${event.id}`)}>
              <h3 className={styles.cardTitle}>{event.title}</h3>
              <p className={styles.cardVenue}>{event.venue}</p>
              <p className={styles.cardTime}>{new Date(event.time).toLocaleString()}</p>
              <div className={styles.cardFooter}>
                <span className={styles.hangoutCount}>{event.hangoutsCount} groups forming</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;