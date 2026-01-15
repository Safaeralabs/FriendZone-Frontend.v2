import React, { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import styles from './Steps.module.css';

const groupSizeOptions = [
  {
    value: 'one-on-one',
    label: 'One-on-One',
    emoji: '👥',
    description: 'Prefer intimate 1:1 hangouts',
  },
  {
    value: 'small',
    label: 'Small Groups',
    emoji: '👨‍👩‍👦',
    description: '3-5 people, close-knit vibes',
  },
  {
    value: 'medium',
    label: 'Medium Groups',
    emoji: '👨‍👩‍👧‍👦',
    description: '6-10 people, social energy',
  },
  {
    value: 'large',
    label: 'Large Groups',
    emoji: '👨‍👩‍👧‍👦👨‍👩‍👧‍👦',
    description: '10+ people, party atmosphere',
  },
  {
    value: 'any',
    label: 'Any Size',
    emoji: '🌟',
    description: 'Flexible with group size',
  },
];

const activityTypeOptions = [
  { value: 'structured', label: 'Structured', emoji: '📋', description: 'Planned activities' },
  { value: 'spontaneous', label: 'Spontaneous', emoji: '🎲', description: 'Go with the flow' },
  { value: 'indoor', label: 'Indoor', emoji: '🏠', description: 'Cafes, bars, venues' },
  { value: 'outdoor', label: 'Outdoor', emoji: '🌳', description: 'Parks, nature, walks' },
  { value: 'daytime', label: 'Daytime', emoji: '☀️', description: 'Brunch, coffee, lunch' },
  { value: 'nighttime', label: 'Nighttime', emoji: '🌙', description: 'Dinner, bars, clubs' },
];

const HangoutStyleStep: React.FC = () => {
  const { data, updateData, nextStep } = useOnboarding();
  const [groupSize, setGroupSize] = useState<string>(data.groupSize);
  const [activityTypes, setActivityTypes] = useState<string[]>(data.activityTypes);

  const toggleActivityType = (value: string) => {
    if (activityTypes.includes(value)) {
      setActivityTypes(activityTypes.filter(a => a !== value));
    } else {
      setActivityTypes([...activityTypes, value]);
    }
  };

  const handleContinue = () => {
    if (groupSize && activityTypes.length > 0) {
      updateData({ groupSize, activityTypes });
      nextStep();
    }
  };

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>What's your hangout style?</h2>
        <p className={styles.stepDescription}>
          Help us understand your preferences
        </p>
      </div>

      <div className={styles.stepBody}>
        {/* Group Size */}
        <div className={styles.section}>
          <label className={styles.sectionLabel}>Preferred Group Size</label>
          <div className={styles.groupSizeGrid}>
            {groupSizeOptions.map(option => (
              <button
                key={option.value}
                className={`${styles.groupSizeCard} ${groupSize === option.value ? styles.selected : ''}`}
                onClick={() => setGroupSize(option.value)}
              >
                <span className={styles.groupSizeEmoji}>{option.emoji}</span>
                <h3 className={styles.groupSizeLabel}>{option.label}</h3>
                <p className={styles.groupSizeDescription}>{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Activity Types */}
        <div className={styles.section}>
          <label className={styles.sectionLabel}>Activity Preferences (Select multiple)</label>
          <div className={styles.activityGrid}>
            {activityTypeOptions.map(option => (
              <button
                key={option.value}
                className={`${styles.activityCard} ${activityTypes.includes(option.value) ? styles.selected : ''}`}
                onClick={() => toggleActivityType(option.value)}
              >
                <span className={styles.activityEmoji}>{option.emoji}</span>
                <div className={styles.activityInfo}>
                  <h3 className={styles.activityLabel}>{option.label}</h3>
                  <p className={styles.activityDescription}>{option.description}</p>
                </div>
                {activityTypes.includes(option.value) && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryBtn}
          onClick={handleContinue}
          disabled={!groupSize || activityTypes.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default HangoutStyleStep;