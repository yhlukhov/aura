import * as stylex from '@stylexjs/stylex'

export const breadcrumb = stylex.create({
  link: {
    display: 'inline-block',
    paddingBottom: '1px',
    textTransform: 'uppercase',
    fontSize: '14px',
    letterSpacing: '0.12em',
    backgroundImage: 'linear-gradient(currentColor, currentColor)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 100%',
    backgroundSize: '0% 2px',
    transitionProperty: 'background-size',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
    ':hover': {
      backgroundSize: '100% 2px',
    },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0ms',
    },
  },
  channel: {
    textTransform: 'uppercase',
  },
})
