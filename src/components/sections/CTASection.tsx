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
 * 10 — Enquiries. The closing composition on every page: an oversized
 * statement on the left, the existing description and contact routes in a
 * panel on the right, over a plate of architecture.
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
        <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-center lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
          <div className="lg:col-span-6">
            <Reveal className="rd-kicker">
              <p className="rd-label">{eyebrow}</p>
            </Reveal>

            <h2
              id="cta-heading"
              className="rd-display mt-[clamp(1.25rem,2.6vw,2.25rem)] max-w-[12ch] text-[var(--rd-ink)]"
            >
              <MaskedLines lines={lines} />
            </h2>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <div className="rd-card p-[clamp(1.25rem,2.2vw,2rem)]">
                <p className="rd-body max-w-[46ch] text-[var(--rd-stone)]">{body}</p>

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
              </div>
            </Reveal>

            <ImageReveal delay={0.16} className="mt-[clamp(0.875rem,1.4vw,1.25rem)]">
              <div className="rd-media aspect-[16/9] w-full lg:aspect-[16/8]">
                <Picture
                  name={image}
                  alt=""
                  decorative
                  sizes="(min-width:1024px) 48vw, 100vw"
                  focal={focal}
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
