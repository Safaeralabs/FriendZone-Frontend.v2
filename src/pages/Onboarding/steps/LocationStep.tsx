import React, { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import styles from './Steps.module.css';

const cities = [
  'New York, NY',
  'Los Angeles, CA',
  'San Francisco, CA',
  'Chicago, IL',
  'Miami, FL',
  'Austin, TX',
  'Seattle, WA',
  'Boston, MA',
];

const LocationStep: React.FC = () => {
  const { data, updateData, nextStep } = useOnboarding();
  const [city, setCity] = useState(data.city);
  const [neighborhood, setNeighborhood] = useState(data.neighborhood);

  const handleContinue = () => {
    if (city) {
      updateData({ city, neighborhood });
      nextStep();
    }
  };

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Where are you based?</h2>
        <p className={styles.stepDescription}>Help us show you relevant hangouts nearby</p>
      </div>

      <div className={styles.stepBody}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>City</label>
          <select
            className={styles.select}
            value={city}
            onChange={e => setCity(e.target.value)}
          >
            <option value="">Select your city</option>
            {cities.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Neighborhood (Optional)</label>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., Brooklyn, Mission District"
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
            maxLength={50}
          />
          <span className={styles.inputHint}>This helps us find hangouts near you</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={handleContinue} disabled={!city}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LocationStep;