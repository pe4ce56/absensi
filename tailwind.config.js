module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        5: '5px',
        6: '6px',
        8: '8px',
      },
      height: {
        18: '4.5rem',
      },
      colors: {
        ijo: '#00B389',
        biru: '#00A1E9',
        abang: '#F0725E',
        abu: '#C4C4C4',
        ireng: '#3A4856',
      },
      fontSize: {
        tiny: '.975rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
