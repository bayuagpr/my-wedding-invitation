"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Groom & Bride", href: "#profile" },
  { name: "Wedding Event", href: "#weddingevent" },
  { name: "RSVP", href: "#rsvp" },
  { name: "Wedding Gift", href: "#weddinggift" },
  { name: "Prewedding Gallery", href: "#gallery" }
];

interface NavigationProps {
  isInvitationOpen: boolean;
}

export default function Navigation({ isInvitationOpen }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={cn(
          "hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-card/90 backdrop-blur-sm rounded-full px-6 py-3 border border-accent/20 shadow-lg",
          "transition-opacity duration-700 ease-in-out",
          isInvitationOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <ul className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm text-primary/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation Button */}
      <div 
        className={cn(
          "fixed md:hidden bottom-8 right-8 z-50",
          "transition-opacity duration-700 ease-in-out",
          isInvitationOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:foreground hover:bg-primary/90 h-9 bg-primary p-3 rounded-full shadow-lg border border-accent/20 flex items-center justify-center"
        >
          <span className="sr-only">Open menu</span>
          <MenuIcon isOpen={isOpen} />
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-md flex flex-col justify-center items-center",
          "transition-all duration-500 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center space-y-6 py-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-xl text-primary/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-primary/50 mt-8 mx-4 text-center">
          Please click one of the menu options above to navigate directly to your desired page.
        </p>
      </div>
    </>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-6 relative flex items-center justify-center">
      <span
        className={cn(
          "absolute w-6 h-0.5 bg-white transition-all duration-300",
          isOpen ? "rotate-45" : "-translate-y-2"
        )}
      />
      <span
        className={cn(
          "absolute w-6 h-0.5 bg-white transition-all duration-300",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={cn(
          "absolute w-6 h-0.5 bg-white transition-all duration-300",
          isOpen ? "-rotate-45" : "translate-y-2"
        )}
      />
    </div>
  );
}
