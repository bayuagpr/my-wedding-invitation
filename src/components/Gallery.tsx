"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { galleryImages } from "@/data/galleryImages";
import { useImageCompression } from "@/lib/imageCompression";

export default function Gallery() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [compressedThumbnails, setCompressedThumbnails] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { compressImages } = useImageCompression();

  // Detect mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkIsMobile();

    // Listen for window resize
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle thumbnail compression based on device type
  useEffect(() => {
    const handleThumbnails = async () => {
      try {
        setIsCompressing(true);
        const thumbnailUrls = galleryImages.map(img => img.thumbnail);

        if (isMobile) {
          // Compress for mobile devices
          const compressed = await compressImages(thumbnailUrls, {
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.85,
            format: 'image/webp'
          });
          setCompressedThumbnails(compressed);
        } else {
          // Use original thumbnails for desktop
          setCompressedThumbnails(thumbnailUrls);
        }
      } catch (error) {
        console.error('Failed to process thumbnails:', error);
        // Fallback to original thumbnails
        setCompressedThumbnails(galleryImages.map(img => img.thumbnail));
      } finally {
        setIsCompressing(false);
      }
    };

    handleThumbnails();
  }, [isMobile, compressImages]); // Re-run when device type changes

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setOpenDialog(true);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-background" id="gallery">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-primary mb-8">
          OUR PRE-WEDDING<br />CELEBRATION
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer relative group"
              onClick={() => openLightbox(index)}
            >
              {isCompressing ? (
                <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Loading...</span>
                </div>
              ) : (
                <img
                  src={compressedThumbnails[index] || image.thumbnail}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-primary-foreground text-sm">View</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-primary/70 mt-8">
          Click image for preview
        </p>
      </div>

      {/* Lightbox Dialog */}
      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-5xl p-0 bg-transparent border-0">
            <DialogTitle asChild>
              <VisuallyHidden>Image Gallery - {galleryImages[currentIndex].alt}</VisuallyHidden>
            </DialogTitle>
            <div className="relative w-full">
              <div className="flex items-center justify-center h-[70vh]">
                <img
                  src={galleryImages[currentIndex].fullsize}
                  alt={galleryImages[currentIndex].alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/60 rounded-full p-2 transition-colors"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/60 rounded-full p-2 transition-colors"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
