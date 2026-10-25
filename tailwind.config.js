/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vita: {
          dark: '#071317',
          deep: '#0B1C22',
          surface: '#0F262E',
          card: '#14313B',
          cardHover: '#1A3C47',
          border: '#1D4552',
          borderLight: '#2A5D6E',
          gold: '#C98833',       // Eloura Journeys bespoke gold
          goldLight: '#DE9F4D',
          amber: '#FBA13A',      // Vita Travel warm accent
          emerald: '#10B981',    // Verified Wi-Fi
          muted: '#8EA4AB',
          light: '#FAFDFD',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
