"use client";

import { useState } from "react";
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
  
  return (
    <>
      <Welcome 
        guestName={guestName} 
        onOpenInvitation={() => setIsInvitationOpen(true)} 
      />
      <Navigation isInvitationOpen={isInvitationOpen} />
      <BackgroundMusic />

      <main>
          <Header />
        <ScrollAnimation delay={0.2}>
          <QuranVerse />
        </ScrollAnimation>
        <ScrollAnimation delay={0.3}>
          <CoupleProfile />
        </ScrollAnimation>
        <ScrollAnimation delay={0.4}>
          <EventDetails />
        </ScrollAnimation>
        <ScrollAnimation delay={0.5}>
          <Countdown />
        </ScrollAnimation>
        <ScrollAnimation delay={0.6}>
          <RSVP />
        </ScrollAnimation>
        <ScrollAnimation delay={0.7}>
          <WeddingGift />
        </ScrollAnimation>
        <ScrollAnimation delay={0.8}>
          <Gallery />
        </ScrollAnimation>
      </main>

      <Footer />
    </>
  );
} 