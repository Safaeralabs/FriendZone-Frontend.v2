import React, { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import styles from './Steps.module.css';

const vibeOptions = [
  {
    value: 'chill',
    label: 'Chill & Relaxed',
    emoji: '😌',
    description: 'Low-key hangouts, casual vibes',
    gradient: 'linear-gradient(135deg, #667EEA, #764BA2)',
  },
  {
    value: 'social',
    label: 'Social Butterfly',
    emoji: '🦋',
    description: 'Love meeting new people',
    gradient: 'linear-gradient(135deg, #F093FB, #F5576C)',
  },
  {
    value: 'active',
    label: 'Active & Energetic',
    emoji: '⚡',
    description: 'Always on the move',
    gradient: 'linear-gradient(135deg, #4FACFE, #00F2FE)',
  },
  {
    value: 'party',
    label: 'Party Animal',
    emoji: '🎉',
    description: 'Nightlife and celebrations',
    gradient: 'linear-gradient(135deg, #FA709A, #FEE140)',
  },
  {
    value: 'foodie',
    label: 'Foodie Explorer',
    emoji: '🍜',
    description: 'Food is life',
    gradient: 'linear-gradient(135deg, #FF9A56, #FEC163)',
  },
  {
    value: 'creative',
    label: 'Creative Soul',
    emoji: '🎨',
    description: 'Art, music, and culture',
    gradient: 'linear-gradient(135deg, #A8EDEA, #FED6E3)',
  },
  {
    value: 'intellectual',
    label: 'Deep Thinker',
    emoji: '🧠',
    description: 'Meaningful conversations',
    gradient: 'linear-gradient(135deg, #D299C2, #FEF9D7)',
  },
  {
    value: 'adventurous',
    label: 'Adventurer',
    emoji: '🗺️',
    description: 'Always exploring',
    gradient: 'linear-gradient(135deg, #89F7FE, #66A6FF)',
  },
];

const VibesStep: React.FC = () => {
  const { data, updateData, nextStep } = useOnboarding();
  const [vibes, setVibes] = useState<string[]>(data.vibes);

  const toggleVibe = (value: string) => {
    if (vibes.includes(value)) {
      setVibes(vibes.filter(v => v !== value));
    } else if (vibes.length < 3) {
      setVibes([...vibes, value]);
    }
  };

  const handleContinue = () => {
    if (vibes.length > 0) {
      updateData({ vibes });
      nextStep();
    }
  };

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>What's your vibe?</h2>
        <p className={styles.stepDescription}>
          Choose up to 3 that best describe your personality
        </p>
        <div className={styles.progressIndicator}>
          <span className={styles.progressCount}>{vibes.length}</span>
          <span className={styles.progressText}>/ 3 max</span>
        </div>
      </div>

      <div className={styles.stepBody}>
        <div className={styles.vibesGrid}>
          {vibeOptions.map(vibe => {
            const isSelected = vibes.includes(vibe.value);
            const isDisabled = !isSelected && vibes.length >= 3;
            
            return (
              <button
                key={vibe.value}
                className={`${styles.vibeCard} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
                onClick={() => !isDisabled && toggleVibe(vibe.value)}
                style={{
                  background: isSelected ? vibe.gradient : 'transparent',
                }}
              >
                <div className={styles.vibeCardContent}>
                  <span className={styles.vibeEmoji}>{vibe.emoji}</span>
                  <h3 className={styles.vibeTitle}>{vibe.label}</h3>
                  <p className={styles.vibeDescription}>{vibe.description}</p>
                </div>
                {isSelected && (
                  <div className={styles.selectedBadge}>✓</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryBtn}
          onClick={handleContinue}
          disabled={vibes.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default VibesStep;