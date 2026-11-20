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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#00A859', // Official EVOS signature green
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          dark: '#131512',
          surface: '#1D2019',
          card: '#23271E',
          cardHover: '#2C3227',
          border: '#353B2F',
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

