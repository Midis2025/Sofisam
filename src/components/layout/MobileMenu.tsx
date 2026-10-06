'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

import { navItems } from './nav-data';
import { contact } from '@/data/site';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen menu.
 *
 * The panel wipes down from the top edge, then the items arrive in sequence.
 * The three disciplines are listed under Services rather than folded behind a
 * toggle: on a phone an extra tap to see three lines is friction, not economy.
 *
 * The panel is the site's glass, at full height: the page stays visible
 * through it, heavily blurred and darkened. It is fixed to the frame and
 * nothing in it follows the pointer — a menu is a place, not an object.
 *
 * It is set entirely in the theme's own palette, and the switch sits beside
 * the close button, so a change of theme made here repaints the menu in place.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Lock background scroll without losing scroll position.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const y = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, y);
    };
  }, [open]);

  /* Focus. Opening the menu takes focus into it, Tab and Shift-Tab travel
     round the menu rather than out onto the page hidden behind it, and
     closing it hands focus back to whatever opened it — so a keyboard or
     screen-reader user is never left on an element they cannot see. */
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const items = Array.from(
        panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const at = document.activeElement;
      if (e.shiftKey && (at === first || !panel.current.contains(at))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (at === last || !panel.current.contains(at))) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
      // Only hand focus back if it is still inside the menu; a link that
      // navigated away has already moved it somewhere meaningful.
      if (opener && (!document.activeElement || document.activeElement === document.body || panel.current?.contains(document.activeElement))) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [open, onClose]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-tone-ignore
          className="fixed inset-0 z-[110] flex flex-col bg-void/[0.86] text-ivory backdrop-blur-3xl backdrop-saturate-150 lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="shell flex h-[4.5rem] shrink-0 items-center justify-between">
            <Link href="/" onClick={onClose} aria-label="SOFISAM FZCO — home">
              <Logo alt="SOFISAM FZCO" className="h-[2.5rem] w-auto" />
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                ref={closeButton}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="-mr-1 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 bg-ivory/[0.07] text-ivory/70 shadow-[var(--control-shadow)] backdrop-blur-md transition-colors duration-500 ease-premium hover:border-ivory/35 hover:bg-ivory/[0.13] hover:text-gold"
              >
                <X strokeWidth={1.25} className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav
            aria-label="Mobile"
            className="no-scrollbar flex-1 overflow-y-auto overscroll-contain"
          >
            <ul className="shell pb-10 pt-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-ivory/10"
                  initial={reduce ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: EASE, delay: 0.16 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? 'page' : isActive(item.href) ? 'true' : undefined}
                    className="flex items-center py-[1.15rem]"
                  >
                    <span
                      className={`font-display text-[2.1rem] leading-none tracking-tighter transition-colors duration-300 xs:text-[2.5rem] ${
                        isActive(item.href) ? 'text-gold' : 'text-ivory'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>

                  {item.children && (
                    <ul className="-mt-1 pb-5 pl-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            aria-current={pathname === child.href ? 'page' : undefined}
                            className="flex min-h-[2.75rem] items-center gap-3 py-1.5"
                          >
                            <span
                              aria-hidden
                              className="block h-px w-5 shrink-0 bg-gold/70"
                            />
                            <span className="text-[1.0625rem] font-light tracking-tight text-ivory/70">
                              {child.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="shell pb-14 pt-2"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            >
              <div className="surface">
                <p className="t-label text-gold">Contact</p>

                <div className="mt-5 flex flex-col items-start">
                  <a
                    href={`mailto:${contact.email}`}
                    className="link-underline py-[0.6rem] text-[1.0625rem] font-light text-ivory/85"
                  >
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="link-underline py-[0.6rem] text-[1.0625rem] font-light text-ivory/85"
                  >
                    {contact.phone}
                  </a>
                </div>

                <address className="mt-6 text-[0.86rem] font-light not-italic leading-relaxed text-stone">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </address>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
