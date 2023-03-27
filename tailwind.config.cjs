/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'LibreBaskerville': ['Libre Baskerville', 'serif'],
        'RobotoSlab': ['Roboto Slab', 'serif'],
        'Quicksand': ['Quicksand', 'sans-serif']
      },
      dropShadow: {
        '3xl': '0px 10px 10px rgba(0, 0, 0, 0.50)',
        '4xl': '0px 3px 3px rgba(0, 0, 0, 0.60)'
      }
    },
  },
  plugins: [],
}
