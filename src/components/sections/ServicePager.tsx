import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { services, type ServiceSlug } from '@/data/services';
import { Picture } from '@/components/ui/Picture';

/** Previous / next navigation between the three service pages. */
export function ServicePager({ current }: { current: ServiceSlug }) {
  const i = services.findIndex((s) => s.slug === current);
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];

  return (
    <nav aria-label="Other services" className="rd-paper">
      <div className="rd-shell">
        <ul className="grid sm:grid-cols-2">
          {[
            { s: prev, dir: 'Previous' as const },
            { s: next, dir: 'Next' as const },
          ].map(({ s, dir }) => (
            <li
              key={dir}
              className={`rd-row rd-row-hover last:border-b last:border-[var(--rd-line)] sm:border-b sm:border-[var(--rd-line)] ${
                dir === 'Next' ? 'sm:border-l sm:border-l-[var(--rd-line)]' : ''
              }`}
            >
              <Link
                href={`/services/${s.slug}`}
                className={`group flex items-center gap-5 px-1 py-[clamp(1.75rem,3vw,2.5rem)] ${
                  dir === 'Next' ? 'sm:justify-end sm:pl-8 sm:text-right' : 'sm:pr-8'
                }`}
              >
                {dir === 'Previous' && (
                  <ArrowLeft
                    aria-hidden
                    strokeWidth={1.4}
                    className="h-5 w-5 shrink-0 text-[var(--rd-stone)] transition-all duration-500 ease-premium group-hover:-translate-x-1 group-hover:text-[var(--rd-accent-ink)]"
                  />
                )}

                <span
                  className={`flex min-w-0 flex-1 items-center gap-5 ${
                    dir === 'Next' ? 'sm:flex-row-reverse sm:text-right' : ''
                  }`}
                >
                  <span className="rd-media rd-media-sm hidden aspect-square w-16 shrink-0 sm:block">
                    <Picture
                      name={s.hero.image}
                      alt=""
                      decorative
                      sizes="64px"
                      focal={s.hero.focal}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="rd-label block text-[var(--rd-accent-ink)]">{dir}</span>
                    <span className="rd-h3 mt-2.5 block truncate text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]">
                      {s.title}
                    </span>
                  </span>
                </span>

                {dir === 'Next' && (
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.4}
                    className="h-5 w-5 shrink-0 text-[var(--rd-stone)] transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:text-[var(--rd-accent-ink)]"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
