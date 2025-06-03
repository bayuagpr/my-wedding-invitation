import React, { useRef, useLayoutEffect, useState, memo, useCallback } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { useScrollContext } from "@/hooks/useScrollContext";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface OptimizedScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth(ref: React.RefObject<HTMLElement>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    
    const resizeObserver = new ResizeObserver(updateWidth);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [ref]);

  return width;
}

const VelocityText = memo<{
  children: React.ReactNode;
  baseVelocity: number;
  className: string;
  damping: number;
  stiffness: number;
  numCopies: number;
  scrollerClassName?: string;
  scrollerStyle?: React.CSSProperties;
}>(function VelocityText({
  children,
  baseVelocity,
  className,
  damping,
  stiffness,
  numCopies,
  scrollerClassName,
  scrollerStyle,
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScrollContext();
  const { throttleScrollEvents } = usePerformanceMode();
  
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping,
    stiffness,
  });
  
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, throttleScrollEvents ? 2 : 5],
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const wrap = useCallback((min: number, max: number, v: number): number => {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }, []);

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame(useCallback((t, delta) => {
    if (throttleScrollEvents && t % 2 !== 0) return; // Skip every other frame on mobile
    
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  }, [baseVelocity, velocityFactor, throttleScrollEvents]));

  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span
        className={`flex-shrink-0 ${className}`}
        key={i}
        ref={i === 0 ? copyRef : null}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.div
      className={`${scrollerClassName} flex whitespace-nowrap text-center text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`}
      style={{ x, willChange: "transform", ...scrollerStyle }}
    >
      {spans}
    </motion.div>
  );
});

export const OptimizedScrollVelocity = memo<OptimizedScrollVelocityProps>(function OptimizedScrollVelocity({
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) {
  const { isMobile } = useWindowDimensions();
  const { enableHeavyAnimations } = usePerformanceMode();
  
  // Reduce copies on mobile for better performance
  const numCopies = isMobile ? 3 : enableHeavyAnimations ? 6 : 4;
  
  // Reduce velocity on mobile
  const adjustedVelocity = isMobile ? velocity * 0.5 : velocity;

  if (!enableHeavyAnimations) {
    // Fallback to simple scrolling text without velocity effects
    return (
      <section>
        {texts.map((text: string, index: number) => (
          <div
            key={index}
            className={`${parallaxClassName} relative overflow-hidden`}
            style={parallaxStyle}
          >
            <div
              className={`${scrollerClassName} flex whitespace-nowrap text-center text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem] animate-scroll`}
              style={scrollerStyle}
            >
              {Array.from({ length: numCopies }, (_, i) => (
                <span key={i} className={`flex-shrink-0 ${className}`}>
                  {text}&nbsp;
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section>
      {texts.map((text: string, index: number) => (
        <div
          key={index}
          className={`${parallaxClassName} relative overflow-hidden`}
          style={parallaxStyle}
        >
          <VelocityText
            className={className}
            baseVelocity={index % 2 !== 0 ? -adjustedVelocity : adjustedVelocity}
            damping={damping}
            stiffness={stiffness}
            numCopies={numCopies}
            scrollerClassName={scrollerClassName}
            scrollerStyle={scrollerStyle}
          >
            {text}&nbsp;
          </VelocityText>
        </div>
      ))}
    </section>
  );
});

export default OptimizedScrollVelocity;
