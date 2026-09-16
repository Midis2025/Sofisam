'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

import { Reveal } from '@/components/animations/Reveal';
import { SplitText } from '@/components/animations/SplitText';

/**
 * Advisory principles.
 *
 * The five principles are drawn directly from SOFISAM's own description of its
 * advice: "confidential, unconflicted and strategic advice, built over decades
 * of international business experience".
 *
 * They are built as a deck. Each principle is a card that sticks under the one
 * before it, so scrolling gathers them into a stack rather than scrolling them
 * past — the section assembles into a single object by the time you leave it.
 * Cards behind the top one recede slightly, which is what makes the stack read
 * as depth rather than as overlap.
 *
 * Under reduced motion the deck is a plain vertical list. Every description is
 * visible in both.
 */
const principles = [
  {
    word: 'Confidential',
    note: 'Sensitive positions are handled in a closed circle, by the principals who took them on.',
  },
  {
    word: 'Unconflicted',
    note: 'No product to place and no side to favour. The recommendation reflects the situation, not the adviser.',
  },
  {
    word: 'Strategic',
    note: 'Advice framed around what a decision commits you to, not only what it promises.',
  },
  {
    word: 'International',
    note: 'Relationships and partnerships that span the globe, read jurisdiction by jurisdiction.',
  },
  {
    word: 'Experienced',
    note: 'Built over decades of international business experience, and the judgement that comes with it.',
  },
] as const;

export function AdvisoryPrinciples() {
  const reduce = useReducedMotion();

  return (
    <section className="section ground-ivory-2" aria-labelledby="principles-heading">
      <div className="shell">
        <div className="head">
          <div>
            <Reveal kind="label" className="kicker">
              <p className="t-label">Advisory Principles</p>
            </Reveal>

            <SplitText
              as="h2"
              text="Five words that decide what we will and will not say."
              className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-ink"
              stagger={0.04}
            />
          </div>

          <div className="lg:pb-2">
            <Reveal delay={0.1}>
              <p className="t-body head-note text-stone">
                The advice SOFISAM provides is described in its own terms:
                confidential, unconflicted and strategic, built over decades of
                international business experience.
              </p>
            </Reveal>
          </div>
        </div>

        <Deck reduce={reduce} />
      </div>
    </section>
  );
}

/**
 * The deck.
 *
 * One scroll reading drives the whole stack. A card only begins to recede once
 * the deck has scrolled past its own share of the track — which is what makes
 * the recede coincide with the next card arriving over it, rather than
 * starting the moment the card enters the viewport.
 */
function Deck({ reduce }: { reduce: boolean | null }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  if (reduce) {
    return (
      <ol className="mt-[var(--pad-sm)] space-y-4">
        {principles.map((p, i) => (
          <li key={p.word} className="surface surface-solid p-[clamp(1.5rem,3vw,3rem)]">
            <Body word={p.word} note={p.note} index={i} total={principles.length} />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol ref={ref} className="mt-[var(--pad-sm)]">
      {principles.map((p, i) => (
        <Card
          key={p.word}
          index={i}
          total={principles.length}
          progress={scrollYProgress}
          {...p}
        />
      ))}
    </ol>
  );
}

function Card({
  word,
  note,
  index,
  total,
  progress,
}: {
  word: string;
  note: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // The window during which this card is covered by the one after it.
  const from = index / total;
  const to = (index + 1) / total;

  const scale = useTransform(progress, [from, to], [1, 0.9]);
  const opacity = useTransform(progress, [from, to], [1, 0.35]);

  return (
    <li
      className="sticky"
      style={{
        // Each card rests a little lower than the one before, so the stack
        // shows its own edges.
        top: `calc(var(--header-h) + 2rem + ${index * 1.75}rem)`,
        marginBottom: index === total - 1 ? 0 : '1.25rem',
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="surface surface-solid origin-top p-[clamp(1.5rem,3vw,3rem)]"
      >
        <Body word={word} note={note} index={index} total={total} />
      </motion.div>
    </li>
  );
}

function Body({
  word,
  note,
  index,
  total,
}: {
  word: string;
  note: string;
  index: number;
  total: number;
}) {
  return (
    <div className="grid items-baseline gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-4 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.05fr)]">
      <span className="t-num text-[0.9rem] text-gold-ink">
        {String(index + 1).padStart(2, '0')}
        <span className="text-stone/40"> / {String(total).padStart(2, '0')}</span>
      </span>

      <h3 className="font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.0] tracking-tighter text-ink">
        {word}
      </h3>

      <p className="t-body col-start-1 max-w-[48ch] text-stone md:col-start-3">{note}</p>
    </div>
  );
}
