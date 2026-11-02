'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

import { navItems } from './nav-data';
import { MobileMenu } from './MobileMenu';
import { services } from '@/data/services';
import { Picture } from '@/components/ui/Picture';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useDarkUnder } from '@/lib/theme';
import { useEnquiryModal } from '@/context/EnquiryModalContext';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * SOFISAM Premium Header
 *
 * Refined editorial navigation with:
 * - Fluid scroll awareness and glass transitions
 * - Smooth desktop dropdown menu for Services with image previews
 * - Active page indicators with delicate gold underline
 * - Mobile navigation trigger with smooth micro-interactions
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { openEnquiryModal } = useEnquiryModal();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [hoveredService, setHoveredService] = useState(0);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bar = useRef<HTMLElement>(null);

  // Check backdrop tone for mastheads
  const overDark = useDarkUnder(
    bar,
    (box) => ({ x: box.left + 8, y: box.top + box.height / 2 }),
    pathname !== '/contact',
    [pathname],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close transient UI on route change
  useEffect(() => {
    setMenuOpen(false);
    setServicesDropdown(false);
  }, [pathname]);

  const handleDropdownEnter = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setServicesDropdown(true);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    dropdownTimer.current = setTimeout(() => {
      setServicesDropdown(false);
    }, 180);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isGlass = scrolled || servicesDropdown;
  const toneClass = !isGlass && overDark ? 'tone-dark' : '';

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[190] focus:bg-[var(--void)] focus:px-5 focus:py-3 focus:text-[0.72rem] focus:uppercase focus:tracking-[0.22em] focus:text-[var(--ivory)] focus:shadow-lg"
      >
        Skip to content
      </a>

      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-premium ${toneClass} ${
          isGlass
            ? 'border-b border-[var(--line-soft)] bg-[var(--void)]/90 shadow-[var(--shadow-header)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        }`}
        onMouseLeave={handleDropdownLeave}
      >
        <div
          className={`shell relative flex items-center justify-between gap-6 transition-[height] duration-500 ease-premium ${
            isGlass ? 'h-[4.25rem] lg:h-[4.75rem]' : 'h-[4.75rem] lg:h-[5.75rem]'
          }`}
        >
          {/* Wordmark / Brand Logo */}
          <Link
            href="/"
            aria-label="SOFISAM FZCO — Return to Homepage"
            className="relative z-10 flex min-h-[2.5rem] shrink-0 items-center py-2 transition-opacity duration-300 hover:opacity-85 focus:outline-none"
          >
            <Logo alt="SOFISAM FZCO" className="h-[2.25rem] w-auto sm:h-[2.55rem] lg:h-[2.85rem]" />
          </Link>

          {/* Centered Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              const isServices = item.href === '/services';

              if (isServices) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : active ? 'true' : undefined}
                      aria-expanded={servicesDropdown}
                      aria-haspopup="true"
                      className={`group relative flex items-center gap-1 py-2 text-[0.875rem] font-medium tracking-tight transition-colors duration-300 ${
                        active || servicesDropdown
                          ? 'text-[var(--ivory)] font-semibold'
                          : 'text-[var(--sage)] hover:text-[var(--ivory)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        aria-hidden
                        className={`h-3.5 w-3.5 text-[var(--brass)] transition-transform duration-300 ${
                          servicesDropdown ? 'rotate-180' : ''
                        }`}
                      />
                      <span
                        aria-hidden
                        className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[var(--brass)] transition-transform duration-300 ease-out ${
                          active
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
                        }`}
                      />
                    </Link>

                    {/* Smooth Desktop Dropdown */}
                    <AnimatePresence>
                      {servicesDropdown && (
                        <motion.div
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="absolute -left-20 top-full mt-2 w-[34rem] overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] p-4 shadow-[var(--shadow-plate)] backdrop-blur-2xl"
                          onMouseEnter={handleDropdownEnter}
                        >
                          <div className="flex items-center justify-between border-b border-[var(--line-soft)] pb-3 px-3">
                            <span className="text-[0.6875rem] uppercase tracking-widest text-[var(--stone)] font-medium">
                              Our Expertise &amp; Disciplines
                            </span>
                            <Link
                              href="/services"
                              className="text-xs font-semibold text-[var(--gold)] hover:underline flex items-center gap-1"
                            >
                              <span>Overview</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </Link>
                          </div>

                          <div className="mt-3 grid grid-cols-12 gap-4">
                            {/* Services List */}
                            <div className="col-span-7 space-y-1">
                              {services.map((s, idx) => {
                                const isCur = hoveredService === idx;
                                return (
                                  <Link
                                    key={s.slug}
                                    href={`/services/${s.slug}`}
                                    onMouseEnter={() => setHoveredService(idx)}
                                    className={`group flex flex-col rounded-[var(--r-md)] p-3 transition-all duration-200 ${
                                      isCur ? 'bg-[var(--void)]' : 'hover:bg-[var(--void)]/50'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={`text-sm font-medium transition-colors ${
                                          isCur ? 'text-[var(--gold)] font-semibold' : 'text-[var(--ivory)]'
                                        }`}
                                      >
                                        {s.title}
                                      </span>
                                      <ArrowUpRight
                                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                          isCur
                                            ? 'text-[var(--brass)] translate-x-0.5 -translate-y-0.5'
                                            : 'text-transparent'
                                        }`}
                                      />
                                    </div>
                                    <p className="mt-1 text-xs text-[var(--sage)] line-clamp-1">
                                      {s.navDescription}
                                    </p>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Preview Plate */}
                            <div className="col-span-5 flex flex-col justify-between overflow-hidden rounded-[var(--r-md)] border border-[var(--line-soft)] bg-[var(--graphite)] p-2">
                              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--r-sm)]">
                                <Picture
                                  name={services[hoveredService]?.hero.image || 'city-blue-night'}
                                  alt={services[hoveredService]?.hero.imageAlt || ''}
                                  sizes="200px"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <span className="absolute bottom-2 left-2 text-[0.625rem] uppercase tracking-wider text-[#e8c89b] font-medium">
                                  {services[hoveredService]?.index} · {services[hoveredService]?.slug}
                                </span>
                              </div>
                              <p className="p-2 text-[0.6875rem] text-[var(--stone)] leading-relaxed">
                                Confidential strategic advisory based in Dubai DMCC.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : active ? 'true' : undefined}
                    className={`group relative block py-2 text-[0.875rem] font-medium tracking-tight transition-colors duration-300 ${
                      active ? 'text-[var(--ivory)] font-semibold' : 'text-[var(--sage)] hover:text-[var(--ivory)]'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[var(--brass)] transition-transform duration-300 ease-out ${
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

          {/* Right Header Actions: Theme Toggle & Primary Contact Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => openEnquiryModal()}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-none border border-[var(--brass)] bg-[var(--ivory)] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] shadow-sm transition-all duration-300 hover:bg-[var(--brass)] hover:text-white cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.5}
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* Mobile Navigation Trigger & Theme Toggle */}
          <div className="relative z-10 flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--plate)]/80 text-[var(--ivory)] shadow-[var(--control-shadow)] backdrop-blur-md transition-colors duration-300 hover:border-[var(--brass)] hover:text-[var(--gold)]"
            >
              <span className="flex w-4 flex-col items-end gap-[5px]">
                <span className="block h-[1.5px] w-full bg-current transition-all duration-300" />
                <span className="block h-[1.5px] w-2/3 bg-current transition-all duration-300 group-hover:w-full" />
                <span className="block h-[1.5px] w-4/5 bg-current transition-all duration-300" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
