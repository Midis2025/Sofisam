import type { Config } from 'tailwindcss';

/**
 * The palette below mirrors the custom properties in globals.css. Tailwind
 * utilities are used for composition and state; the design tokens themselves
 * live in one place so a colour is never defined twice.
 *
 * Every colour resolves through a channel variable (`--ivory-rgb` and so on)
 * so that the light theme can redefine the palette in one place and every
 * utility — opacity modifiers included — follows it. The names describe the
 * dark theme, which is the site's own: in the light theme `void` is the ivory
 * page and `ivory` is the charcoal type set on it. `ink` is type set on an
 * `ivory` or champagne fill; `paper` is type that is light in both themes.
 */
const c = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

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
        void: c('void'),
        char: c('char'),
        graphite: c('graphite'),
        ink: c('ink'),
        paper: c('paper'),
        ivory: {
          DEFAULT: c('ivory'),
          2: c('ivory-2'),
        },
        gold: {
          DEFAULT: c('gold'),
          hi: c('gold-hi'),
          deep: c('gold-deep'),
        },
        sage: c('sage'),
        stone: c('stone'),
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
