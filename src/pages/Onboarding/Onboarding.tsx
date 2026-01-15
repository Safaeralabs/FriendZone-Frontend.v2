import React from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import WelcomeStep from './steps/WelcomeStep';
import BasicInfoStep from './steps/BasicInfoStep';
import LocationStep from './steps/LocationStep';
import LanguagesStep from './steps/LanguagesStep';
import InterestsStep from './steps/InterestsStep';
import VibesStep from './steps/VibesStep';
import AvailabilityStep from './steps/AvailabilityStep';
import HangoutStyleStep from './steps/HangoutStyleStep';
import ReadyStep from './steps/ReadyStep';
import styles from './Onboarding.module.css';

const Onboarding: React.FC = () => {
  const { currentStep, totalSteps, prevStep } = useOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <BasicInfoStep />;
      case 3:
        return <LocationStep />;
      case 4:
        return <LanguagesStep />;
      case 5:
        return <InterestsStep />;
      case 6:
        return <VibesStep />;
      case 7:
        return <AvailabilityStep />;
      case 8:
        return <HangoutStyleStep />;
      case 9:
        return <ReadyStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      {currentStep > 1 && currentStep < totalSteps && (
        <div className={styles.progressBar}>
          <button className={styles.backBtn} onClick={prevStep}>
            ←
          </button>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${((currentStep - 1) / (totalSteps - 2)) * 100}%` }}
            />
          </div>
          <span className={styles.stepCounter}>
            {currentStep - 1}/{totalSteps - 2}
          </span>
        </div>
      )}

      {/* Step Content */}
      <div className={styles.content}>{renderStep()}</div>
    </div>
  );
};

export default Onboarding; // ← IMPORTANTE: Este debe estar al final