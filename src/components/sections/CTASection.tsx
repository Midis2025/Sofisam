'use client';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';

interface CTASectionProps {
  eyebrow?: string;
  lines?: string[];
  body?: string;
  image?: string;
  focal?: string;
}

/**
 * 10 — Enquiries. The closing composition on every page: a typographic
 * statement and the contact routes on the left, one plate on the right. Kept
 * compact so the page does not trail off into empty ground before the footer.
 */
export function CTASection({
  eyebrow = 'Enquiries',
  lines = ['Start a', 'conversation.'],
  body = 'Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence.',
  image = 'gold-lattice',
  focal = '50% 62%',
}: CTASectionProps) {
  return (
    <section className="rd-section rd-paper" aria-labelledby="cta-heading">
      <div className="rd-shell">
        <div className="grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center">
          <div>
            <Reveal kind="label" className="rd-kicker">
              <p className="rd-label">{eyebrow}</p>
            </Reveal>

            <h2
              id="cta-heading"
              className="rd-display mt-[clamp(1rem,2vw,1.75rem)] max-w-[12ch] text-[var(--rd-ink)]"
            >
              <MaskedLines lines={lines} />
            </h2>

            <Reveal kind="body" delay={0.12}>
              <p className="rd-body mt-[clamp(1.5rem,2.6vw,2.25rem)] max-w-[46ch] text-[var(--rd-stone)]">
                {body}
              </p>
            </Reveal>

            <Reveal kind="body" delay={0.18}>
              <div className="mt-[clamp(1.5rem,2.4vw,2rem)] flex flex-wrap items-center gap-3">
                <ButtonLink href="/contact" tone="dark" variant="solid">
                  Get in Touch
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${contact.email}`}
                  tone="dark"
                  variant="outline"
                  withArrow={false}
                >
                  {contact.email}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <ImageReveal delay={0.1}>
            <div className="rd-media aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[3/4]">
              <Picture
                name={image}
                alt=""
                decorative
                sizes="(min-width:1024px) 40vw, 100vw"
                focal={focal}
                className="h-full w-full"
              />
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
