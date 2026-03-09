/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0E1B2A',
        beige: '#E6DCCB',
        anthracite: '#2B2E34',
        warmwhite: '#F7F6F3',
        gold: '#B8A46A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Libre Baskerville"', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
