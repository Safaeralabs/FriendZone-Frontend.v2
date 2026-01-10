import React from 'react';
import TopBar from '@/components/TopBar/TopBar';
import EmptyState from '@/components/EmptyState/EmptyState';
import styles from './Inbox.module.css';

const Inbox: React.FC = () => {
  return (
    <div className={styles.page}>
      <TopBar title="Inbox" />
      <EmptyState
        icon="💬"
        title="No messages yet"
        description="Once you join a hangout, chat with your group here."
      />
    </div>
  );
};

export default Inbox;