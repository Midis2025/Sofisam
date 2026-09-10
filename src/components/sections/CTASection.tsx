'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { MaskedLines } from '@/components/animations/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared entry viewport — the whole band reveals as one. */
const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;

interface CTASectionProps {
  eyebrow?: string;
  lines?: string[];
  body?: string;
  /** Name of the existing asset in the image manifest. */
  image?: string;
  focal?: string;
}

/**
 * Enquiries — the closing band on every page that carries this section.
 *
 * The page's own architectural photograph is the ground, under a scrim of the
 * site's own warm off-white. The statement holds the left of the measure and
 * the two actions sit as a column on the right, level with the copy, so the
 * band reads across its full width instead of massing on one side.
 */
export function CTASection({
  eyebrow = 'Enquiries',
  lines = ['Start a', 'conversation.'],
  body = 'Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence.',
  image = 'gold-lattice',
  focal = '50% 62%',
}: CTASectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      className="rd-paper relative w-full overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* The photograph, full bleed. It settles once on entry and is never
          animated after that. */}
      <motion.div
        className="media rd-cta-photo absolute inset-0"
        initial={reduce ? false : { scale: 1.02, opacity: 0.9 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1, ease: EASE }}
      >
        <Picture
          name={image}
          alt=""
          decorative
          sizes="100vw"
          focal={focal}
          className="h-full w-full"
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="rd-cta-veil absolute inset-0"
        initial={reduce ? false : { opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: EASE }}
      />

      <div className="rd-shell relative z-10 flex min-h-[clamp(31.25rem,58vh,41.25rem)] items-center py-[clamp(3.5rem,6vw,6.25rem)]">
        <div className="grid w-full gap-[clamp(2.5rem,8vw,8.75rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.65fr)] lg:items-end">
          {/* Statement */}
          <div className="max-w-[38.75rem]">
            {/* Label — the rule draws itself, then the word arrives */}
            <div className="flex items-center gap-[0.875rem]">
              <motion.span
                aria-hidden
                className="block h-px w-[clamp(1.75rem,3.2vw,2.75rem)] shrink-0 origin-left bg-[var(--rd-accent)]"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              />
              <motion.p
                className="rd-label text-[var(--rd-accent-ink)]"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
              >
                {eyebrow}
              </motion.p>
            </div>

            <h2
              id="cta-heading"
              className="rd-cta-h mt-[clamp(1.25rem,1.9vw,1.75rem)] max-w-[9ch] text-[var(--rd-ink)]"
            >
              <MaskedLines lines={lines} delay={0.46} stagger={0.08} />
            </h2>

            <motion.p
              className="rd-body mt-[clamp(1.75rem,2.4vw,2.25rem)] max-w-[36rem] text-[var(--rd-stone)]"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.65, ease: EASE, delay: 0.8 }}
            >
              {body}
            </motion.p>
          </div>

          {/* Actions — a column on the right, level with the copy */}
          <motion.div
            className="rd-cta-actions flex w-full flex-col gap-3 sm:max-w-[26rem] lg:max-w-[23.75rem] lg:justify-self-end lg:pb-1"
            initial={reduce ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay: 0.94 }}
          >
            <ButtonLink
              href="/contact"
              tone="dark"
              variant="solid"
              className="h-[3.25rem] w-full justify-between"
            >
              Get in Touch
            </ButtonLink>

            <ButtonLink
              href={`mailto:${contact.email}`}
              tone="dark"
              variant="outline"
              withArrow={false}
              className="rd-cta-mail h-[3.25rem] w-full justify-between"
            >
              {contact.email}
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
