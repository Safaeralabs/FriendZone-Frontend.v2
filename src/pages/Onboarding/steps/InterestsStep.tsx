import React, { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import styles from './Steps.module.css';

const interestCategories = [
  {
    category: 'Food & Drinks',
    interests: [
      { value: 'coffee', label: 'Coffee', emoji: '☕' },
      { value: 'brunch', label: 'Brunch', emoji: '🥐' },
      { value: 'foodie', label: 'Foodie', emoji: '🍜' },
      { value: 'cocktails', label: 'Cocktails', emoji: '🍸' },
      { value: 'wine', label: 'Wine', emoji: '🍷' },
      { value: 'cooking', label: 'Cooking', emoji: '👨‍🍳' },
    ],
  },
  {
    category: 'Active & Sports',
    interests: [
      { value: 'gym', label: 'Gym', emoji: '💪' },
      { value: 'yoga', label: 'Yoga', emoji: '🧘' },
      { value: 'running', label: 'Running', emoji: '🏃' },
      { value: 'hiking', label: 'Hiking', emoji: '🥾' },
      { value: 'cycling', label: 'Cycling', emoji: '🚴' },
      { value: 'sports', label: 'Sports', emoji: '⚽' },
    ],
  },
  {
    category: 'Arts & Culture',
    interests: [
      { value: 'music', label: 'Music', emoji: '🎵' },
      { value: 'concerts', label: 'Concerts', emoji: '🎤' },
      { value: 'museums', label: 'Museums', emoji: '🎨' },
      { value: 'theater', label: 'Theater', emoji: '🎭' },
      { value: 'photography', label: 'Photography', emoji: '📸' },
      { value: 'art', label: 'Art', emoji: '🖼️' },
    ],
  },
  {
    category: 'Entertainment',
    interests: [
      { value: 'movies', label: 'Movies', emoji: '🎬' },
      { value: 'gaming', label: 'Gaming', emoji: '🎮' },
      { value: 'board-games', label: 'Board Games', emoji: '🎲' },
      { value: 'clubbing', label: 'Clubbing', emoji: '💃' },
      { value: 'karaoke', label: 'Karaoke', emoji: '🎤' },
      { value: 'comedy', label: 'Comedy', emoji: '😂' },
    ],
  },
  {
    category: 'Outdoors & Nature',
    interests: [
      { value: 'beach', label: 'Beach', emoji: '🏖️' },
      { value: 'camping', label: 'Camping', emoji: '🏕️' },
      { value: 'nature', label: 'Nature', emoji: '🌲' },
      { value: 'animals', label: 'Animals', emoji: '🐕' },
      { value: 'gardening', label: 'Gardening', emoji: '🌱' },
      { value: 'adventure', label: 'Adventure', emoji: '🗺️' },
    ],
  },
  {
    category: 'Learning & Growth',
    interests: [
      { value: 'reading', label: 'Reading', emoji: '📚' },
      { value: 'languages', label: 'Languages', emoji: '🗣️' },
      { value: 'tech', label: 'Tech', emoji: '💻' },
      { value: 'entrepreneurship', label: 'Business', emoji: '💼' },
      { value: 'meditation', label: 'Meditation', emoji: '🧘‍♀️' },
      { value: 'volunteering', label: 'Volunteering', emoji: '🤝' },
    ],
  },
];

const InterestsStep: React.FC = () => {
  const { data, updateData, nextStep } = useOnboarding();
  const [interests, setInterests] = useState<string[]>(data.interests);

  const toggleInterest = (value: string) => {
    if (interests.includes(value)) {
      setInterests(interests.filter(i => i !== value));
    } else {
      setInterests([...interests, value]);
    }
  };

  const handleContinue = () => {
    if (interests.length >= 3) {
      updateData({ interests });
      nextStep();
    }
  };

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>What are you into?</h2>
        <p className={styles.stepDescription}>
          Pick at least 3 interests to help us match you with the right people
        </p>
        <div className={styles.progressIndicator}>
          <span className={styles.progressCount}>{interests.length}</span>
          <span className={styles.progressText}>/ 3 minimum</span>
        </div>
      </div>

      <div className={styles.stepBody}>
        <div className={styles.interestsContainer}>
          {interestCategories.map(category => (
            <div key={category.category} className={styles.interestCategory}>
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              <div className={styles.interestsGrid}>
                {category.interests.map(interest => (
                  <button
                    key={interest.value}
                    className={`${styles.interestBtn} ${interests.includes(interest.value) ? styles.selected : ''}`}
                    onClick={() => toggleInterest(interest.value)}
                  >
                    <span className={styles.interestEmoji}>{interest.emoji}</span>
                    <span className={styles.interestLabel}>{interest.label}</span>
                    {interests.includes(interest.value) && (
                      <span className={styles.checkmark}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryBtn}
          onClick={handleContinue}
          disabled={interests.length < 3}
        >
          Continue ({interests.length} selected)
        </button>
      </div>
    </div>
  );
};

export default InterestsStep;