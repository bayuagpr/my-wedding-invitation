"use client";

import { useState, useEffect, useMemo } from 'react';

export default function Countdown() {
  const weddingDate = useMemo(() => new Date('2025-07-27T08:00:00'), []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +weddingDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="py-16 bg-[#10191e]" id="countdown">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-white mb-10">
          COUNTING DOWN TO<br />OUR SPECIAL MOMENT
        </h2>

        <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-3xl mx-auto">
          <CountdownItem value={timeLeft.days} label="Days" />
          <CountdownItem value={timeLeft.hours} label="Hours" />
          <CountdownItem value={timeLeft.minutes} label="Minutes" />
          <CountdownItem value={timeLeft.seconds} label="Seconds" />
        </div>

        <div className="flex justify-center mt-10 space-x-4">
          <a
            href="https://calendar.google.com/calendar/u/0?cid=NzA4NmYzMjU0M2YyYWUwYWZlOWI5ZTAyZmYwZDFkMTgwNDMzM2FkYjhjNjNjOTU5ZTUwNDM2MmZjZmI1Yjc3OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent border border-white text-white px-4 py-2 rounded-none hover:bg-white/10 transition-colors text-sm uppercase tracking-wider"
          >
            save the date
          </a>
          <a
            href="https://calendar.google.com/calendar/ical/7086f32543f2ae0afe9b9e02ff0d1d1804333adb8c63c959e504362fcfb5b779%40group.calendar.google.com/public/basic.ics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent border border-white text-white px-4 py-2 rounded-none hover:bg-white/10 transition-colors text-sm uppercase tracking-wider"
          >
            save the date
          </a>
        </div>
      </div>
    </section>
  );
}

function CountdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-5xl text-white mb-2 font-light">
        {value < 10 ? `0${value}` : value}
      </div>
      <div className="text-sm text-white/70 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}
