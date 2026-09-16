'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

/**
 * A pane of glass that leans toward the pointer.
 *
 * The pointer's position within the element drives two rotations on a spring,
 * so the pane turns to face it and settles back when it leaves. The travel is
 * deliberately tiny — three degrees at the corner — because the effect should
 * read as the light moving across a solid object, not as the object tipping.
 * Past about four degrees the perspective becomes visible and the whole thing
 * looks like a toy.
 *
 * The rotation lives on a wrapper rather than on the card itself, so the
 * card keeps its own hover lift (`.surface-lift`) and the two compose instead
 * of fighting over one transform.
 *
 * Dropped entirely under reduced motion, and never engaged by touch: a finger
 * has no hover state for the pane to lean into.
 */
export function Tilt({
  children,
  className = '',
  /** Maximum rotation at the corner, in degrees. */
  max = 3,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Normalised offset from the centre, −0.5 → 0.5 on each axis.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: '1400px' }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div className="h-full" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  );
}
