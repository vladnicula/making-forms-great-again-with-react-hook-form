/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js',
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
