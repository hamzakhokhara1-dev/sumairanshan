import React, { createContext, useContext, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface AnimationContextType {
  shouldReduceMotion: boolean;
  toggleReduceMotion: () => void;
  isUserPreferenceSet: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  shouldReduceMotion: false,
  toggleReduceMotion: () => {},
  isUserPreferenceSet: false,
});

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemReducedMotion = useReducedMotion();
  const [userReducedMotion, setUserReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const storedPref = localStorage.getItem('sns_reduce_motion');
    if (storedPref !== null) {
      setUserReducedMotion(storedPref === 'true');
    }
  }, []);

  const toggleReduceMotion = () => {
    const newValue = !(userReducedMotion ?? systemReducedMotion ?? false);
    setUserReducedMotion(newValue);
    localStorage.setItem('sns_reduce_motion', String(newValue));
  };

  const shouldReduceMotion = userReducedMotion ?? systemReducedMotion ?? false;

  return (
    <AnimationContext.Provider value={{ 
      shouldReduceMotion, 
      toggleReduceMotion, 
      isUserPreferenceSet: userReducedMotion !== null 
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationSettings = () => useContext(AnimationContext);