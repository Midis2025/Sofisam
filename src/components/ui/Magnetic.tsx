'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Magnetic pull.
 *
 * While the pointer is inside the element, it leans a few pixels toward it and
 * springs back on exit. Deliberately shallow — the effect should register as
 * responsiveness rather than as an animation.
 *
 * Dropped entirely under reduced motion and on touch, where there is no hover
 * state for it to belong to.
 */
export function Magnetic({
  children,
  className = '',
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer's offset from centre that the element travels. */
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.35 });

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        my.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
