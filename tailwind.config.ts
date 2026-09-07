import type { Config } from 'tailwindcss';

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
      // Full integer opacity scale. The default scale only has 5% steps, and
      // any other value (e.g. `border-ink/12`) silently produces no rule.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
      ),
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        900: '900ms',
        1200: '1200ms',
      },
      colors: {
        ink: {
          DEFAULT: '#0B0B0C',
          900: '#0B0B0C',
          800: '#131315',
          700: '#1B1B1E',
          600: '#242428',
          500: '#33333A',
        },
        bone: {
          DEFAULT: '#F6F4EF',
          100: '#FBFAF7',
          200: '#F6F4EF',
          300: '#EDEAE2',
          400: '#DFDBD1',
        },
        gold: {
          DEFAULT: '#C5A47E',
          light: '#D9BE9C',
          deep: '#A68A68',
          dark: '#8A7154',
        },
        graphite: {
          DEFAULT: '#6E6E76',
          light: '#9A9AA2',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
        label: '0.22em',
        'label-wide': '0.3em',
      },
      maxWidth: {
        editorial: '68rem',
        prose: '38rem',
        wide: '90rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'slow-drift': {
          '0%,100%': { transform: 'scale(1.06) translate3d(0,0,0)' },
          '50%': { transform: 'scale(1.12) translate3d(0,-1.5%,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'line-grow': 'line-grow 1.2s cubic-bezier(0.16,1,0.3,1) both',
        'slow-drift': 'slow-drift 28s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
