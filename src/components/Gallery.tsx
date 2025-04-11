"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

const galleryImages = [
  {
    id: "img1",
    thumbnail: "https://ext.same-assets.com/2165661133/4015499809.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/4015499809.jpeg",
    alt: "Shahya and Bayu Pre-wedding 1"
  },
  {
    id: "img2",
    thumbnail: "https://ext.same-assets.com/2165661133/2460535429.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/2460535429.jpeg",
    alt: "Shahya and Bayu Pre-wedding 2"
  },
  {
    id: "img3",
    thumbnail: "https://ext.same-assets.com/2165661133/1996505328.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/1996505328.jpeg",
    alt: "Shahya and Bayu Pre-wedding 3"
  },
  {
    id: "img4",
    thumbnail: "https://ext.same-assets.com/2165661133/1518935124.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/1518935124.jpeg",
    alt: "Shahya and Bayu Pre-wedding 4"
  },
  {
    id: "img5",
    thumbnail: "https://ext.same-assets.com/2165661133/1630300976.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/1630300976.jpeg",
    alt: "Shahya and Bayu Pre-wedding 5"
  },
  {
    id: "img6",
    thumbnail: "https://ext.same-assets.com/2165661133/2107412509.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/2107412509.jpeg",
    alt: "Shahya and Bayu Pre-wedding 6"
  },
  {
    id: "img7",
    thumbnail: "https://ext.same-assets.com/2165661133/2625518234.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/2625518234.jpeg",
    alt: "Shahya and Bayu Pre-wedding 7"
  },
  {
    id: "img8",
    thumbnail: "https://ext.same-assets.com/2165661133/1166855498.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/1166855498.jpeg",
    alt: "Shahya and Bayu Pre-wedding 8"
  },
  {
    id: "img9",
    thumbnail: "https://ext.same-assets.com/2165661133/795193195.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/795193195.jpeg",
    alt: "Shahya and Bayu Pre-wedding 9"
  },
  {
    id: "img10",
    thumbnail: "https://ext.same-assets.com/2165661133/2745305562.jpeg",
    fullsize: "https://ext.same-assets.com/2165661133/2745305562.jpeg",
    alt: "Shahya and Bayu Pre-wedding 10"
  }
];

export default function Gallery() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
    <section className="py-20 bg-[#10191e]" id="gallery">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-white mb-8">
          OUR PRE-WEDDING<br />CELEBRATION
        </h2>

        <h3 className="text-3xl text-center text-white mb-12">
          Shahya & Bayu
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer relative group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.thumbnail}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm">View</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/70 mt-8">
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
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
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
