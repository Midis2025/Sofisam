import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Tone = 'dark' | 'light';
type Variant = 'solid' | 'outline';

interface BaseProps {
  children: ReactNode;
  /** `dark` sits on ivory, `light` sits on obsidian. */
  tone?: Tone;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  /** The header's control height. */
  size?: 'md' | 'sm';
}

/**
 * The site's actions.
 *
 * A button is a pane of glass: translucent, the ground blurred behind it,
 * a rim of light on its upper edge, and layered shadow for the gap
 * underneath. On hover it rises three pixels, grows three per cent, and a
 * soft streak crosses its face — one long curve, no overshoot, nothing
 * that follows the pointer. The whole treatment lives in `globals.css`
 * under `.btn`, so every action on the site is the same object.
 */

/**
 * Spelled out rather than composed. Tailwind decides what to keep in the
 * built stylesheet by looking for class names in the source, so a name
 * assembled at runtime is a name it never sees — and silently drops.
 */
const VARIANT: Record<Tone, Record<Variant, string>> = {
  dark: { solid: 'btn-dark-solid', outline: 'btn-dark-outline' },
  light: { solid: 'btn-light-solid', outline: 'btn-light-outline' },
};

function classes(tone: Tone, variant: Variant, size: 'md' | 'sm') {
  return `btn ${VARIANT[tone][variant]}${size === 'sm' ? ' btn-sm' : ''}`;
}

function Inner({ children, withArrow }: { children: ReactNode; withArrow: boolean }) {
  return (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="btn-arrow h-[0.95rem] w-[0.95rem]"
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
  size = 'md',
}: BaseProps & { href: string }) {
  const external =
    href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  const cls = `${classes(tone, variant, size)} ${className}`;
  const inner = <Inner withArrow={withArrow}>{children}</Inner>;

  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function ButtonSubmit({
  children,
  tone = 'dark',
  variant = 'solid',
  className = '',
  withArrow = true,
  size = 'md',
  disabled,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${classes(tone, variant, size)} ${className}`}
      {...rest}
    >
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}
