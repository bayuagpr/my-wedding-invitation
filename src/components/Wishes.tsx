"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Wish = {
  name: string;
  message: string;
  date: string;
};

const wishes: Wish[] = [
  {
    name: "zada",
    message: "AAAAK congrats aunty & oom! zada so happy for u both, semoga selalu diberikan kesehatan kebahagiaan kelancaran dalam setiap langkahnya bersama selamanya aamiin!! love, zada",
    date: "11 Apr 2025"
  },
  {
    name: "Nuel",
    message: "Semoga lancarr yaa Tuhan berkati kaliaann",
    date: "11 Apr 2025"
  },
  {
    name: "agna",
    message: "AAAAAAAA selamat kak jo dan kak ayu! Lucu banget foto-fotonya, lancar-lancar sampai hari H ya<3",
    date: "11 Apr 2025"
  },
  {
    name: "Zulfikar & mantan",
    message: "ga sabar! Semoga menjadi keluarga bahagia! Lancar cuy",
    date: "11 Apr 2025"
  },
  {
    name: "Ken Wisnu dan Arunarwi",
    message: "Semoga bisa menjadi pasangan yg harmonis, rukun, tentram dan damai di dalam Tuhan",
    date: "11 Apr 2025"
  }
];

export default function Wishes() {
  const [currentWishIndex, setCurrentWishIndex] = useState(0);

  const nextWish = () => {
    setCurrentWishIndex((prev) => (prev === wishes.length - 1 ? 0 : prev + 1));
  };

  const prevWish = () => {
    setCurrentWishIndex((prev) => (prev === 0 ? wishes.length - 1 : prev - 1));
  };

  const currentWish = wishes[currentWishIndex];

  return (
    <section className="pt-10 pb-20 bg-[#10191e]" id="wishes">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-white mb-12">
          Wishes
        </h2>

        <div className="max-w-2xl mx-auto p-8 bg-[#0c1419] relative rounded-lg">
          {/* Navigation buttons */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full left-0 px-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevWish}
              className="bg-transparent border-white/30 text-white hover:bg-white/10 h-10 w-10 rounded-full"
            >
              <span className="sr-only">Previous wish</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextWish}
              className="bg-transparent border-white/30 text-white hover:bg-white/10 h-10 w-10 rounded-full"
            >
              <span className="sr-only">Next wish</span>
              <ChevronRightIcon />
            </Button>
          </div>

          {/* Wish content */}
          <div className="text-center px-10">
            <h3 className="text-xl text-white font-bold mb-4">{currentWish.name}</h3>
            <p className="text-white/80 italic mb-6">"{currentWish.message}"</p>
            <p className="text-sm text-white/60">{currentWish.date}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
