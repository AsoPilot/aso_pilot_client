/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      fontFamily: {
        'display': ['Lato', 'Arial', 'sans-serif'],
        'body': ['Lato', 'Arial', 'sans-serif'],
      },
      extend: {
        spacing: {
          'xs': '0.5rem',
          'sm': '0.75rem',
          'base': '1rem',
          'md': '1.5rem',
          'lg': '2rem',
        }
      }
    },
  }