module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',
          '0': '0',
          '2': '2px',
        '3': '3px',
          '4': '4px',
        '5': '5px',
        '8': '8px',
      },
      height: {
        '18': '4.5rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
