import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Compass } from 'lucide-react';

import { Picture } from '@/components/ui/Picture';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Page Not Found | SOFISAM FZCO',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="tone-dark relative flex min-h-screen-safe items-center overflow-hidden bg-[var(--void)] text-[var(--ivory)]">
      {/* Background Architectural Plate */}
      <div className="media media-flat veil-hero grain absolute inset-0">
        <Picture
          name="towers-mono"
          alt=""
          decorative
          sizes="100vw"
          focal="50% 40%"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />
      </div>

      <div className="shell relative z-10 py-24 sm:py-32">
        <div className="max-w-[42rem]">
          <div className="flex items-center gap-2 kicker">
            <p className="t-label text-gold">Status 404</p>
          </div>

          <h1 className="t-h1 mt-eyebrow text-white font-light leading-[1.06]">
            Page not found.
          </h1>

          <p className="t-lead mt-6 text-white/80 leading-relaxed max-w-[44ch]">
            The requested advisory document or page does not exist at this address. It may have been relocated or archived.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-none bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[var(--brass)] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-none border border-white/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/10"
            >
              <span>Contact Firm</span>
            </Link>
          </div>

          <div className="mt-14 pt-8 border-t border-white/20">
            <p className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
              Key Firm Destinations
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                  Our Expertise
                </Link>
              </li>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/80 hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/insights" className="text-white/80 hover:text-white transition-colors">
                  Strategic Insights
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
