"use client";

import { useState, useEffect } from 'react';

interface PerformanceSettings {
  reduceMotion: boolean;
  enableHeavyAnimations: boolean;
  maxAnimationElements: number;
  throttleScrollEvents: boolean;
}

export function usePerformanceMode(): PerformanceSettings {
  const [settings, setSettings] = useState<PerformanceSettings>(() => ({
    reduceMotion: false,
    enableHeavyAnimations: true,
    maxAnimationElements: 50,
    throttleScrollEvents: false
  }));

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Check device capabilities
    const isMobile = window.innerWidth < 768;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4;
    const hasSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || 
                             (navigator as any).connection?.effectiveType === '2g';

    const shouldReduceMotion = mediaQuery.matches || isMobile || isLowEndDevice || hasSlowConnection;

    setSettings({
      reduceMotion: mediaQuery.matches,
      enableHeavyAnimations: !shouldReduceMotion,
      maxAnimationElements: isMobile ? 20 : 50,
      throttleScrollEvents: isMobile || isLowEndDevice
    });

    const handleChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({
        ...prev,
        reduceMotion: e.matches
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return settings;
}
