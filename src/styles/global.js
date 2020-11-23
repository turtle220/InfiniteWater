import {getRemValue, LINE_HEIGHT} from './theme'

const globalStyles = (theme) => (
  {
    '@global': {
      '@import': [
        'url(https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css)'
      ],
      '@font-face': [{
        fontFamily: 'Montserrat',
        src: "url('/fonts/Montserrat-Regular.woff2') format('woff2'), url('/fonts/Montserrat-Regular.woff') format('woff')",
        fontWeight: 400,
        fontStyle: 'normal'
      },
      {
        fontFamily: 'Montserrat',
        src: "url('/fonts/Montserrat-Light.woff2') format('woff2'), url('/fonts/Montserrat-Light.woff') format('woff')",
        fontWeight: 300,
        fontStyle: 'normal'
      },
      {
        fontFamily: 'Montserrat',
        src: "url('/fonts/Montserrat-Bold.woff2') format('woff2'), url('/fonts/Montserrat-Bold.woff') format('woff')",
        fontWeight: 700,
        fontStyle: 'normal'
      }],
      html: {
        fontFamily: theme.fonts.body,
        boxSizing: 'border-box',
        fontSize: theme.base.fontSize,
        '-webkit-font-smoothing': 'antialiased',
        lineHeight: theme.base.lineHeight,
        fontWeight: 400,
        color: theme.colors.primary
      },
      body: {
        margin: 0,
        backgroundColor: theme.colors.background
      },
      '*, *::before, *::after': {
        boxSizing: 'inherit'
      },
      'a > img': {
        border: 0
      },
      'textarea, input, button': {
        fontFamily: 'Montserrat',
        fontSize: theme.base.fontSize,
        '&:focus': {
          // IE11 will apply a red outline to :invalid inputs after form submit, but not to :focus:invalid
          // inputs because of this rule. It would be nice to not apply this outline:none rule to those
          // inputs so that the red outline stays while you fix the validation error - but the :valid and
          // :invalid pseudoclasses apply even before you submit, so using :focus:valid or
          // :focus:not(:invalid) is no good either. We'll just have to live with the red outline appearing
          // and disappearing on IE after submit
          outline: 'none'
        },
        // Firefox has a browser style for :-moz-ui-invalid that sets a red outline via a boxShadow, and it
        // is applied on initial page load (pre-submit) - turn that off
        boxShadow: 'none'
      },
      'nav > ul': {
        listStyleType: 'none',
        margin: 0,
        padding: 0
      },
      '.sr-only': {
        position: 'absolute !important',
        width: 1,
        height: 1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)'
      },
      'p, h1, h2, h3, h4, h5, h6, section, aside, ul': {
        margin: 0,
        marginBottom: `${LINE_HEIGHT}rem`
      },
      'h1, h2, h3, h4, h5': {
        fontFamily: theme.fonts.heading,
        fontStyle: 'normal',
        fontWeight: 300
      },
      h1: {
        fontSize: getRemValue(28),
        lineHeight: getRemValue(32),
        [theme.breakpoints.up('sm')]: {
          fontSize: getRemValue(36),
          lineHeight: getRemValue(48)
        },
        [theme.breakpoints.up('md')]: {
          fontSize: getRemValue(48),
          lineHeight: getRemValue(56)
        }
      },
      h2: {
        fontSize: getRemValue(32),
        lineHeight: getRemValue(36),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.getRemValue(40),
          lineHeight: getRemValue(56)
        }
      },
      h3: {
        fontSize: theme.getRemValue(28),
        lineHeight: getRemValue(32),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.getRemValue(36),
          lineHeight: getRemValue(42)
        }
      },
      h4: {
        fontSize: theme.getRemValue(28)
      },
      h5: {
        fontSize: theme.getRemValue(20)
      },
      'a': {
        fontStyle: 'normal',
        fontWeight: 700,
        color: theme.colors.primary,
        textDecoration: 'none',
        '&:hover': {
          color: theme.colors.water
        },
        fontSize: theme.getRemValue(14),
        [theme.breakpoints.up('md')]: {
          fontSize: theme.getRemValue(16)
        }
      },
      '::-webkit-input-placeholder': { /* Chrome */
        color: theme.colors.skin,
        transition: 'opacity 250ms ease-in-out'
      },
      ':focus::-webkit-input-placeholder': {
        opacity: 0.5
      },
      ':-ms-input-placeholder': { /* IE 10+ */
        color: theme.colors.skin,
        transition: 'opacity 250ms ease-in-out'
      },
      ':focus:-ms-input-placeholder': {
        opacity: 0.5
      },
      '::-moz-placeholder': { /* Firefox 19+ */
        color: theme.colors.skin,
        opacity: 1,
        transition: 'opacity 250ms ease-in-out'
      },
      ':focus::-moz-placeholder': {
        opacity: 0.5
      },
      ':-moz-placeholder': { /* Firefox 4 - 18 */
        color: theme.colors.skin,
        opacity: 1,
        transition: 'opacity 250ms ease-in-out'
      },
      ':focus:-moz-placeholder': {
        opacity: 0.5
      },
      '.bar': {
        height: '5px !important'
      }
    }
  }
)

export default globalStyles
