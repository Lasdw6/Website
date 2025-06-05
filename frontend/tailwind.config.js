/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          tertiary: '#404040',
          text: '#e5e5e5',
          muted: '#a3a3a3',
        }
      }
    },
  },
  plugins: [],
} 