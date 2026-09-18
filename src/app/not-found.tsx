import type { Metadata } from 'next';
import Link from 'next/link';

import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="tone-dark relative flex min-h-screen-safe items-center overflow-hidden bg-void text-ivory">
      <div className="media media-flat veil-hero grain absolute inset-0">
        <Picture
          name="towers-mono"
          alt=""
          decorative
          sizes="100vw"
          focal="50% 40%"
          className="h-full w-full"
        />
      </div>

      <div className="below-header shell relative z-10 pb-[var(--pad)]">
        <p className="t-label text-gold">Error 404</p>

        <h1 className="t-display mt-7 max-w-[14ch] text-ivory">Page not found.</h1>

        <p className="t-lead mt-7 max-w-[46ch] text-ivory/60">
          The page you were looking for is not here. It may have moved, or the
          address may be incomplete.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" tone="light" variant="solid">
            Return home
          </ButtonLink>
          <ButtonLink href="/contact" tone="light" variant="outline">
            Get in touch
          </ButtonLink>
        </div>

        <nav aria-label="Suggested pages" className="mt-14 border-t border-ivory/15 pt-8">
          <p className="t-label text-stone">Elsewhere on the site</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/services' },
              ...services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
              { label: 'Insights', href: '/insights' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-underline text-[0.95rem] font-light text-ivory/70 hover:text-ivory"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
