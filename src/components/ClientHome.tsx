"use client";

import { ReactLenis } from "lenis/react";
import { useState, useMemo } from "react";
import { ScrollProvider } from "@/hooks/useScrollContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import Welcome from "@/components/Welcome";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import QuranVerse from "@/components/QuranVerse";
import CoupleProfile from "@/components/CoupleProfile";
import EventDetails from "@/components/EventDetails";
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
  const { isMobile } = useWindowDimensions();

  // Optimize Lenis settings based on device
  const lenisOptions = useMemo(() => ({
    duration: isMobile ? 1.0 : 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical' as const,
    gestureDirection: 'vertical' as const,
    smooth: true,
    mouseMultiplier: isMobile ? 0.5 : 1,
    smoothTouch: isMobile ? false : true,
    touchMultiplier: 1.5,
    infinite: false,
  }), [isMobile]);

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
          <ScrollAnimation delay={0.5}>
            <Countdown />
          </ScrollAnimation>
          <ScrollAnimation delay={0.6}>
            <RSVP />
            <Wishes />
          </ScrollAnimation>
          <ScrollAnimation delay={0.7}>
            <WeddingGift />
          </ScrollAnimation>
          <Gallery />
        </main>}

        {isInvitationOpen && <Footer />}
      </ScrollProvider>
    </>
  );
}