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
    <nav aria-label="Other services" className="ground-char">
      <div className="shell">
        <ul className="grid sm:grid-cols-2">
          {[
            { s: prev, dir: 'Previous' as const },
            { s: next, dir: 'Next' as const },
          ].map(({ s, dir }) => (
            <li
              key={dir}
              className={`row row-hover last:border-b last:border-[var(--line)] sm:border-b sm:border-[var(--line)] ${
                dir === 'Next' ? 'sm:border-l sm:border-l-[var(--line)]' : ''
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
                    className="h-5 w-5 shrink-0 text-sage transition-all duration-500 ease-premium group-hover:-translate-x-1 group-hover:text-gold"
                  />
                )}

                <span
                  className={`flex min-w-0 flex-1 items-center gap-5 ${
                    dir === 'Next' ? 'sm:flex-row-reverse sm:text-right' : ''
                  }`}
                >
                  <span className="media hidden aspect-square w-16 shrink-0 sm:block">
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
                    <span className="t-h3 mt-2.5 block truncate text-ivory transition-colors duration-500 group-hover:text-gold-hi">
                      {s.title}
                    </span>
                  </span>
                </span>

                {dir === 'Next' && (
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.4}
                    className="h-5 w-5 shrink-0 text-sage transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:text-gold"
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
