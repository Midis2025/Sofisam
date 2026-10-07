'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
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
    <section data-section="Advisory Principles" className="section ground-graphite" aria-labelledby="principles-heading">
      <div className="shell">
        <div className="head">
          <div>
            <Reveal kind="label" className="kicker">
              <p className="t-label">Advisory Principles</p>
            </Reveal>

            <SplitText
              as="h2"
              text="Five words that decide what we will and will not say."
              className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-ivory"
              stagger={0.04}
            />
          </div>

          <div className="lg:pb-2">
            <Reveal delay={0.1}>
              <p className="t-body head-note text-sage">
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
 * the card after it has started to come over it, and is fully receded by the
 * time that card has come to rest — so the recede is the covering, rather than
 * a fade that happens to run alongside it.
 *
 * The track is the gathering itself, and it has to be measured rather than
 * assumed. `useScroll` bounded by the list's own box cannot express it: that
 * reading is spent by the time the list has outgrown the viewport, which here
 * is a few dozen pixels and hundreds short of the distance the cards take to
 * stack. Its progress would therefore stand at 1 for the whole of the
 * gathering and every card would be frozen at the far end of its recede —
 * including the last, which nothing covers.
 *
 * So the marks are taken off the cards as they are actually laid out: a card
 * comes to rest when the list has travelled its own offset within the list,
 * less the sticky top it rests at. The first card's mark opens the track and
 * the last card's closes it. Nothing here is a figure — the offsets follow the
 * type scale and the sticky tops at every width — and the marks are retaken
 * whenever the layout moves under them.
 */
function Deck({ reduce }: { reduce: boolean | null }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollY } = useScroll();

  /* The track, in document coordinates: where it opens, and how long it runs.
     Motion values rather than state — the deck is driven every frame and must
     never re-render to do it. */
  const open = useMotionValue(0);
  const span = useMotionValue(1);

  useEffect(() => {
    const ol = ref.current;
    if (!ol) return;

    const measure = () => {
      const cards = Array.from(ol.children) as HTMLElement[];
      if (cards.length < 2) return;

      const top = ol.getBoundingClientRect().top + window.scrollY;

      /* The list is walked rather than measured in place: a card that is
         already stuck reports where it is pinned, not where it sits in the
         list, so the flow offsets are accumulated from the boxes themselves.
         Neither `offsetHeight` nor the computed `top` is affected by the
         sticky placement or by the scale on the card inside. */
      let flow = 0;
      const rest: number[] = [];
      for (const li of cards) {
        const cs = getComputedStyle(li);
        rest.push(top + flow - parseFloat(cs.top));
        flow += li.offsetHeight + parseFloat(cs.marginBottom);
      }

      open.set(rest[0]);
      span.set(Math.max(1, rest[rest.length - 1] - rest[0]));
    };

    measure();

    /* The list's own box moves with the type scale and the fonts; the page
       above it moves as its images arrive. Both change where the track sits. */
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [open, span]);

  /* Read as a function of the scroll rather than as a keyframed range. A
     linearly interpolated scroll value is handed to a native scroll-timeline
     animation for any accelerated property — opacity among them — and on a
     sticky card that timeline measures the card's own passage rather than the
     deck's, which is what leaves the fade stuck at one end. A transform of a
     transform cannot be expressed as keyframes, so it is never handed off. */
  const progress = useTransform<number, number>(
    [scrollY, open, span],
    ([y, o, s]) => {
      const t = (y - o) / s;
      return t < 0 ? 0 : t > 1 ? 1 : t;
    },
  );

  if (reduce) {
    return (
      <ol className="mt-[var(--pad-sm)] space-y-4">
        {principles.map((p, i) => (
          <li key={p.word} className="surface surface-deep p-[clamp(1.5rem,3vw,3rem)]">
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
          progress={progress}
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
  /* The window during which this card is covered by the one after it: it
     opens as this card comes to rest and closes as the next one does, so the
     five cards divide the track into its four hand-overs.

     The last card is never covered — there is nothing after it — so it is
     given no recede at all. That is what leaves the deck with a card at full
     size and full light on top of it, rather than a shrunken translucent one
     through which the card beneath can still be read. */
  const last = index === total - 1;
  const steps = Math.max(1, total - 1);
  const from = index / steps;
  const to = from + 1 / steps;

  const scale = useTransform(progress, [from, to], [1, last ? 1 : 0.9]);
  const opacity = useTransform(progress, [from, to], [1, last ? 1 : 0.35]);

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
        className="surface surface-deep origin-top p-[clamp(1.5rem,3vw,3rem)]"
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
      <span className="t-num text-[0.9rem] text-gold">
        {String(index + 1).padStart(2, '0')}
        <span className="text-stone"> / {String(total).padStart(2, '0')}</span>
      </span>

      <h3 className="font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.0] tracking-tighter text-ivory">
        {word}
      </h3>

      <p className="t-body col-start-1 max-w-[48ch] text-sage md:col-start-3">{note}</p>
    </div>
  );
}
