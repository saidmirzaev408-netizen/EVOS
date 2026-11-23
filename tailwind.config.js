/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        evos: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#e11d48',
          600: '#9B1832', // Luxury Burgundy signature
          700: '#881337',
          800: '#4c0519',
          900: '#2b030e',
          dark: '#18090E',
          surface: '#250C14',
          card: '#2A0E17',
          cardHover: '#381420',
          border: '#4A1A27',
          gold: '#F3BE53',
          goldHover: '#E5A934',
          goldLight: '#FEF3C7',
          goldDark: '#B45309'
        }
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

