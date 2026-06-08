import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2.5rem',
        xl: '3.5rem',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        cream: 'hsl(var(--color-cream) / <alpha-value>)',
        sand: 'hsl(var(--color-sand) / <alpha-value>)',
        olive: 'hsl(var(--color-olive) / <alpha-value>)',
        terracotta: 'hsl(var(--color-terracotta) / <alpha-value>)',
        ink: 'hsl(var(--color-ink) / <alpha-value>)',
        muted: 'hsl(var(--color-muted) / <alpha-value>)',

        background: 'hsl(var(--color-olive) / <alpha-value>)',
        'background-alt': 'hsl(var(--color-ink) / <alpha-value>)',
        text: 'hsl(var(--color-cream) / <alpha-value>)',
        'text-muted': 'hsl(var(--color-sand) / <alpha-value>)',
        accent: 'hsl(var(--color-terracotta) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        script: ['var(--font-script)', 'ui-serif', 'cursive'],
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.18em',
      },
      maxWidth: {
        prose: '62ch',
        wrap: '1440px',
      },
      spacing: {
        section: 'clamp(5rem, 10vw, 9rem)',
        'section-sm': 'clamp(3rem, 6vw, 5rem)',
      },
      fontSize: {
        display: ['clamp(2.5rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        hero: ['clamp(1.85rem, 4.8vw, 4rem)', { lineHeight: '1.05', letterSpacing: '0' }],
        eyebrow: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
