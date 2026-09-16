'use client';

import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  wrap,
} from 'framer-motion';

/**
 * A band of type travelling across the page.
 *
 * It moves on its own at a constant rate, and the page's own scroll velocity
 * is added to that — scroll down and the band accelerates, scroll up and it
 * reverses. The effect is that the band belongs to the page rather than
 * looping beside it.
 *
 * The children are repeated four times so the strip is always wider than any
 * viewport, and `wrap` keeps the offset inside one copy's width, so the loop
 * is seamless in both directions and never drifts.
 *
 * Under reduced motion it renders as a single static line.
 */
export function Marquee({
  children,
  className = '',
  /** Percent of one copy's width travelled per second. */
  speed = 3,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Scroll velocity contributes up to ±5 extra copies per second.
  const boost = useTransform(smooth, [-1200, 0, 1200], [-5, 0, 5], {
    clamp: false,
  });

  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(reverse ? -1 : 1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * speed * (delta / 1000);

    // Reverse the band when the page is scrolled the other way.
    const b = boost.get();
    if (b < 0) direction.current = reverse ? 1 : -1;
    else if (b > 0) direction.current = reverse ? -1 : 1;

    move += direction.current * b * (delta / 1000);
    base.set(base.get() + move);
  });

  if (reduce) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex whitespace-nowrap">{children}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} aria-hidden={i > 0} className="flex flex-nowrap">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
