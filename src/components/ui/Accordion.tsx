'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

export interface AccordionItem {
  label: string;
  title: string;
  body: string;
}

/**
 * Editorial accordion. Reports the open index upward so an adjacent
 * sticky image can follow the reader.
 */
export function Accordion({
  items,
  tone = 'light',
  onChange,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  tone?: 'light' | 'dark';
  onChange?: (index: number) => void;
  defaultOpen?: number;
}) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen);

  const border = tone === 'dark' ? 'border-bone/12' : 'border-ink/12';
  const heading = tone === 'dark' ? 'text-bone' : 'text-ink';
  const muted = tone === 'dark' ? 'text-bone/55' : 'text-ink/60';

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    setOpen(next);
    if (next !== null) onChange?.(next);
  };

  return (
    <ul className={`border-t ${border}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.title} className={`border-b ${border}`}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                onFocus={() => onChange?.(i)}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${i}`}
                id={`${id}-trigger-${i}`}
                className="group flex w-full items-start justify-between gap-6 py-7 text-left"
              >
                <span className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-7">
                  <span className="t-label shrink-0 text-gold sm:w-[9rem]">
                    {item.label}
                  </span>
                  <span
                    className={`font-display text-[clamp(1.35rem,2.6vw,2.05rem)] leading-tight tracking-tight transition-colors duration-500 ${heading} ${
                      isOpen ? 'text-gold' : 'group-hover:text-gold'
                    }`}
                  >
                    {item.title}
                  </span>
                </span>

                <span
                  aria-hidden
                  className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-premium ${
                    tone === 'dark'
                      ? 'border-bone/20 text-bone/60'
                      : 'border-ink/15 text-ink/50'
                  } ${isOpen ? 'rotate-45 border-gold bg-gold text-ink' : ''}`}
                >
                  <Plus strokeWidth={1.4} className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={`${id}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${id}-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p
                    className={`max-w-[58ch] pb-8 text-[0.98rem] font-light leading-relaxed sm:pl-[calc(9rem+1.75rem)] ${muted}`}
                  >
                    {item.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
