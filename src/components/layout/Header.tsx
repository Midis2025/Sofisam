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
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useDarkUnder } from '@/lib/theme';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Site header.
 *
 * Transparent over the hero, and on scroll it settles into the theme's glass.
 * While it is transparent it has no ground of its own, so it takes the tone
 * of what it is over: across a masthead photograph it reads light in either
 * theme, and it only turns to the light theme's charcoal once it has glass
 * of its own behind it.
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
  const bar = useRef<HTMLElement>(null);

  // Every page but Contact opens on a photographic masthead, which is what the
  // server renders against; the sample corrects it before the first paint on
  // the client.
  const overDark = useDarkUnder(
    bar,
    (box) => ({ x: box.left + 8, y: box.top + box.height / 2 }),
    pathname !== '/contact',
    [pathname],
  );

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
  const tone = !glass && overDark ? 'tone-dark' : '';

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[190] focus:bg-void focus:px-5 focus:py-3 focus:text-[0.72rem] focus:uppercase focus:tracking-[0.22em] focus:text-ivory"
      >
        Skip to content
      </a>

      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color] duration-700 ease-premium ${tone} ${
          glass
            ? 'border-b border-[var(--line)] bg-void/[0.86] shadow-[var(--shadow-header)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        }`}
        onMouseLeave={scheduleCloseMega}
      >
        <div
          className={`shell relative flex items-center justify-between gap-6 transition-[height] duration-700 ease-premium ${
            glass ? 'h-[4rem] lg:h-[4.5rem]' : 'h-[4.5rem] lg:h-[5.5rem]'
          }`}
        >
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="SOFISAM FZCO — home"
            className="relative z-10 -my-2 flex min-h-[2.75rem] shrink-0 items-center py-2 transition-opacity duration-500 ease-premium hover:opacity-80"
          >
            <Logo alt="SOFISAM FZCO" className="h-[2.35rem] w-auto sm:h-[2.6rem] lg:h-[2.85rem]" />
          </Link>

          {/* Navigation — centred */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-10"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : active ? 'true' : undefined}
                    className={`group relative block py-2 text-[0.9375rem] font-medium tracking-tight transition-colors duration-300 ${
                      active ? 'text-ivory' : 'text-sage hover:text-ivory'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-brass transition-transform duration-300 ease-out ${
                        active
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Action */}
          <div className="hidden items-center gap-5 lg:flex">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-none border border-[var(--line-strong)] bg-ivory px-6 py-2.5 text-[0.875rem] font-medium tracking-wide text-ink transition-all duration-300 hover:border-brass hover:bg-brass hover:text-white"
            >
              <span>Get in Touch</span>
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.5}
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Theme and mobile trigger */}
          <div className="relative z-10 flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="group relative -mr-1 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 bg-ivory/[0.07] shadow-[var(--control-shadow)] backdrop-blur-md transition-colors duration-500 ease-premium hover:border-ivory/35 hover:bg-ivory/[0.13]"
            >
              <span className="flex w-[1.15rem] flex-col items-end gap-[6px]">
                <span className="block h-px w-full bg-ivory transition-all duration-500 ease-premium" />
                <span className="block h-px w-2/3 bg-ivory transition-all duration-500 ease-premium group-hover:w-full" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
