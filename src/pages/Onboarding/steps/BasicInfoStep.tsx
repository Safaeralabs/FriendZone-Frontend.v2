import React, { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import styles from './Steps.module.css';

const BasicInfoStep: React.FC = () => {
  const { data, updateData, nextStep } = useOnboarding();
  const [name, setName] = useState(data.name);

  const handleContinue = () => {
    if (name.trim()) {
      const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      updateData({ name: name.trim(), avatar: initials });
      nextStep();
    }
  };

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>What's your name?</h2>
        <p className={styles.stepDescription}>This is how others will see you</p>
      </div>

      <div className={styles.stepBody}>
        <div className={styles.avatarPreview}>
          <div className={styles.avatarCircle}>
            {name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2) || '?'}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={50}
            autoFocus
          />
          <span className={styles.inputHint}>{name.length}/50</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryBtn}
          onClick={handleContinue}
          disabled={!name.trim()}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BasicInfoStep;