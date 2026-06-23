import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial / gallery palette: bone paper, ink, deep terracotta accent
        bone: '#f4f1ea',
        paper: '#faf8f3',
        ink: '#1a1714',
        'ink-soft': '#3a352f',
        terracotta: '#a8492f',
        'terracotta-deep': '#8a3a25',
        teal: '#1f5c5a',
        rule: '#d8d2c6',
      },
      fontFamily: {
        // Set via next/font CSS variables in layout
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        'ar-display': ['var(--font-ar-display)', 'serif'],
        'ar-body': ['var(--font-ar-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        smallcaps: '0.18em',
      },
      maxWidth: {
        editorial: '78rem',
      },
    },
  },
  plugins: [],
};

export default config;
