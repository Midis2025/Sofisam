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

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll state — drives the solid/blurred header treatment.
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

  // Escape closes the mega-menu.
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
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // Solid treatment once scrolled, or whenever the mega-menu is open.
  const solid = scrolled || megaOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.7rem] focus:uppercase focus:tracking-[0.22em] focus:text-bone"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color] duration-500 ease-premium ${
          solid
            ? 'border-b border-ink/10 bg-bone/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
        onMouseLeave={scheduleCloseMega}
      >
        <div className="shell-wide flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5.5rem]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="SOFISAM FZCO — home"
            className="relative z-10 -my-2 flex min-h-[2.75rem] shrink-0 items-center py-2"
          >
            <span className="relative block h-[1.6rem] w-[6.4rem] sm:h-[1.85rem] sm:w-[7.4rem] lg:h-[2.05rem] lg:w-[8.2rem]">
              <img
                src="/logo.png"
                alt="SOFISAM FZCO"
                width={834}
                height={209}
                className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ease-premium ${
                  solid ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <img
                src="/logo-dark.png"
                alt=""
                aria-hidden
                width={834}
                height={209}
                className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ease-premium ${
                  solid ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 lg:flex xl:gap-11"
          >
            {navItems
              .filter((n) => n.label !== 'Contact')
              .map((item) => {
                const active = isActive(item.href);
                const hasChildren = Boolean(item.children);

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={hasChildren ? openMega : scheduleCloseMega}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup={hasChildren || undefined}
                      aria-expanded={hasChildren ? megaOpen : undefined}
                      onFocus={hasChildren ? openMega : undefined}
                      className={`group relative block py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-400 ${
                        solid
                          ? active
                            ? 'text-ink'
                            : 'text-ink/60 hover:text-ink'
                          : active
                            ? 'text-bone'
                            : 'text-bone/70 hover:text-bone'
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

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className={`group/cta relative inline-flex min-h-[2.75rem] items-center gap-2.5 overflow-hidden border px-6 py-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-premium ${
                solid
                  ? 'border-ink/25 text-ink hover:text-bone'
                  : 'border-bone/35 text-bone hover:text-ink'
              }`}
            >
              <span
                aria-hidden
                className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[600ms] ease-premium group-hover/cta:scale-y-100 ${
                  solid ? 'bg-ink' : 'bg-gold'
                }`}
              />
              <span className="relative z-10">Get in Touch</span>
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.5}
                className="relative z-10 h-[0.85rem] w-[0.85rem] transition-transform duration-500 ease-premium group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="flex w-6 flex-col gap-[6px]">
              <span
                className={`block h-px w-full transition-colors duration-500 ${
                  solid ? 'bg-ink' : 'bg-bone'
                }`}
              />
              <span
                className={`block h-px w-full transition-colors duration-500 ${
                  solid ? 'bg-ink' : 'bg-bone'
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              key="mega"
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.42, ease: EASE }}
              className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-bone/[0.98] backdrop-blur-xl lg:block"
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
            >
              <div className="shell-wide grid grid-cols-12 gap-10 py-12 xl:py-14">
                <div className="col-span-3">
                  <p className="t-label text-gold">Our Expertise</p>
                  <p className="mt-5 max-w-[22ch] font-display text-[1.55rem] leading-[1.15] tracking-tighter text-ink">
                    Three disciplines, one standard of judgement.
                  </p>
                  <Link
                    href="/services"
                    className="link-underline mt-7 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70 hover:text-ink"
                  >
                    All services
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <ul className="col-span-9 grid grid-cols-3 gap-x-8">
                  {services.map((s) => (
                    <li key={s.slug} className="group/mm">
                      <Link
                        href={`/services/${s.slug}`}
                        className="block border-t border-ink/12 pt-5 transition-colors duration-500 hover:border-gold"
                      >
                        <div className="media media-zoom relative mb-5 aspect-[16/10] w-full">
                          <Picture
                            name={s.hero.image}
                            alt=""
                            decorative
                            sizes="(min-width:1280px) 22vw, 26vw"
                            focal={s.hero.focal}
                          />
                        </div>
                        <div className="flex items-baseline gap-3">
                          <span className="t-index text-[0.85rem] tracking-normal text-gold">{s.index}</span>
                          <h3 className="font-display text-[1.25rem] leading-tight tracking-tight text-ink transition-colors duration-400 group-hover/mm:text-gold">
                            {s.title}
                          </h3>
                        </div>
                        <p className="mt-2.5 max-w-[30ch] text-[0.84rem] font-light leading-relaxed text-ink/55">
                          {s.navDescription}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
