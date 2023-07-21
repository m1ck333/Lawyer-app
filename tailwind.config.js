/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        "main-dark": "#2C3333",
        "minor-dark": "#2E4F4F",
        "minor-light": "#0E8388",
        "main-light": "#CBE4DE",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}