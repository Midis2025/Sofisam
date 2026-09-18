'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

import { welcomeCopy, contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/animations/Reveal';
import { SplitText, FocusIn } from '@/components/animations/SplitText';
import { Marquee } from '@/components/animations/Marquee';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The four qualities are not a list the firm publishes — they are the four
 * words of its own sentence, set out so the sentence can be read twice. Each
 * one appears verbatim in `welcomeCopy.paragraphs[1]`; nothing is added to it
 * and nothing is claimed that the sentence does not already claim.
 */
const pillars = ['Confidential', 'Unconflicted', 'Strategic', 'International'];

/**
 * Welcome to SOFISAM — the page's first statement.
 *
 * A three-part spread rather than a stack: the positioning holds the left, a
 * tall architectural plate runs the full height of the middle, and the firm's
 * own three paragraphs hold the right. The photograph is the hinge — it is
 * what the two columns are written either side of — so it is set as a column
 * in the grid rather than as a band the text sits above and below.
 *
 * The plate carries three slow movements and no fast ones: a few percent of
 * travel against the page, a lean of a few pixels toward the cursor on a
 * device that has one, and a slight settle out of scale on entry. It is the
 * only thing in the section that moves once the copy has arrived.
 *
 * All copy is preserved verbatim from the source site. The four qualities at
 * the foot are the firm's own adjectives, lifted from its own sentence.
 */
export function BrandStatement() {
  const reduce = useReducedMotion();
  const plate = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);

  const { scrollYProgress } = useScroll({
    target: plate,
    offset: ['start end', 'end start'],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  const leanX = useSpring(0, { stiffness: 55, damping: 20, mass: 0.7 });
  const leanY = useSpring(0, { stiffness: 55, damping: 20, mass: 0.7 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setFine(true);

    const onMove = (e: PointerEvent) => {
      const el = plate.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      leanX.set(((e.clientX - r.left) / r.width - 0.5) * -14);
      leanY.set(((e.clientY - r.top) / r.height - 0.5) * -10);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, leanX, leanY]);

  return (
    <section
      data-section="Welcome"
      id="welcome"
      className="ground-char relative"
      aria-labelledby="welcome-heading"
    >
      <div className="shell pb-[clamp(2.5rem,5vw,4rem)] pt-[var(--pad)]">
        <div className="grid items-start gap-x-[clamp(1.75rem,3.2vw,3.5rem)] gap-y-[clamp(2.5rem,5vw,3.5rem)] lg:grid-cols-[minmax(0,30fr)_minmax(0,28fr)_minmax(0,42fr)] lg:items-stretch">
          {/* ==================== Left — the positioning ==================== */}
          <div className="flex flex-col lg:pr-[clamp(0.5rem,1.2vw,1.5rem)]">
            <Reveal kind="label">
              <p className="flex items-baseline gap-2.5">
                <span className="t-num text-[0.68rem] text-gold/55">01</span>
                <span className="t-label text-gold">{welcomeCopy.eyebrow}</span>
              </p>
            </Reveal>

            <SplitText
              as="h2"
              text="A platform, and the relationships behind it."
              className="mt-[clamp(1.25rem,2.4vw,2rem)] max-w-[13ch] font-display text-[clamp(2.4rem,3.4vw,3.6rem)] leading-[1.02] tracking-tighter text-ivory"
              delay={0.08}
              stagger={0.045}
            />

            <Reveal delay={0.22}>
              <span aria-hidden className="rule my-[clamp(1.5rem,2.6vw,2.25rem)]" />
              <p className="t-lead max-w-[30ch] text-sage">{welcomeCopy.positioning}</p>
            </Reveal>

            {/* On a wide screen the column is shorter than the plate beside
                it. Taking the slack here rather than at the foot drops the
                action onto the same baseline as the four qualities across the
                spread, instead of leaving a quarter of the column empty under
                it. */}
            <span aria-hidden className="hidden flex-1 lg:block" />

            {/* The one action on this section. A ring and a label, not a
                button: nothing here is being submitted. */}
            <Reveal delay={0.3} className="mt-[clamp(1.75rem,3vw,2.5rem)]">
              <Link
                href="/services"
                className="group/a inline-flex items-center gap-4 text-ivory transition-colors duration-500 ease-premium hover:text-gold"
              >
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--line-gold)] transition-[border-color,box-shadow,background-color] duration-500 ease-premium group-hover/a:border-gold group-hover/a:bg-gold/[0.07] group-hover/a:shadow-[0_0_24px_-6px_rgba(201,169,124,0.45)]">
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.4}
                    className="h-[1.05rem] w-[1.05rem] text-gold transition-transform duration-500 ease-premium group-hover/a:translate-x-1"
                  />
                </span>
                <span className="t-label">Our Expertise</span>
              </Link>
            </Reveal>
          </div>

          {/* ==================== Centre — the plate ==================== */}
          <motion.div
            ref={plate}
            className="tone-dark group/p relative isolate min-h-[clamp(22rem,58vh,34rem)] overflow-hidden rounded-[var(--r-lg)] border border-ivory/10 shadow-[var(--depth-2)] lg:min-h-0"
            initial={reduce ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <motion.div
              className="absolute inset-[-5%] -z-10"
              style={reduce ? undefined : { y: driftY, x: fine ? leanX : undefined }}
            >
              <motion.div
                className="h-full w-full"
                style={reduce ? undefined : { y: fine ? leanY : undefined }}
              >
                <div
                  className={`h-full w-full [filter:saturate(0.82)_contrast(1.05)_brightness(0.9)] ${
                    reduce ? '' : 'transition-transform duration-[1100ms] ease-premium group-hover/p:scale-[1.03]'
                  }`}
                >
                  <Picture
                    name="business-bay"
                    alt="Dubai's Business Bay towers standing in soft morning haze above the water"
                    sizes="(min-width: 1024px) 30vw, 92vw"
                    focal="50% 45%"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Scrim: dense at the foot for the label, a vignette to close the
                corners, and the picture left alone in between. */}
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.76)_16%,rgba(5,5,5,0.4)_34%,rgba(5,5,5,0.12)_54%,transparent_76%)]"
            />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_45%,transparent_46%,rgba(5,5,5,0.4)_100%)]"
            />
            {/* The site's own grain, so the plate is not the one smooth
                surface on a page that has it everywhere else. */}
            <span aria-hidden className="grain absolute inset-0" />

            {/* The architectural label. A rule dropping to a point, the city,
                and the firm's stated position at it. */}
            <Reveal
              delay={0.5}
              className="absolute inset-x-0 bottom-0 p-[clamp(1.1rem,1.6vw,1.6rem)]"
            >
              <span aria-hidden className="mb-3 flex flex-col items-start gap-1.5">
                <span className="block h-[clamp(1.5rem,3vw,2.5rem)] w-px bg-[var(--line-gold)]" />
                <span className="ml-[-0.15rem] block h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <p className="t-h3 text-ivory">{contact.address.locality}</p>
              <p className="t-label mt-2.5 text-gold">World headquarters</p>
              <p className="t-small mt-2 max-w-[28ch] text-ivory/70">{contact.headquarters}</p>
            </Reveal>
          </motion.div>

          {/* ==================== Right — the firm in its own words ======== */}
          <div className="flex flex-col lg:pl-[clamp(0.5rem,1.2vw,1.5rem)]">
            <Reveal kind="label">
              <p className="flex items-baseline gap-2.5">
                <span className="t-num text-[0.68rem] text-gold/55">02</span>
                <span className="t-label text-gold">Reach</span>
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <span aria-hidden className="rule my-[clamp(1.25rem,2.2vw,1.75rem)]" />
              <p className="t-lead max-w-[46ch] text-ivory/85">{welcomeCopy.paragraphs[0]}</p>
            </Reveal>

            {/* The statement. The measure is set in characters so it breaks
                into four or five balanced lines at every width rather than
                leaving one word stranded on the last. */}
            <SplitText
              as="p"
              text={welcomeCopy.paragraphs[1]}
              className="mt-[clamp(1.75rem,3vw,2.5rem)] max-w-[22ch] font-display text-[clamp(1.75rem,2.5vw,2.75rem)] leading-[1.1] tracking-tighter text-ivory"
              delay={0.16}
              stagger={0.028}
            />

            <FocusIn delay={0.24}>
              <p className="t-body mt-[clamp(1.5rem,2.6vw,2.25rem)] max-w-[54ch] text-sage">
                {welcomeCopy.paragraphs[2]}
              </p>
            </FocusIn>

            <span aria-hidden className="hidden flex-1 lg:block" />

            {/* The four qualities, on one baseline. */}
            {/* Four across only where four fit. 'Unconflicted' is twelve
                characters at the label's tracking, and a word cannot wrap:
                at 1024 a quarter of this column is narrower than the word, so
                the row would push the page sideways rather than break. */}
            <ol className="mt-[clamp(2rem,3.5vw,2.75rem)] grid grid-cols-2 gap-x-[clamp(1rem,2vw,2rem)] gap-y-[clamp(1rem,1.8vw,1.5rem)] xl:grid-cols-4">
              {pillars.map((p, i) => (
                <Reveal as="li" key={p} delay={0.3 + i * 0.07} className="min-w-0">
                  <span className="t-num block text-[0.68rem] text-gold/55">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden
                    className="mt-2.5 block h-px w-full bg-[var(--line)]"
                  />
                  <span className="t-label mt-2.5 block tracking-[0.15em] text-ivory/80">
                    {p}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* A band of the firm's own disciplines, travelling with the scroll. */}
      <div className="border-y border-[var(--line)] py-[clamp(1rem,1.8vw,1.75rem)]">
        <Marquee speed={2.5}>
          {['Strategic Consulting', 'Advisory', 'Structuring'].map((word) => (
            <span key={word} className="flex items-center">
              <span className="px-[clamp(1.5rem,3vw,3rem)] font-display text-[clamp(1.75rem,3.4vw,3.25rem)] leading-none tracking-tighter text-ivory/75">
                {word}
              </span>
              <span
                aria-hidden
                className="block h-[0.45rem] w-[0.45rem] shrink-0 rounded-full bg-gold"
              />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
