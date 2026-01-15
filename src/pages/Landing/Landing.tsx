import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
      </div>

      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>🌊</div>
        </div>

        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Welcome to Friendzone</h1>
          <p className={styles.heroSubtitle}>
            Connect with people nearby and create spontaneous hangouts
          </p>
        </div>

        {/* Features */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⚡</span>
            <p className={styles.featureText}>Instant connections</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🗺️</span>
            <p className={styles.featureText}>Discover nearby</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎯</span>
            <p className={styles.featureText}>Real friendships</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={() => navigate('/signup')}>
            Get Started
          </button>
          <button className={styles.secondaryBtn} onClick={() => navigate('/login')}>
            I already have an account
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.linkBtn} onClick={() => navigate('/terms')}>
            Terms of Service
          </button>
          <span className={styles.separator}>•</span>
          <button className={styles.linkBtn} onClick={() => navigate('/privacy')}>
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;