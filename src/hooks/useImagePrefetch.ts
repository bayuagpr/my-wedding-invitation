import { useEffect } from 'react';

const CRITICAL_IMAGES = [
  'https://res.cloudinary.com/dizje8tlf/image/upload/v1748856434/OSM-11_b8hidc.jpg', // Header
  'https://res.cloudinary.com/dizje8tlf/image/upload/v1748856443/OSM-48_hejhs5.jpg', // Welcome
  'https://res.cloudinary.com/dizje8tlf/image/upload/v1748900273/OSM-3-rev-2_sfuw2j.jpg', // Bride Profile 1
  'https://res.cloudinary.com/dizje8tlf/image/upload/v1748856431/OSM-8_ucmzab.jpg', // Groom Profile 1
  'https://res.cloudinary.com/dizje8tlf/image/upload/v1748856432/OSM-5_fq3ttw.jpg', // Bride Profile 2
  'https://res.cloudinary.com/dizje8tlf/image/upload/v1748900273/OSM-10-rev-2_un86ns.jpg', // Groom Profile 2
  'https://res.cloudinary.com/dizje8tlf/image/upload/v1748856445/OSM-51_jdgbz8.jpg', // Quran Verse
];

export function useImagePrefetch() {
  useEffect(() => {
    // Prefetch images using Image constructor
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
}

export function prefetchImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function prefetchImages(urls: string[]): Promise<void[]> {
  return Promise.all(urls.map(prefetchImage));
}
