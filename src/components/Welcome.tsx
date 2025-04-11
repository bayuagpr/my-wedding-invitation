"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

interface WelcomeProps {
  guestName?: string;
}

export default function Welcome({ guestName }: WelcomeProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenInvitation = () => {
    setIsOpen(false);
    // Trigger music when invitation is opened
    if ((window as any).toggleMusic) {
      (window as any).toggleMusic();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 overflow-hidden max-w-[95vw] sm:max-w-[80vw] md:max-w-5xl max-h-[90vh] bg-transparent border-0 shadow-none" onPointerDownOutside={(e) => e.preventDefault()} hideClose>
        <DialogTitle asChild>
          <VisuallyHidden>Welcome to Shahya and Bayu's Wedding Invitation</VisuallyHidden>
        </DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Left side - Wedding couple photo */}
          <div className="relative hidden md:block">
            <img
              src="https://ext.same-assets.com/2165661133/2979611549.jpeg"
              alt="Shahya and Bayu Pre-Wedding"
              className="object-cover h-full w-full rounded-l-lg"
            />
          </div>

          {/* Right side - Wedding invitation */}
          <div className="bg-[#10191e] p-8 flex flex-col justify-center items-center text-center rounded-lg md:rounded-l-none">
            <div className="my-8 animate-fade-in">
              <h2 className="text-sm uppercase tracking-[0.25em] text-gray-300 mb-4">THE WEDDING OF</h2>
              <h1 className="text-5xl md:text-6xl mb-2 text-white">Shahya & Bayu</h1>
              <p className="text-sm uppercase tracking-[0.15em] text-gray-300 mt-4">
                SATURDAY, 27TH JULY 2025
              </p>
            </div>

            <div className="mb-8 animate-fade-in" style={{animationDelay: "0.3s"}}>
              <h3 className="text-2xl mb-2 text-white">Dear {guestName || 'Guest'},</h3>
              <p className="text-sm text-gray-300">
                We apologize if there is any misspelling of name or title
              </p>
            </div>

            <Button
              onClick={handleOpenInvitation}
              className="welcome-btn rounded-none bg-transparent border border-white text-white px-8 py-6 hover:bg-white/10 animate-fade-in"
              style={{animationDelay: "0.6s"}}
            >
              LET'S OPEN
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
