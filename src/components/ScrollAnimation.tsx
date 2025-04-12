"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollAnimation({ children, className = "", delay = 0 }: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 100,
        scale: 0.95,
        rotateX: -10
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0
      } : { 
        opacity: 0, 
        y: 100,
        scale: 0.95,
        rotateX: -10
      }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateX: { duration: 0.5 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 