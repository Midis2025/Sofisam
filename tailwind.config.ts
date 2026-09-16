import type { Config } from 'tailwindcss';

/**
 * The palette below mirrors the custom properties in globals.css. Tailwind
 * utilities are used for composition and state; the design tokens themselves
 * live in one place so a colour is never defined twice.
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
      // (e.g. `border-ink/12`) silently produces no rule.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
      ),
      transitionDuration: {
        400: '400ms',
      },
      // One entry per token that utilities actually reference. Everything
      // else lives as a custom property in globals.css.
      colors: {
        ink: '#0A0A0B',
        ivory: '#F5F2EC',
        gold: {
          DEFAULT: '#C5A47E',
          deep: '#A2865F',
          ink: '#7D6038',
        },
        stone: '#67625A',
        sage: '#A5A199',
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
      },
      animation: {
        'slow-drift': 'slow-drift 32s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
