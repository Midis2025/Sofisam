'use client';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';

interface CTASectionProps {
  eyebrow?: string;
  lines?: string[];
  body?: string;
  image?: string;
  focal?: string;
}

export function CTASection({
  eyebrow = 'Enquiries',
  lines = ['Start a', 'conversation.'],
  body = 'Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence.',
  image = 'gold-lattice',
  focal = '50% 62%',
}: CTASectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-ink text-bone"
      aria-labelledby="cta-heading"
    >
      <Parallax strength={8} className="absolute inset-0">
        <div className="media h-full w-full">
          <Picture
            name={image}
            alt=""
            decorative
            sizes="100vw"
            focal={focal}
            className="h-full w-full"
          />
        </div>
      </Parallax>
      <div aria-hidden className="absolute inset-0 bg-ink/82" />
      <div
        aria-hidden
        className="precision-grid precision-grid-fade pointer-events-none absolute inset-0 opacity-50"
      />

      <div className="shell-wide relative z-10 flex min-h-[34rem] flex-col justify-center py-[clamp(5rem,12vw,9rem)] text-center">
        <Reveal className="flex items-center justify-center gap-4">
          <span aria-hidden className="block h-px w-10 bg-gold" />
          <p className="t-label text-gold">{eyebrow}</p>
          <span aria-hidden className="block h-px w-10 bg-gold" />
        </Reveal>

        <h2 id="cta-heading" className="t-display mx-auto mt-8 max-w-[14ch] text-bone">
          <MaskedLines lines={lines} />
        </h2>

        <Reveal delay={0.14}>
          <p className="t-lead mx-auto mt-8 max-w-[46ch] text-bone/60">{body}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/contact" tone="light" variant="solid">
              Get in Touch
            </ButtonLink>
            <ButtonLink
              href={`mailto:${contact.email}`}
              tone="light"
              variant="outline"
              withArrow={false}
            >
              {contact.email}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
