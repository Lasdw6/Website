/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        minimal: {
          black: '#0f1419',
          'black-alt': '#1a1f2e',
          grey: '#b8c5d6',
          'grey-light': '#d4dde8',
          'grey-dark': '#6b7a8f',
          'grey-darker': '#2d3441',
          red: '#4a9eff',
          'red-dark': '#2d7fd9',
          'red-light': '#6bb3ff',
        }
      }
    },
  },
  plugins: [],
} 