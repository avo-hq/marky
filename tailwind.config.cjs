/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "plugin/**/*",
    "src/**/*"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}
