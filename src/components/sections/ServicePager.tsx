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
    <nav aria-label="Other services" className="bg-bone">
      <div className="shell-wide">
        <ul className="grid gap-px border-y border-ink/12 sm:grid-cols-2">
          {[
            { s: prev, dir: 'Previous' as const },
            { s: next, dir: 'Next' as const },
          ].map(({ s, dir }) => (
            <li key={dir} className={dir === 'Next' ? 'sm:border-l sm:border-ink/12' : ''}>
              <Link
                href={`/services/${s.slug}`}
                className={`group flex items-center gap-5 py-8 sm:py-10 ${
                  dir === 'Next' ? 'sm:justify-end sm:pl-8 sm:text-right' : 'sm:pr-8'
                }`}
              >
                {dir === 'Previous' && (
                  <ArrowLeft
                    aria-hidden
                    strokeWidth={1.4}
                    className="h-5 w-5 shrink-0 text-ink/35 transition-all duration-500 ease-premium group-hover:-translate-x-1 group-hover:text-gold"
                  />
                )}

                <span
                  className={`flex min-w-0 flex-1 items-center gap-5 ${
                    dir === 'Next' ? 'sm:flex-row-reverse sm:text-right' : ''
                  }`}
                >
                  <span className="media media-zoom hidden aspect-square w-16 shrink-0 sm:block">
                    <Picture
                      name={s.hero.image}
                      alt=""
                      decorative
                      sizes="64px"
                      focal={s.hero.focal}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="t-label block text-gold">{dir}</span>
                    <span className="mt-2 block truncate font-display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-tight tracking-tight text-ink transition-colors duration-500 group-hover:text-gold">
                      {s.title}
                    </span>
                  </span>
                </span>

                {dir === 'Next' && (
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.4}
                    className="h-5 w-5 shrink-0 text-ink/35 transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:text-gold"
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
