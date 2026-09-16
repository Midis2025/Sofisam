'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { navItems } from './nav-data';
import { MobileMenu } from './MobileMenu';
import { services } from '@/data/services';
import { Picture } from '@/components/ui/Picture';
import { Magnetic } from '@/components/ui/Magnetic';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Site header.
 *
 * Transparent over the hero, and on scroll it settles into dark glass — the
 * ground never turns light, so the wordmark, the navigation and the action
 * keep one treatment from the top of the page to the bottom of it.
 *
 * The services item opens a full-width panel carrying the three disciplines
 * with their imagery. Hovering a discipline brings its plate forward.
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close transient UI on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [megaOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const glass = scrolled || megaOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[190] focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.72rem] focus:uppercase focus:tracking-[0.22em] focus:text-ivory"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color] duration-700 ease-premium ${
          glass
            ? 'border-b border-ivory/10 bg-ink/[0.88] backdrop-blur-2xl'
            : 'border-b border-transparent bg-transparent'
        }`}
        onMouseLeave={scheduleCloseMega}
      >
        <div
          className={`shell-wide relative flex items-center justify-between gap-6 transition-[height] duration-700 ease-premium ${
            glass ? 'h-[4rem] lg:h-[4.75rem]' : 'h-[4.5rem] lg:h-[5.5rem]'
          }`}
        >
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="SOFISAM FZCO — home"
            className="relative z-10 -my-2 flex min-h-[2.75rem] shrink-0 items-center py-2"
          >
            <img
              src="/logo.png"
              alt="SOFISAM FZCO"
              width={834}
              height={209}
              className="h-[1.85rem] w-auto transition-opacity duration-500 ease-premium hover:opacity-80 sm:h-[2.15rem] lg:h-[2.45rem]"
            />
          </Link>

          {/* Navigation — centred */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex xl:gap-12"
          >
            {navItems
              .filter((n) => n.label !== 'Contact')
              .map((item) => {
                const active = isActive(item.href);
                const hasChildren = Boolean(item.children);

                return (
                  <div
                    key={item.href}
                    onMouseEnter={hasChildren ? openMega : scheduleCloseMega}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup={hasChildren || undefined}
                      aria-expanded={hasChildren ? megaOpen : undefined}
                      onFocus={hasChildren ? openMega : undefined}
                      className={`group relative block py-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors duration-400 ${
                        active ? 'text-ivory' : 'text-ivory/60 hover:text-ivory'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-premium ${
                          active || (hasChildren && megaOpen)
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </Link>
                  </div>
                );
              })}
          </nav>

          {/* Action */}
          <div className="hidden lg:block">
            <Magnetic strength={0.22}>
              <Link
                href="/contact"
                className="group/cta relative inline-flex min-h-[2.75rem] items-center gap-2.5 overflow-hidden rounded-full border border-ivory/30 px-7 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 ease-premium hover:text-ink"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-[650ms] ease-premium group-hover/cta:scale-y-100"
                />
                <span className="relative z-10">Get in Touch</span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="relative z-10 h-[0.85rem] w-[0.85rem] transition-transform duration-500 ease-premium group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                />
              </Link>
            </Magnetic>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="group relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="flex w-6 flex-col items-end gap-[7px]">
              <span className="block h-px w-full bg-ivory transition-all duration-500 ease-premium" />
              <span className="block h-px w-2/3 bg-ivory transition-all duration-500 ease-premium group-hover:w-full" />
            </span>
          </button>
        </div>

        {/* Expertise panel */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              key="mega"
              initial={reduce ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-x-0 top-full hidden border-b border-ivory/10 bg-ink/90 backdrop-blur-2xl lg:block"
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
            >
              <div className="shell-wide grid grid-cols-12 gap-12 py-14 xl:py-16">
                {/* Standing statement and the plate for the hovered discipline */}
                <div className="col-span-4 flex flex-col justify-between">
                  <div>
                    <p className="t-label text-gold">Our Expertise</p>
                    <p className="mt-6 max-w-[20ch] font-display text-[1.9rem] leading-[1.1] tracking-tighter text-ivory">
                      Three disciplines, one standard of judgement.
                    </p>
                  </div>

                  <Link
                    href="/services"
                    className="link-underline mt-10 inline-flex w-fit items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory/60 hover:text-ivory"
                  >
                    All services
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* The disciplines */}
                <ul className="col-span-5 self-center">
                  {services.map((s, i) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        onMouseEnter={() => setHovered(i)}
                        onFocus={() => setHovered(i)}
                        className="group/mm row-inv block py-6 last:border-b last:border-[var(--line-inv)]"
                      >
                        <span className="flex items-center justify-between gap-6">
                          <span
                            className={`font-display text-[clamp(1.5rem,2vw,2.1rem)] leading-tight tracking-tight transition-colors duration-500 ${
                              hovered === i ? 'text-gold' : 'text-ivory'
                            }`}
                          >
                            {s.title}
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            strokeWidth={1.4}
                            className={`h-5 w-5 shrink-0 transition-all duration-500 ease-premium ${
                              hovered === i
                                ? 'translate-x-0 text-gold opacity-100'
                                : '-translate-x-2 text-ivory/40 opacity-0'
                            }`}
                          />
                        </span>
                        <span className="mt-2 block max-w-[38ch] text-[0.86rem] font-light leading-relaxed text-ivory/45">
                          {s.navDescription}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Crossfading plate */}
                <div className="col-span-3 col-start-10">
                  <div className="media relative aspect-[3/4] w-full">
                    {services.map((s, i) => (
                      <span
                        key={s.slug}
                        aria-hidden
                        className={`absolute inset-0 transition-opacity duration-700 ease-premium ${
                          hovered === i ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <Picture
                          name={s.hero.image}
                          alt=""
                          decorative
                          sizes="20vw"
                          focal={s.hero.focal}
                          className="h-full w-full object-cover"
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
