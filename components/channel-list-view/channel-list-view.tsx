'use client'

import stylex from '@stylexjs/stylex'
import { Header } from './header'
import type { Channel } from '@/db/schema'
import { ChannelList } from './channel-list'
import { colors } from './tokens.stylex'

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(180deg, rgba(224, 247, 255, 0.32) 0%, rgba(255, 255, 255, 0.12) 48%, rgba(255, 247, 204, 0.3) 100%), url("/bg-light.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center 62%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    '@media (max-width: 700px)': {
      backgroundPosition: 'center center',
      backgroundAttachment: 'scroll',
    },
    color: colors.ink,
    paddingBlock: '48px',
    paddingInline: 'clamp(16px, 4vw, 64px)',
    boxSizing: 'border-box',
  },
})

export function ChannelListView({ channels }: { channels: Channel[] }) {
  return (
    <div {...stylex.props(styles.root)}>
      <Header />
      <ChannelList channels={channels} />
    </div>
  )
}
