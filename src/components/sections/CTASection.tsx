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
 * The page's own architectural photograph sits behind the copy rather than
 * beside it, under a warm off-white scrim taken from the site's own ground, so
 * the section reads as part of the light editorial family rather than as a dark
 * banner dropped in at the end. Content stays on the site container, and the
 * sequence reveals once on entry — photograph, label, statement, copy, actions.
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

      <div className="rd-shell relative z-10 flex min-h-[32.5rem] items-center py-[clamp(3.5rem,7vw,6rem)] md:min-h-[34rem] lg:min-h-[clamp(32.5rem,62vh,43.75rem)]">
        <div className="w-full max-w-[47.5rem]">
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
            className="rd-body mt-[clamp(1.75rem,2.4vw,2.25rem)] max-w-[42ch] text-[var(--rd-stone)]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, ease: EASE, delay: 0.8 }}
          >
            {body}
          </motion.p>

          <div className="rd-cta-actions mt-[clamp(1.75rem,2.4vw,2.25rem)] flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center sm:gap-4">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, ease: EASE, delay: 0.94 }}
            >
              <ButtonLink
                href="/contact"
                tone="dark"
                variant="solid"
                className="w-full sm:w-auto"
              >
                Get in Touch
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, ease: EASE, delay: 1.02 }}
            >
              <ButtonLink
                href={`mailto:${contact.email}`}
                tone="dark"
                variant="outline"
                withArrow={false}
                className="w-full sm:w-auto"
              >
                {contact.email}
              </ButtonLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
