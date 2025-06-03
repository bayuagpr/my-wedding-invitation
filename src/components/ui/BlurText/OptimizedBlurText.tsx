import { motion, Transition } from "framer-motion";
import { useEffect, useRef, useState, useMemo, memo } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

type OptimizedBlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const OptimizedBlurText = memo<OptimizedBlurTextProps>(function OptimizedBlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
  stepDuration = 0.35,
}) {
  const { reduceMotion, enableHeavyAnimations, maxAnimationElements } = usePerformanceMode();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  // Optimize element splitting based on performance mode
  const elements = useMemo(() => {
    const splitElements = animateBy === "words" ? text.split(" ") : text.split("");
    
    // Limit elements on low-end devices
    if (!enableHeavyAnimations && splitElements.length > maxAnimationElements) {
      // Group elements to reduce DOM nodes
      const groupSize = Math.ceil(splitElements.length / maxAnimationElements);
      const grouped = [];
      for (let i = 0; i < splitElements.length; i += groupSize) {
        grouped.push(splitElements.slice(i, i + groupSize).join(animateBy === "words" ? " " : ""));
      }
      return grouped;
    }
    
    return splitElements;
  }, [text, animateBy, enableHeavyAnimations, maxAnimationElements]);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Simplified animations for reduced motion
  const simpleAnimation = useMemo(() => ({
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.5, delay: delay / 1000 }
  }), [inView, delay]);

  // Complex animations for full experience
  const complexAnimation = useMemo(() => ({
    initial: {
      filter: "blur(10px)",
      opacity: 0,
      y: direction === "top" ? -50 : 50,
    },
    animate: inView ? {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
    } : {
      filter: "blur(10px)",
      opacity: 0,
      y: direction === "top" ? -50 : 50,
    }
  }), [inView, direction]);

  if (reduceMotion) {
    return (
      <motion.p
        ref={ref}
        className={`blur-text ${className}`}
        {...simpleAnimation}
        onAnimationComplete={onAnimationComplete}
      >
        {text}
      </motion.p>
    );
  }

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const spanTransition: Transition = {
          duration: stepDuration,
          delay: (index * delay) / 1000,
          ease: [0.25, 0.1, 0.25, 1],
        };

        return (
          <motion.span
            key={index}
            {...complexAnimation}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            style={{
              display: "inline-block",
              willChange: enableHeavyAnimations ? "transform, filter, opacity" : "opacity",
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
});

export default OptimizedBlurText;
