'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Loader2 } from 'lucide-react';
import React, { forwardRef } from 'react';

export type CanonicalVariant = 'primary' | 'secondary' | 'link' | 'icon';
export type ButtonVariant = CanonicalVariant | 'solid' | 'outline';
export type ButtonTone = 'auto' | 'light' | 'dark';
export type ButtonSize = 'md' | 'sm';
export type ButtonArrow = 'up-right' | 'right' | 'none';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  arrow?: ButtonArrow;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export type ButtonAsButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & {
    href?: undefined;
  };

export type ButtonAsLinkProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'size'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const BASE_STYLES =
  'group relative inline-flex items-center justify-center font-sans font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brass)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--void)] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer';

const VARIANT_STYLES: Record<CanonicalVariant, Record<ButtonTone, string>> = {
  primary: {
    auto: 'bg-[var(--ivory)] text-[var(--ink)] border border-[var(--brass)]/70 hover:bg-[var(--brass)] hover:text-white hover:border-[var(--brass)] shadow-sm rounded-[var(--r-sm)] uppercase tracking-[0.12em]',
    dark: 'bg-[#171717] text-[#F6F2EA] border border-[#C7A46A]/60 hover:bg-[#252528] hover:border-[#C7A46A] hover:text-white shadow-sm rounded-[var(--r-sm)] uppercase tracking-[0.12em]',
    light:
      'bg-[#F6F2EA] text-[#171717] border border-[#C7A46A]/60 hover:bg-[#C7A46A] hover:text-white hover:border-[#C7A46A] shadow-sm rounded-[var(--r-sm)] uppercase tracking-[0.12em]',
  },
  secondary: {
    auto: 'bg-transparent text-[var(--ivory)] border border-[var(--line-strong)] hover:border-[var(--brass)] hover:text-[var(--gold)] hover:bg-[var(--brass)]/5 rounded-[var(--r-sm)] uppercase tracking-[0.12em]',
    dark: 'bg-transparent text-[#171717] border border-[#171717]/30 hover:border-[#171717] hover:bg-[#171717]/5 rounded-[var(--r-sm)] uppercase tracking-[0.12em]',
    light:
      'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 rounded-[var(--r-sm)] uppercase tracking-[0.12em]',
  },
  link: {
    auto: 'bg-transparent text-[var(--ivory)] hover:text-[var(--gold)] uppercase tracking-[0.12em] p-0 min-h-0 border-none',
    dark: 'bg-transparent text-[#171717] hover:text-[#C7A46A] uppercase tracking-[0.12em] p-0 min-h-0 border-none',
    light:
      'bg-transparent text-white hover:text-[var(--gold)] uppercase tracking-[0.12em] p-0 min-h-0 border-none',
  },
  icon: {
    auto: 'rounded-full border border-[var(--line-strong)] bg-[var(--plate)]/80 text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--gold)] hover:bg-[var(--plate)] shadow-sm',
    dark: 'rounded-full border border-[#171717]/20 bg-white/80 text-[#171717] hover:border-[#C7A46A] hover:text-[#C7A46A] hover:bg-white shadow-sm',
    light:
      'rounded-full border border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 shadow-sm',
  },
};

const SIZE_STYLES: Record<CanonicalVariant, Record<ButtonSize, string>> = {
  primary: {
    md: 'min-h-[48px] px-7 sm:px-8 py-3.5 text-xs gap-2.5',
    sm: 'min-h-[40px] px-5 py-2.5 text-xs gap-2',
  },
  secondary: {
    md: 'min-h-[48px] px-7 sm:px-8 py-3.5 text-xs gap-2.5',
    sm: 'min-h-[40px] px-5 py-2.5 text-xs gap-2',
  },
  link: {
    md: 'text-xs gap-2',
    sm: 'text-[0.6875rem] gap-1.5',
  },
  icon: {
    md: 'h-11 w-11 min-h-[44px] min-w-[44px] p-0',
    sm: 'h-9 w-9 min-h-[36px] min-w-[36px] p-0',
  },
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant: rawVariant = 'primary',
    tone = 'auto',
    size = 'md',
    arrow = rawVariant === 'icon' ? 'none' : 'up-right',
    fullWidth = false,
    loading = false,
    className = '',
    children,
    ...rest
  } = props;

  const variant: 'primary' | 'secondary' | 'link' | 'icon' =
    rawVariant === 'solid'
      ? 'primary'
      : rawVariant === 'outline'
      ? 'secondary'
      : rawVariant;

  const resolvedArrow = variant === 'icon' ? 'none' : arrow;

  const classes = [
    BASE_STYLES,
    VARIANT_STYLES[variant][tone],
    SIZE_STYLES[variant][size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-current" />
      ) : null}
      {children ? <span>{children}</span> : null}
      {!loading && resolvedArrow === 'up-right' ? (
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.5}
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      ) : null}
      {!loading && resolvedArrow === 'right' ? (
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.5}
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  if ('href' in props && props.href) {
    const isExternal =
      props.href.startsWith('http') ||
      props.href.startsWith('mailto:') ||
      props.href.startsWith('tel:');

    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={props.href}
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        className={classes}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  const { type = 'button', disabled, ...buttonRest } =
    rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled || loading}
      className={classes}
      {...buttonRest}
    >
      {content}
    </button>
  );
});

/**
 * Backwards compatibility wrappers
 */
export function ButtonLink(
  props: ButtonBaseProps & { href: string; withArrow?: boolean }
) {
  const { withArrow = true, ...rest } = props;
  return (
    <Button
      {...rest}
      arrow={withArrow ? rest.arrow ?? 'up-right' : 'none'}
    />
  );
}

export function ButtonSubmit(
  props: ButtonBaseProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & { withArrow?: boolean }
) {
  const { withArrow = true, ...rest } = props;
  return (
    <Button
      type="submit"
      {...rest}
      arrow={withArrow ? rest.arrow ?? 'up-right' : 'none'}
    />
  );
}
