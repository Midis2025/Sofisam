import type { Config } from 'tailwindcss';

/**
 * The palette below mirrors the custom properties in globals.css. Tailwind
 * utilities are used for composition and state; the design tokens themselves
 * live in one place so a colour is never defined twice.
 *
 * The site has one ground — near-black at three depths — so there is no light
 * counterpart to any of these. `ink` exists only for type set on an ivory or
 * champagne fill.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1800px',
    },
    extend: {
      // The default opacity scale only has 5% steps, and any other value
      // (e.g. `border-ivory/12`) silently produces no rule.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
      ),
      transitionDuration: {
        400: '400ms',
      },
      colors: {
        void: '#050505',
        char: '#0B0B0D',
        graphite: '#131316',
        ink: '#050505',
        ivory: {
          DEFAULT: '#F2EEE6',
          2: '#DED8CC',
        },
        gold: {
          DEFAULT: '#C9A97C',
          hi: '#E3CBA4',
          deep: '#9E8154',
        },
        sage: '#979187',
        stone: '#847E75',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'slow-drift': {
          '0%,100%': { transform: 'scale(1.06) translate3d(0,0,0)' },
          '50%': { transform: 'scale(1.13) translate3d(0,-1.5%,0)' },
        },
        'pulse-node': {
          '0%,100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.35)' },
        },
      },
      animation: {
        'slow-drift': 'slow-drift 32s ease-in-out infinite',
        'pulse-node': 'pulse-node 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
