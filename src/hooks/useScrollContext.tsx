"use client";

import { createContext, useContext, useRef, ReactNode } from 'react';
import { useScroll, MotionValue } from 'framer-motion';

interface ScrollContextType {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const { scrollY, scrollYProgress } = useScroll();

  return (
    <ScrollContext.Provider value={{ scrollY, scrollYProgress }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
}

// Hook for component-specific scroll with target
export function useTargetScroll(target: React.RefObject<HTMLElement>, offset: [string, string] = ['start start', 'end start']) {
  const { scrollYProgress } = useScroll({
    target,
    offset
  });
  return { scrollYProgress };
}
