module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    stroke: theme => ({
      current: 'currentColor',
      green: theme('colors.status.enable-darker')
    }),
    fontFamily: {
      body: ['Fira\\ Code']
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      status: {
        red: '#fc8181',
        available: '#5cb85c',
        unavailable: '#ffc107'
      },
      grape: {
        100: '#EBE8ED',
        200: '#D8D1DC',
        300: '#C4BACA',
        400: '#B0A3B8',
        500: '#9684A1',
        600: '#887595',
        700: '#74627F',
        750: '#695973',
        800: '#5F5068',
        900: '#4A3E51'
      },
      yellow: {
        100: '#FEE1AF',
        200: '#FDD187',
        300: '#FCC25F',
        400: '#FBB337',
        500: '#FAA40F',
        600: '#DC8D04',
        700: '#B47304',
        800: '#8C5A03',
        900: '#644002'
      },
      kaki: {
        100: '#D0D1C7',
        200: '#BEBFB0',
        300: '#ABAD99',
        400: '#989B82',
        500: '#7C7F65',
        600: '#6F715B',
        700: '#595B49',
        800: '#424436',
        900: '#2C2D24'
      },
      duck: {
        100: '#36CED3',
        200: '#28B3B8',
        300: '#219397',
        400: '#1A7275',
        500: '#104547',
        600: '#0B3132',
        700: '#072121',
        800: '#041111',
        900: '#000000'
      },
      wildblue: {
        100: '#D7D9EA',
        200: '#B5B8D7',
        300: '#A2A6CD',
        400: '#888CBF',
        500: '#6D73B0',
        600: '#565C9F',
        700: '#474C85',
        800: '#393D6A',
        900: '#2B2E50'
      },
      orange: {
        100: '#F3D2CE',
        200: '#EBB3AD',
        300: '#D87D6D',
        400: '#D1604D',
        500: '#BB4430',
        600: '#A23C2A',
        700: '#823021',
        800: '#612419',
        900: '#411811'
      },
      gray: {
        platinum: '#e5e5e5',
        100: '#b8b8b8',
        200: '#a3a3a3',
        300: '#8f8f8f',
        400: '#7a7a7a',
        500: '#666666',
        600: '#525252',
        700: '#3d3d3d',
        800: '#292929',
        900: '#141414'
      },
      darkblue: {
        100: '#93AADC',
        200: '#7492D2',
        300: '#567AC8',
        400: '#3C64B9',
        500: '#32539A',
        600: '#28427B',
        700: '#1E325C',
        800: '#14213d',
        900: '#1A111F'
      }
    },
    extend: {
      fill: {
        none: 'none'
      },
      spacing: {
        '1/12': '8.333333%;',
        '2/12': '16.666667%;',
        '3/12': '25%;',
        '4/12': '33.333333%;',
        '5/12': '41.666667%;',
        '6/12': '50%;',
        '7/12': '58.333333%;',
        '8/12': '66.666667%;',
        '9/12': '75%;',
        '10/12': '83.333333%;',
        '11/12': '91.666667%;'
      },
      boxShadow: theme => ({
        planet: `inset -5rem -5rem 0${theme('colors.orange.600')}`
      }),
      screens: {
        hmd: { raw: '(max-height: 536px)' },
        hsm: { raw: '(max-height: 315px)' },
        xs: { raw: '(max-width: 375px)' }
      },
      strokeWidth: {
        3: 3,
        4: 4
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
        '-40': '-40'
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '0.875rem',
        '3xl': '1rem'
      },
      inset: {
        '1/5': '20%'
      }
    }
  },
  variants: {
    backdropFilter: ['responsive'] // defaults to ['responsive']
  },
  xwind: {
    mode: 'objectstyles'
  }
}
