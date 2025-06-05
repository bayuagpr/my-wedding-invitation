"use client";

import { ReactLenis } from "lenis/react";
import { useState } from "react";
import { ScrollProvider } from "@/hooks/useScrollContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import Welcome from "@/components/Welcome";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import QuranVerse from "@/components/QuranVerse";
import CoupleProfile from "@/components/CoupleProfile";
import EventDetails from "@/components/EventDetails";
import Video from "@/components/Video";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import Wishes from "@/components/Wishes";
import DressCode from "@/components/DressCode";
import WeddingGift from "@/components/WeddingGift";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";
import ScrollAnimation from "@/components/ScrollAnimation";

interface ClientHomeProps {
  searchParams: { guest?: string };
}

export default function ClientHome({ searchParams }: ClientHomeProps) {
  const guestName = searchParams.guest ? decodeURIComponent(searchParams.guest) : 'Guest';
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  // Optimize Lenis settings based on device
  const lenisOptions = {
    duration: 0.6,  // Faster mobile response
    easing: (t: number) => t,
    direction: 'vertical' as const,
    gestureDirection: 'vertical' as const,
    smooth: true,
    mouseMultiplier: 0.3,  // Further reduce mobile sensitivity
    smoothTouch: false,  // Keep disabled for mobile performance
    touchMultiplier: 0.8,  // Reduce mobile touch sensitivity
    infinite: false,
  };

  return (
    <>
      <ReactLenis root options={lenisOptions} />
      <ScrollProvider>
        <Welcome
          guestName={guestName}
          onOpenInvitation={() => setIsInvitationOpen(true)}
        />
        <Navigation isInvitationOpen={isInvitationOpen} />
        <BackgroundMusic />

        {isInvitationOpen && <main>
          <Header />
          <QuranVerse />
          <CoupleProfile />
          <ScrollAnimation delay={0.4}>
            <EventDetails />
          </ScrollAnimation>
          <div
            className="relative w-full h-96 md:h-[700px] overflow-hidden bg-cover bg-no-repeat bg-[50%_30%]"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1749111531/OSM-43-bw_fymlha.jpg)`,
            }}
          ></div>
          <ScrollAnimation delay={0.5}>
            <Countdown />
          </ScrollAnimation>
          <ScrollAnimation delay={0.6}>
            <RSVP guestName={guestName} />
            <Wishes />
          </ScrollAnimation>
          <div
            className="relative w-full h-96 md:h-[700px] overflow-hidden bg-cover bg-no-repeat bg-[50%_60%]"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1749111529/OSM-70-bw_hfdixg.jpg)`,
            }}
          ></div>
          <ScrollAnimation delay={0.7}>
            <WeddingGift />
          </ScrollAnimation>
          <Gallery />
        </main>}

        {isInvitationOpen && <Footer />}
        {isInvitationOpen && <div className="text-center mb-24 rounded-lg p-4 bg-background text-white">
          <h3 className="text-lg">made by bayu</h3>
          <h3 className="text-md">(yes you're correct, the groom made this website 😅)</h3>
        </div>}
      </ScrollProvider>
    </>
  );
}