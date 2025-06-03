import { useCallback } from 'react';

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export class ImageCompressor {
  static async compressImage(
    imageUrl: string,
    options: CompressionOptions = {}
  ): Promise<string> {
    const {
      maxWidth = 400,
      maxHeight = 400,
      quality = 0.8,
      format = 'image/jpeg'
    } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          // Calculate new dimensions while maintaining aspect ratio
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL(format, quality);
          
          resolve(compressedDataUrl);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = imageUrl;
    });
  }

  static async compressMultipleImages(
    imageUrls: string[],
    options: CompressionOptions = {}
  ): Promise<string[]> {
    const promises = imageUrls.map(url => 
      this.compressImage(url, options).catch(() => url) // Fallback to original URL on error
    );
    
    return Promise.all(promises);
  }
}

// Hook for using compressed images
export function useImageCompression() {
  const compressImage = useCallback(async (
    imageUrl: string,
    options?: CompressionOptions
  ): Promise<string> => {
    try {
      return await ImageCompressor.compressImage(imageUrl, options);
    } catch (error) {
      console.warn('Image compression failed, using original:', error);
      return imageUrl;
    }
  }, []);

  const compressImages = useCallback(async (
    imageUrls: string[],
    options?: CompressionOptions
  ): Promise<string[]> => {
    try {
      return await ImageCompressor.compressMultipleImages(imageUrls, options);
    } catch (error) {
      console.warn('Batch image compression failed, using originals:', error);
      return imageUrls;
    }
  }, []);

  return { compressImage, compressImages };
}
