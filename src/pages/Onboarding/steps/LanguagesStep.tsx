import React, { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import styles from './Steps.module.css';

interface Language {
  code: string;
  name: string;
  level: string;
}

const commonLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'zh', name: 'Mandarin', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
];

const levels = [
  { value: 'native', label: 'Native', emoji: '⭐' },
  { value: 'fluent', label: 'Fluent', emoji: '💬' },
  { value: 'conversational', label: 'Conversational', emoji: '🗣️' },
  { value: 'basic', label: 'Basic', emoji: '📖' },
];

const LanguagesStep: React.FC = () => {
  const { data, updateData, nextStep } = useOnboarding();
  const [languages, setLanguages] = useState<Language[]>(data.languages);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const handleAddLanguage = () => {
    if (selectedLanguage && selectedLevel) {
      const langData = commonLanguages.find(l => l.code === selectedLanguage);
      if (langData && !languages.find(l => l.code === selectedLanguage)) {
        setLanguages([...languages, {
          code: selectedLanguage,
          name: langData.name,
          level: selectedLevel,
        }]);
        setSelectedLanguage('');
        setSelectedLevel('');
      }
    }
  };

  const handleRemoveLanguage = (code: string) => {
    setLanguages(languages.filter(l => l.code !== code));
  };

  const handleContinue = () => {
    if (languages.length > 0) {
      updateData({ languages });
      nextStep();
    }
  };

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>What languages do you speak?</h2>
        <p className={styles.stepDescription}>Connect with people who speak your language</p>
      </div>

      <div className={styles.stepBody}>
        {/* Added Languages */}
        {languages.length > 0 && (
          <div className={styles.languagesList}>
            {languages.map(lang => {
              const langData = commonLanguages.find(l => l.code === lang.code);
              const levelData = levels.find(l => l.value === lang.level);
              return (
                <div key={lang.code} className={styles.languageChip}>
                  <span className={styles.languageFlag}>{langData?.flag}</span>
                  <div className={styles.languageInfo}>
                    <span className={styles.languageName}>{lang.name}</span>
                    <span className={styles.languageLevel}>
                      {levelData?.emoji} {levelData?.label}
                    </span>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemoveLanguage(lang.code)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Language Section */}
        <div className={styles.addLanguageSection}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Select Language</label>
            <select
              className={styles.select}
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
            >
              <option value="">Choose a language</option>
              {commonLanguages
                .filter(l => !languages.find(lang => lang.code === l.code))
                .map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
            </select>
          </div>

          {selectedLanguage && (
            <div className={styles.levelGrid}>
              {levels.map(level => (
                <button
                  key={level.value}
                  className={`${styles.levelBtn} ${selectedLevel === level.value ? styles.selected : ''}`}
                  onClick={() => setSelectedLevel(level.value)}
                >
                  <span className={styles.levelEmoji}>{level.emoji}</span>
                  <span className={styles.levelLabel}>{level.label}</span>
                </button>
              ))}
            </div>
          )}

          {selectedLanguage && selectedLevel && (
            <button className={styles.addBtn} onClick={handleAddLanguage}>
              + Add Language
            </button>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryBtn}
          onClick={handleContinue}
          disabled={languages.length === 0}
        >
          Continue
        </button>
        <button className={styles.skipBtn} onClick={nextStep}>
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default LanguagesStep;