'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { Magnetic } from '@/components/ui/Magnetic';

type Tone = 'dark' | 'light';
type Variant = 'solid' | 'outline';

interface BaseProps {
  children: ReactNode;
  /** `dark` sits on ivory, `light` sits on obsidian. */
  tone?: Tone;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
}

const shell =
  'group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden ' +
  'min-h-[3.25rem] px-8 py-[1rem] sm:px-10 sm:py-[1.1rem] ' +
  'text-[0.72rem] font-medium uppercase tracking-[0.22em] leading-none ' +
  'rounded-full transition-colors duration-500 ease-premium';

function toneClasses(tone: Tone, variant: Variant) {
  if (variant === 'solid') {
    return tone === 'dark'
      ? 'border border-ink bg-ink text-ivory hover:text-ink'
      : 'border border-ivory bg-ivory text-ink hover:text-ivory';
  }
  return tone === 'dark'
    ? 'border border-ink/25 text-ink hover:text-ivory'
    : 'border border-ivory/30 text-ivory hover:text-ink';
}

/** The masked fill that sweeps up on hover. */
function fillClasses(tone: Tone, variant: Variant) {
  if (variant === 'solid') return tone === 'dark' ? 'bg-gold' : 'bg-ink';
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
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[650ms] ease-premium group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100 ${fillClasses(
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

function Wrap({
  magnetic,
  className,
  children,
}: {
  magnetic: boolean;
  className: string;
  children: ReactNode;
}) {
  if (!magnetic) return <>{children}</>;
  return <Magnetic className={className}>{children}</Magnetic>;
}

export function ButtonLink({
  href,
  children,
  tone = 'dark',
  variant = 'solid',
  className = '',
  withArrow = true,
  magnetic = true,
}: BaseProps & { href: string; /** Magnetic pull on hover. */ magnetic?: boolean }) {
  const external =
    href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  const cls = `${shell} ${toneClasses(tone, variant)} ${className}`;

  const inner = (
    <Inner tone={tone} variant={variant} withArrow={withArrow}>
      {children}
    </Inner>
  );

  return (
    <Wrap magnetic={magnetic} className={className.includes('w-full') ? 'w-full' : ''}>
      {external ? (
        <a href={href} className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </Wrap>
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
