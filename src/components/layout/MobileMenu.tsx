'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';

import { navItems } from './nav-data';
import { contact } from '@/data/site';

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);

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

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Reset accordion when reopened.
  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[110] flex flex-col bg-ink text-bone lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Top bar */}
          <div className="shell flex h-[4.5rem] shrink-0 items-center justify-between">
            <Link href="/" onClick={onClose} aria-label="SOFISAM FZCO — home">
              <img
                src="/logo.png"
                alt="SOFISAM FZCO"
                width={834}
                height={209}
                className="h-[1.6rem] w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-bone/80 transition-colors hover:text-gold"
            >
              <X strokeWidth={1.25} className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <nav
            aria-label="Mobile"
            className="no-scrollbar flex-1 overflow-y-auto overscroll-contain"
          >
            <ul className="shell pb-8 pt-4">
              {navItems.map((item, i) => {
                const n = String(i + 1).padStart(2, '0');
                const hasChildren = Boolean(item.children);
                const isOpen = expanded === item.label;

                return (
                  <motion.li
                    key={item.href}
                    className="border-b border-bone/12"
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.14 + i * 0.055 }}
                  >
                    <div className="flex items-stretch">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex flex-1 items-baseline gap-4 py-[1.15rem] pr-3"
                      >
                        <span className="t-index text-[0.7rem] text-gold">{n}</span>
                        <span
                          className={`font-display text-[2rem] leading-none tracking-tighter transition-colors duration-300 xs:text-[2.35rem] ${
                            isActive(item.href) ? 'text-gold' : 'text-bone'
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.label}`}
                          className="flex w-12 shrink-0 items-center justify-center text-bone/60 transition-colors hover:text-gold"
                        >
                          {isOpen ? (
                            <Minus strokeWidth={1.25} className="h-5 w-5" />
                          ) : (
                            <Plus strokeWidth={1.25} className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {hasChildren && isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden"
                        >
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="flex min-h-[3rem] flex-col justify-center border-l border-gold/40 py-3 pl-5"
                              >
                                <span className="text-[1.0625rem] font-light tracking-tight text-bone/90">
                                  {child.label}
                                </span>
                                <span className="mt-1 text-[0.78rem] font-light leading-snug text-bone/45">
                                  {child.description}
                                </span>
                              </Link>
                            </li>
                          ))}
                          <li className="h-3" aria-hidden />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>

            {/* Contact block */}
            <motion.div
              className="shell pb-12"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.44 }}
            >
              <p className="t-label text-gold">Contact</p>
              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="link-underline block text-[1.0625rem] font-light text-bone/85"
                >
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="link-underline block text-[1.0625rem] font-light text-bone/85"
                >
                  {contact.phone}
                </a>
              </div>
              <address className="mt-6 text-[0.86rem] font-light not-italic leading-relaxed text-bone/45">
                {contact.address.line1}
                <br />
                {contact.address.line2}
              </address>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
