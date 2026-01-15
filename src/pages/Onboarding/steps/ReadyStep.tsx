import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/context/OnboardingContext';
import { useApp } from '@/context/AppContext';
import styles from './Steps.module.css';

const ReadyStep: React.FC = () => {
  const navigate = useNavigate();
  const { data, completeOnboarding } = useOnboarding();
  const { updateUser } = useApp();

  const handleComplete = () => {
    // Update user with onboarding data
    updateUser({
      name: data.name,
      avatar: data.avatar,
      city: data.city,
      neighborhood: data.neighborhood,
      languages: data.languages,
      interests: data.interests,
      vibes: data.vibes,
      availability: data.availability,
      groupSize: data.groupSize,
      activityTypes: data.activityTypes,
    });

    completeOnboarding();
    navigate('/');
  };

  return (
    <div className={styles.step}>
      <div className={styles.readyContainer}>
        <div className={styles.readyAnimation}>
          <div className={styles.successIcon}>🎉</div>
        </div>

        <h1 className={styles.readyTitle}>You're all set!</h1>
        <p className={styles.readySubtitle}>
          Welcome to Friendzone, {data.name.split(' ')[0]}
        </p>

        <div className={styles.readySummary}>
          <h3 className={styles.summaryTitle}>Your Profile Highlights</h3>
          
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <span className={styles.summaryEmoji}>📍</span>
              <div className={styles.summaryInfo}>
                <span className={styles.summaryLabel}>Location</span>
                <span className={styles.summaryValue}>
                  {data.neighborhood ? `${data.neighborhood}, ${data.city}` : data.city}
                </span>
              </div>
            </div>

            {data.languages.length > 0 && (
              <div className={styles.summaryCard}>
                <span className={styles.summaryEmoji}>🗣️</span>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Languages</span>
                  <span className={styles.summaryValue}>
                    {data.languages.map(l => l.name).join(', ')}
                  </span>
                </div>
              </div>
            )}

            <div className={styles.summaryCard}>
              <span className={styles.summaryEmoji}>✨</span>
              <div className={styles.summaryInfo}>
                <span className={styles.summaryLabel}>Interests</span>
                <span className={styles.summaryValue}>
                  {data.interests.length} selected
                </span>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <span className={styles.summaryEmoji}>🎯</span>
              <div className={styles.summaryInfo}>
                <span className={styles.summaryLabel}>Vibe</span>
                <span className={styles.summaryValue}>
                  {data.vibes.length} vibes
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.readyFeatures}>
          <h3 className={styles.featuresTitle}>What's next?</h3>
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🌊</span>
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>Discover Hangouts</h4>
                <p className={styles.featureDescription}>
                  Browse activities happening near you right now
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>⚡</span>
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>Share Your Vibes</h4>
                <p className={styles.featureDescription}>
                  Let people know what you're up for with Ambitions
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🗺️</span>
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>Explore Nearby</h4>
                <p className={styles.featureDescription}>
                  See hangouts and events on the map
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={handleComplete}>
            Let's Go! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadyStep;