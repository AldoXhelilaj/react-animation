/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   
    extend: {
      boxShadow:{
        'custom': '-6px -2px 5px 2px #33292B',
      },
      colors: {
        'white': '#FFFFFF',
        'primary-red': '#D60C3E',
        'secondary-gray': '#33292B',
      },
      fontFamily: {
        poppins: ['Poppins'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  
  ],
  // corePlugins: {
  //   preflight: false,
  // },
}