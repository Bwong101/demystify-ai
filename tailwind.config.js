/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Night-mode Organic Tech palette
        void: '#0D0F0E', // near-black with green undertone (background)
        moss: '#2E4036', // primary surfaces
        'moss-light': '#3d5449',
        clay: '#CC5833', // accent
        'clay-light': '#e0704a',
        cream: '#F2F0E9', // primary text
        charcoal: '#1A1A1A', // dark text
        'surface-1': '#141714', // slightly lighter dark
        'surface-2': '#1c201d', // card surfaces
        'surface-3': '#232823', // elevated surfaces
        border: '#2a2f2b', // subtle borders
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3rem',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'blink': 'blink 1s step-end infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        'blink': {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
