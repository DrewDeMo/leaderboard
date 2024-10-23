// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'tcl-orange': {
          DEFAULT: '#CC5500',
          50: '#FFE7D6',
          100: '#FFDBC2',
          200: '#FFC499',
          300: '#FFAC70',
          400: '#FF9447',
          500: '#FF7C1F',
          600: '#F56600',
          700: '#CC5500',
          800: '#943E00',
          900: '#5C2600',
          950: '#401B00'
        }
      }
    },
  },
  plugins: [],
}
