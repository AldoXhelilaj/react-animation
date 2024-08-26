/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   
    extend: {
      boxShadow:{
        'custom': '-1px 5px 8px 2px #e5e7eb',
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