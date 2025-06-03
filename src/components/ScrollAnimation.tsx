"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, memo, useMemo } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ScrollAnimation = memo(function ScrollAnimation({
  children,
  className = "",
  delay = 0
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const { reduceMotion, enableHeavyAnimations } = usePerformanceMode();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const animations = useMemo(() => {
    if (reduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : { opacity: 0 },
        transition: { duration: 0.5, delay }
      };
    }

    if (!enableHeavyAnimations) {
      return {
        initial: { opacity: 0, y: 50 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
        transition: {
          duration: 0.6,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      };
    }

    return {
      initial: {
        opacity: 0,
        y: 100,
        scale: 0.95,
        rotateX: -10
      },
      animate: isInView ? {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0
      } : {
        opacity: 0,
        y: 100,
        scale: 0.95,
        rotateX: -10
      },
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateX: { duration: 0.5 }
      }
    };
  }, [isInView, delay, reduceMotion, enableHeavyAnimations]);

  return (
    <motion.div
      ref={ref}
      {...animations}
      className={className}
      style={{ willChange: enableHeavyAnimations ? "transform, opacity" : "opacity" }}
    >
      {children}
    </motion.div>
  );
});

export default ScrollAnimation;