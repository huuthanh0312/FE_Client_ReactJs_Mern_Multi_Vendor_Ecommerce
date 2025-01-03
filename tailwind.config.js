/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    },
    screens: {
      '3xl': { max: '1920px' }, // Extra large screens (4K monitors or very large desktops)
      '2xl': { max: '1536px' }, // Large laptops or high-resolution desktop screens
      xl: { max: '1280px' }, // Standard desktops or smaller widescreen monitors
      lg: { max: '1024px' }, // Smaller laptops or large tablets in landscape mode
      'md-lg': { max: '991px' }, // Transitional breakpoint between large tablets and smaller devices
      md: { max: '768px' }, // Medium devices like tablets in portrait mode
      sm: { max: '640px' }, // Large mobile phones or small tablets
      xs: { max: '480px' }, // Medium-sized mobile phones
      '2xs': { max: '360px' } // Small mobile phones or older devices
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '576px', // Small devices (≥ 576px)
        md: '720px', // Medium devices (≥ 720px)
        lg: '1024px', // Large devices (≥ 960px)
        xl: '1280px', // Extra large devices (≥ 1140px)
        '2xl': '1536px' // 2XL devices (≥ 1320px)
      }
    }
  },
  plugins: []
}
