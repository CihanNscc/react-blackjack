/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0px 10px 10px rgba(0, 0, 0, 0.50)'
      }
    },
  },
  plugins: [],
}
