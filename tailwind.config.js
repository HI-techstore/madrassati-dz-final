/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#0f1729',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e293b',
        }
      }
    },
  },
  plugins: [],
};