'use client';

import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'motion/react';
import { useEffect } from 'react';

export function useAnimateInView(threshold = 0.2) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
}
