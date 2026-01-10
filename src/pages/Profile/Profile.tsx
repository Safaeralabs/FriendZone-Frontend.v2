import React from 'react';
import { useApp } from '@/context/AppContext';
import TopBar from '@/components/TopBar/TopBar';
import VibePill from '@/components/VibePill/VibePill';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const { user } = useApp();

  return (
    <div className={styles.page}>
      <TopBar title="Profile" />
      <div className={styles.content}>
        <div className={styles.avatar}>{user.name.charAt(0)}</div>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.bio}>{user.bio}</p>
        
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Interests</h3>
          <div className={styles.pills}>
            {user.interests.map((interest, i) => (
              <VibePill key={i} text={interest} />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Vibe</h3>
          <div className={styles.pills}>
            {user.vibe.map((v, i) => (
              <VibePill key={i} text={v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;