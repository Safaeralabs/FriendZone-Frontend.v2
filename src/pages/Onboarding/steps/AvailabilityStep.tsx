import React, { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import styles from './Steps.module.css';

const availabilityOptions = [
  { value: 'mornings', label: 'Mornings', emoji: '🌅', time: '6AM - 12PM' },
  { value: 'afternoons', label: 'Afternoons', emoji: '☀️', time: '12PM - 6PM' },
  { value: 'evenings', label: 'Evenings', emoji: '🌆', time: '6PM - 10PM' },
  { value: 'nights', label: 'Late Nights', emoji: '🌙', time: '10PM - 2AM' },
  { value: 'weekdays', label: 'Weekdays', emoji: '📅', time: 'Mon - Fri' },
  { value: 'weekends', label: 'Weekends', emoji: '🎉', time: 'Sat - Sun' },
  { value: 'flexible', label: 'Very Flexible', emoji: '🤸', time: 'Anytime!' },
  { value: 'spontaneous', label: 'Spontaneous', emoji: '⚡', time: 'Last minute' },
];

const AvailabilityStep: React.FC = () => {
  const { data, updateData, nextStep } = useOnboarding();
  const [availability, setAvailability] = useState<string[]>(data.availability);

  const toggleAvailability = (value: string) => {
    if (availability.includes(value)) {
      setAvailability(availability.filter(a => a !== value));
    } else {
      setAvailability([...availability, value]);
    }
  };

  const handleContinue = () => {
    if (availability.length > 0) {
      updateData({ availability });
      nextStep();
    }
  };

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>When are you free?</h2>
        <p className={styles.stepDescription}>
          Let people know when you're usually available to hang out
        </p>
      </div>

      <div className={styles.stepBody}>
        <div className={styles.availabilityGrid}>
          {availabilityOptions.map(option => (
            <button
              key={option.value}
              className={`${styles.availabilityCard} ${availability.includes(option.value) ? styles.selected : ''}`}
              onClick={() => toggleAvailability(option.value)}
            >
              <span className={styles.availabilityEmoji}>{option.emoji}</span>
              <div className={styles.availabilityInfo}>
                <h3 className={styles.availabilityLabel}>{option.label}</h3>
                <p className={styles.availabilityTime}>{option.time}</p>
              </div>
              {availability.includes(option.value) && (
                <span className={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryBtn}
          onClick={handleContinue}
          disabled={availability.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AvailabilityStep;