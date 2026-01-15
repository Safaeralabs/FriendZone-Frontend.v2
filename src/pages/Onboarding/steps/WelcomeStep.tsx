import React from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import styles from './Steps.module.css';

const WelcomeStep: React.FC = () => {
  const { nextStep } = useOnboarding();

  return (
    <div className={styles.step}>
      <div className={styles.hero}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>🌊</div>
        </div>
        <h1 className={styles.heroTitle}>Welcome to Friendzone</h1>
        <p className={styles.heroSubtitle}>
          The social app that helps you connect with people nearby and create real friendships.
        </p>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🎯</span>
          <div className={styles.featureText}>
            <h3 className={styles.featureTitle}>Spontaneous Hangouts</h3>
            <p className={styles.featureDescription}>Join activities happening right now</p>
          </div>
        </div>

        <div className={styles.feature}>
          <span className={styles.featureIcon}>⚡</span>
          <div className={styles.featureText}>
            <h3 className={styles.featureTitle}>Share Your Vibes</h3>
            <p className={styles.featureDescription}>Let friends know what you're up for</p>
          </div>
        </div>

        <div className={styles.feature}>
          <span className={styles.featureIcon}>🗺️</span>
          <div className={styles.featureText}>
            <h3 className={styles.featureTitle}>Explore Nearby</h3>
            <p className={styles.featureDescription}>Discover events and people around you</p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={nextStep}>
          Get Started
        </button>
        <p className={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;