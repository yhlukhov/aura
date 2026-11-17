import * as stylex from '@stylexjs/stylex'
import { colors } from '@/components/channel-list-view/tokens.stylex'

export const channelActionButton = stylex.create({
  root: {
    display: 'inline-flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '38px',
    paddingBlock: '8px',
    paddingInline: '18px',
    border: '1px solid',
    borderColor: colors.darkPink,
    borderRadius: '999px',
    backgroundColor: colors.darkPink,
    color: colors.white,
    fontSize: '14px',
    fontWeight: 600,
    transitionProperty: 'background-color, color',
    transitionDuration: '160ms',
    ':hover': {
      backgroundColor: colors.white,
      color: colors.darkPink,
    },
    ':focus-visible': {
      outline: '3px solid',
      outlineColor: colors.gold,
      outlineOffset: '3px',
    },
  },
})
