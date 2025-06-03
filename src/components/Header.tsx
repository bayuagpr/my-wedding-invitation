import BlurText from "@/components/ui/BlurText/BlurText"
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function Header() {
  const container = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"])

  return (
    <header ref={container} className="relative h-screen flex justify-center items-start 2xl:items-center md:justify-start bg-background overflow-hidden" id="home">
      <motion.div
        className="absolute inset-0 bg-cover bg-[55%_10%] md:bg-center"
        style={{
          y,
          backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748856434/OSM-11_b8hidc.jpg)`,
          // filter: 'brightness(0.5)'
        }}
      />

      <div className="relative z-10 text-center md:text-left 2xl:pl-40 md:pl-20 2xl:mb-20 md:mt-10 mt-12">
        <BlurText
          text="THE WEDDING OF"
          className="text-lg md:text-xl 2xl:text-2xl text-primary mb-4 uppercase tracking-widest"
          delay={100}
          animateBy="words"
          direction="top"
        />
        <BlurText
          text="Bayu & Shahya"
          className="text-5xl md:text-7xl text-primary mb-6 font-light"
          delay={150}
          animateBy="words"
          direction="top"
        />
        <BlurText
          text="Sunday, 27th July 2025"
          className="text-md md:text-lg 2xl:text-xl text-primary uppercase tracking-wider"
          delay={200}
          animateBy="words"
          direction="top"
        />
      </div>
    </header>
  );
}
