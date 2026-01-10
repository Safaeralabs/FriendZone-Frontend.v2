import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Onboarding.module.css';

const interests = ['Coffee', 'Running', 'Tech', 'Art', 'Music', 'Food', 'Books', 'Photography', 'Travel', 'Sports'];
const vibes = ['Chill', 'Adventurous', 'Curious', 'Active', 'Creative', 'Thoughtful', 'Social', 'Spontaneous'];
const availability = ['Weekday mornings', 'Weekday evenings', 'Weekend mornings', 'Weekend afternoons', 'Late nights'];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const toggleSelection = (item: string, selected: string[], setter: (items: string[]) => void) => {
    if (selected.includes(item)) {
      setter(selected.filter(i => i !== item));
    } else {
      setter([...selected, item]);
    }
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/');
    }
  };

  const canContinue = () => {
    if (step === 1) return selectedInterests.length >= 3;
    if (step === 2) return selectedVibes.length >= 2;
    if (step === 3) return selectedAvailability.length >= 1;
    return false;
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        <p className={styles.stepIndicator}>Step {step} of 3</p>
      </div>

      <div className={styles.content}>
        {step === 1 && (
          <>
            <h1 className={styles.title}>What are you into?</h1>
            <p className={styles.subtitle}>Pick at least 3 interests so we can match you with the right people</p>
            <div className={styles.options}>
              {interests.map(interest => (
                <button
                  key={interest}
                  className={`${styles.option} ${selectedInterests.includes(interest) ? styles.selected : ''}`}
                  onClick={() => toggleSelection(interest, selectedInterests, setSelectedInterests)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className={styles.title}>What's your vibe?</h1>
            <p className={styles.subtitle}>Choose at least 2 that feel like you</p>
            <div className={styles.options}>
              {vibes.map(vibe => (
                <button
                  key={vibe}
                  className={`${styles.option} ${selectedVibes.includes(vibe) ? styles.selected : ''}`}
                  onClick={() => toggleSelection(vibe, selectedVibes, setSelectedVibes)}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className={styles.title}>When are you free?</h1>
            <p className={styles.subtitle}>This helps us show you hangouts at the right times</p>
            <div className={styles.options}>
              {availability.map(time => (
                <button
                  key={time}
                  className={`${styles.option} ${selectedAvailability.includes(time) ? styles.selected : ''}`}
                  onClick={() => toggleSelection(time, selectedAvailability, setSelectedAvailability)}
                >
                  {time}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.continueBtn}
          onClick={handleContinue}
          disabled={!canContinue()}
        >
          {step === 3 ? 'Get started' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;