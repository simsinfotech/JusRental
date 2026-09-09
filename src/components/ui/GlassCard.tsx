'use client';

import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'motion/react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  hover?: boolean;
  gradient?: boolean;
}

export function GlassCard({
  children,
  hover = true,
  gradient = false,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card p-6',
        hover && 'hover-glow',
        gradient && 'gradient-border',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
