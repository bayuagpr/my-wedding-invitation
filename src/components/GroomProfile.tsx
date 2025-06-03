import { motion, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import { useTargetScroll } from "@/hooks/useScrollContext";
import { useParallaxDistance } from "@/hooks/useWindowDimensions";

const GroomProfile = memo(function GroomProfile() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useTargetScroll(container);
  const parallaxDistance = useParallaxDistance();

  const y = useTransform(scrollYProgress, [0, 1], ["0px", parallaxDistance]);
  return (
    <div ref={container}>
      <motion.div
        className="relative w-full h-[420px] md:h-[700px] overflow-hidden bg-no-repeat bg-[1%_15%] bg-cover md:bg-[size:150%]"
        style={{
          y,
          backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748856431/OSM-8_ucmzab.jpg)`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0"></div>

        {/* Content overlay */}
        <div className="relative w-[250px] md:w-full z-10 h-full flex flex-col justify-start md:justify-center items-start text-left text-primary pt-10 px-10 md:px-10 lg:px-20 xl:px-40">
          <h3 className="text-md md:text-2xl lg:text-3xl mb-1 md:mb-3">The Groom</h3>
          <h2 className="text-lg md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">Bayu Agung Prakoso</h2>
          <p className="text-md md:text-lg lg:text-xl md:mb-2">Son of</p>
          <p className="text-md md:text-lg lg:text-xl mb-4 md:mb-6">Bapak Joko Subagyo & Ibu Canti Suhesti (Almh)</p>
          <a
            href="https://www.instagram.com/bayu.ag"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-primary/80 hover:text-primary transition-colors text-sm md:text-lg"
          >
            @bayu.ag
          </a>
        </div>
      </motion.div>
      <div
        className="relative w-full h-96 md:h-[700px] overflow-hidden bg-cover bg-no-repeat bg-[50%_30%]"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748900273/OSM-10-rev-2_un86ns.jpg)`,
        }}
      ></div>
    </div>
  );
});

export default GroomProfile;
