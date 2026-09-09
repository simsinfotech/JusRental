'use client';

import { useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';

export function useScrollProgress(): {
  ref: React.RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
} {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return { ref, progress: scrollYProgress, opacity };
}
