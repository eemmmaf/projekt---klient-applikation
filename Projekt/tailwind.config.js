/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')


module.exports = {
  content:[
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        'main-color' : '#E8C3FE',
        'dark-color': '#1E012D',
        'medium-color' : '#8101C6;',
        'light-color': '#C080E2',
        'error': '#A80000'
      },
      fontFamily: {
        'headings': ['Manrope', 'Open-Sans', 'sans-serif'],
        'content': ['Open-sans','sans-serif']
    },
    container: {
      center: true,
    },
    fontSize: {
      sm: '1rem',
      base: '1.1rem',
      xl: '1.7rem',
      xxl: '2rem'
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
}
