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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-[#10191e]/90 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
        <ul className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation Button */}
      <div className="fixed md:hidden bottom-8 right-8 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#10191e] p-3 rounded-full shadow-lg border border-white/10"
        >
          <span className="sr-only">Open menu</span>
          <MenuIcon isOpen={isOpen} />
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden bg-[#10191e]/95 backdrop-blur-md flex flex-col justify-center items-center",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      >
        <ul className="flex flex-col items-center space-y-6 py-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-xl text-white/80 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-white/50 mt-8">
          Please click one of the menu options above to navigate directly to your desired page.
        </p>
      </div>
    </>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-6 relative">
      <span
        className={cn(
          "absolute w-6 h-0.5 bg-white transition-all duration-300",
          isOpen ? "top-3 rotate-45" : "top-2"
        )}
      />
      <span
        className={cn(
          "absolute w-6 h-0.5 bg-white top-3 transition-all duration-300",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={cn(
          "absolute w-6 h-0.5 bg-white transition-all duration-300",
          isOpen ? "top-3 -rotate-45" : "top-4"
        )}
      />
    </div>
  );
}
