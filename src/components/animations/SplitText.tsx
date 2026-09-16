'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Text that assembles itself.
 *
 * The string is split into words — each one masked and lifted from below on a
 * stagger — so a statement arrives as a sequence rather than a block. Words,
 * not characters: a character stagger on a long editorial line reads as a
 * gimmick and destroys the spacing of a serif.
 *
 * Accessibility: the whole string is announced once from a visually hidden
 * copy, and the animated words are hidden from the accessibility tree. Under
 * reduced motion the split is skipped entirely and the text simply renders.
 */
export function SplitText({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.035,
  duration = 0.9,
  once = true,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  as?: 'span' | 'p' | 'h2' | 'h3';
}) {
  const reduce = useReducedMotion();

  if (reduce) return <Tag className={className}>{text}</Tag>;

  const words = text.split(' ');

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-10% 0px -10% 0px' }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            // `clip` rather than `hidden` so a descender is not sliced off.
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className={`inline-block ${wordClassName}`}
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: { y: '0%', opacity: 1 },
              }}
              transition={{ duration, ease: EASE, delay: delay + i * stagger }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/**
 * A block of copy that fades up as one, with a slight blur coming off it. The
 * blur is what separates this from an ordinary fade — it reads as the text
 * settling into focus rather than simply appearing.
 */
export function FocusIn({
  children,
  className = '',
  delay = 0,
  duration = 0.85,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8% 0px -10% 0px' }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A plate uncovered by a curtain: a gold panel sweeps across the frame and the
 * photograph is revealed behind it. Used where an image should arrive as an
 * event rather than fade in.
 */
export function CurtainReveal({
  children,
  className = '',
  delay = 0,
  direction = 'left',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** The side the curtain leaves toward. */
  direction?: 'left' | 'right' | 'up';
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const exit =
    direction === 'up'
      ? { scaleY: 0, originY: 0 }
      : { scaleX: 0, originX: direction === 'left' ? 0 : 1 };

  const from =
    direction === 'up'
      ? { scaleY: 1, originY: 0 }
      : { scaleX: 1, originX: direction === 'left' ? 0 : 1 };

  return (
    <motion.div
      className={`relative ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px -10% 0px' }}
    >
      <motion.div
        variants={{
          hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
          visible: { clipPath: 'inset(0% 0% 0% 0%)' },
        }}
        transition={{ duration: 1.05, ease: EASE, delay: delay + 0.12 }}
      >
        {children}
      </motion.div>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 block bg-gold"
        variants={{ hidden: from, visible: exit }}
        transition={{ duration: 0.85, ease: EASE, delay }}
      />
    </motion.div>
  );
}
