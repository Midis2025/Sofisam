'use client';

import { Moon, Sun } from 'lucide-react';

import { setTheme, useTheme } from '@/lib/theme';

/**
 * The theme switch.
 *
 * A small pill of the site's glass with a sun at one end and a moon at the
 * other; a champagne ring rests under whichever is in force and travels to
 * the other on a change. The state is carried by the ring's position and by
 * the button's name as well as by colour, so it never depends on colour
 * alone. The styling lives in `globals.css` under `.theme-toggle`.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';
  const label = `Switch to ${next} mode`;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className={`theme-toggle ${className}`}
    >
      <span aria-hidden className="theme-toggle__knob" />
      <span aria-hidden className="theme-toggle__icon theme-toggle__sun">
        <Sun strokeWidth={1.5} />
      </span>
      <span aria-hidden className="theme-toggle__icon theme-toggle__moon">
        <Moon strokeWidth={1.5} />
      </span>
    </button>
  );
}
