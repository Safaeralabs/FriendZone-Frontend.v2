import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.animation}>
          <div className={styles.number}>4</div>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>🌊</span>
          </div>
          <div className={styles.number}>4</div>
        </div>

        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.description}>
          Oops! Looks like you've drifted into uncharted waters. The page you're looking for
          doesn't exist.
        </p>

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={() => navigate('/')}>
            <span className={styles.btnIcon}>🏠</span>
            Go Home
          </button>
          <button className={styles.secondaryBtn} onClick={() => navigate(-1)}>
            <span className={styles.btnIcon}>←</span>
            Go Back
          </button>
        </div>

        <div className={styles.suggestions}>
          <p className={styles.suggestionsTitle}>Quick links:</p>
          <div className={styles.linksList}>
            <button className={styles.link} onClick={() => navigate('/ambitions')}>
              Ambitions
            </button>
            <button className={styles.link} onClick={() => navigate('/plans')}>
              Plans
            </button>
            <button className={styles.link} onClick={() => navigate('/maps')}>
              Map
            </button>
            <button className={styles.link} onClick={() => navigate('/help')}>
              Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;