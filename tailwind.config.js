/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f6f4ee',
          100: '#e9e4d6',
          200: '#cbc4ad',
          300: '#a89f80',
          400: '#7e7558',
          500: '#5a523f',
          600: '#3a3528',
          700: '#211e15',
          800: '#15130c',
          900: '#0c0b07',
          950: '#070603',
        },
        titan: {
          gold: '#c89b3c',
          'gold-light': '#e8c468',
          'gold-dark': '#9a7530',
          teal: '#2dd4bf',
          'teal-deep': '#0d9488',
          rust: '#c2410c',
        },
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-gold':
          'radial-gradient(ellipse at center, rgba(200,155,60,0.22), transparent 60%)',
      },
      backgroundSize: { 'grid-32': '32px 32px' },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
