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

export default async function Home({ searchParams }: { searchParams: { guest?: string } }) {
  const params = await searchParams;
  const guestName = params.guest ? decodeURIComponent(params.guest) : 'Guest';
  
  return (
    <>
      <Welcome guestName={guestName} />
      <Navigation />
      <BackgroundMusic />

      <main>
        <Header />
        <QuranVerse />
        <CoupleProfile />
        <EventDetails />
        <Countdown />
        <RSVP />
        <WeddingGift />
        <Gallery />
      </main>

      <Footer />
    </>
  );
}
