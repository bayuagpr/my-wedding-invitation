"use client";

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Music, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.muted = false; // Unmute when user clicks play
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Expose toggleMusic function to window object
  useEffect(() => {
    (window as any).toggleMusic = toggleMusic;
    return () => {
      delete (window as any).toggleMusic;
    };
  }, [isPlaying]);

  return (
    <>
      <audio id="bgMusic" loop>
        <source src="/music/background-music.mp3" type="audio/mpeg" />
      </audio>
      <Button
        onClick={toggleMusic}
        className="fixed bottom-24 right-8 z-50 bg-[#10191e] p-3 rounded-full shadow-lg border border-white/10"
      >
        {isPlaying ? <VolumeX className="h-5 w-5 text-white" /> : <Music className="h-5 w-5 text-white" />}
      </Button>
    </>
  );
} 