/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      '3xl': { 'max': '1920px' },
      '2xl': { 'max': '1536px' },
      'xl': { 'max': '1200px' },
      'lg': { 'max': '1080px' },
      'md-lg': { 'max': '991px' },
      'md': { 'max': '768px' },
      'sm': { 'max': '576px' },
      'xs': { 'max': '480px' },
      '2xs': { 'max': '340px' },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '576px',   // Small devices (≥ 576px)
        md: '720px',   // Medium devices (≥ 720px)
        lg: '1024px',   // Large devices (≥ 960px)
        xl: '1280px',  // Extra large devices (≥ 1140px)
        '2xl': '1536px' // 2XL devices (≥ 1320px)
      },
    },
  },
  plugins: [],
}