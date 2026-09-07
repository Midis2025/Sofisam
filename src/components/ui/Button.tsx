'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Tone = 'dark' | 'light';
type Variant = 'solid' | 'outline';

interface BaseProps {
  children: ReactNode;
  tone?: Tone;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
}

const shell =
  'group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden ' +
  'min-h-[3rem] px-7 py-[0.95rem] sm:px-9 sm:py-[1.05rem] ' +
  'text-[0.7rem] font-medium uppercase tracking-[0.22em] leading-none ' +
  'transition-colors duration-500 ease-premium';

function toneClasses(tone: Tone, variant: Variant) {
  if (variant === 'solid') {
    return tone === 'dark'
      ? 'border border-ink bg-ink text-bone hover:text-ink'
      : 'border border-bone bg-bone text-ink hover:text-bone';
  }
  return tone === 'dark'
    ? 'border border-ink/25 text-ink hover:text-bone'
    : 'border border-bone/35 text-bone hover:text-ink';
}

function fillClasses(tone: Tone, variant: Variant) {
  // The masked fill that sweeps in on hover.
  if (variant === 'solid') {
    return tone === 'dark' ? 'bg-gold' : 'bg-ink';
  }
  return tone === 'dark' ? 'bg-ink' : 'bg-gold';
}

function Inner({
  children,
  tone,
  variant,
  withArrow,
}: {
  children: ReactNode;
  tone: Tone;
  variant: Variant;
  withArrow: boolean;
}) {
  return (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[600ms] ease-premium group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100 ${fillClasses(
          tone,
          variant,
        )}`}
      />
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="relative z-10 h-[0.95rem] w-[0.95rem] transition-transform duration-500 ease-premium group-hover/btn:translate-x-1"
          strokeWidth={1.5}
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  children,
  tone = 'dark',
  variant = 'solid',
  className = '',
  withArrow = true,
}: BaseProps & { href: string }) {
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  const cls = `${shell} ${toneClasses(tone, variant)} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls}>
        <Inner tone={tone} variant={variant} withArrow={withArrow}>
          {children}
        </Inner>
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      <Inner tone={tone} variant={variant} withArrow={withArrow}>
        {children}
      </Inner>
    </Link>
  );
}

export function ButtonSubmit({
  children,
  tone = 'dark',
  variant = 'solid',
  className = '',
  withArrow = true,
  disabled,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${shell} ${toneClasses(tone, variant)} disabled:cursor-not-allowed disabled:opacity-55 ${className}`}
      {...rest}
    >
      <Inner tone={tone} variant={variant} withArrow={withArrow}>
        {children}
      </Inner>
    </button>
  );
}
