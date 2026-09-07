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
    <section className="relative flex min-h-screen-safe items-center overflow-hidden bg-ink text-bone">
      <div className="media veil-bottom absolute inset-0">
        <Picture
          name="towers-mono"
          alt=""
          decorative
          sizes="100vw"
          focal="50% 40%"
          priority
          className="h-full w-full"
        />
      </div>
      <div
        aria-hidden
        className="precision-grid precision-grid-fade pointer-events-none absolute inset-0 opacity-60"
      />

      <div className="shell-wide relative z-10 py-32">
        <p className="t-label text-gold">Error 404</p>

        <h1 className="t-display mt-7 max-w-[14ch] text-bone">Page not found.</h1>

        <p className="t-lead mt-7 max-w-[46ch] text-bone/60">
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

        <nav aria-label="Suggested pages" className="mt-14 border-t border-bone/15 pt-8">
          <p className="t-label text-bone/40">Elsewhere on the site</p>
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
                  className="link-underline text-[0.95rem] font-light text-bone/70 hover:text-bone"
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
