import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingData {
  name: string;
  avatar: string; // Iniciales o foto
  city: string;
  neighborhood: string;
  languages: { code: string; name: string; level: string }[];
  interests: string[];
  vibes: string[];
  availability: string[];
  groupSize: string;
  activityTypes: string[];
}

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const totalSteps = 9;
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    avatar: '',
    city: '',
    neighborhood: '',
    languages: [],
    interests: [],
    vibes: [],
    availability: [],
    groupSize: 'small',
    activityTypes: [],
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const completeOnboarding = () => {
    // Save to user profile
    console.log('Onboarding complete:', data);
    // Navigate to main app
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        data,
        updateData,
        nextStep,
        prevStep,
        goToStep,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};