/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.html", "./public/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    themes: ["dim"] // You can change this theme if you like
  }
};
