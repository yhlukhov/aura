'use client'

import * as stylex from '@stylexjs/stylex'
import Link from 'next/link'
import type { Channel, Link as ChannelLink, Video } from '@/db/schema'
import { ChannelProfile } from './channel-profile'
import { ChannelVideoList } from '@/components/channel-videos-view/channel-video-list'
import { colors } from '@/components/channel-list-view/tokens.stylex'

type ChannelWithContent = Channel & {
  links: ChannelLink[]
  videos: Video[]
}

export function ChannelView({
  channel,
  emptyMessage = 'Channel not found.',
  editHref,
  showAddVideo = false,
}: {
  channel: ChannelWithContent | undefined
  emptyMessage?: string
  editHref?: string
  showAddVideo?: boolean
}) {
  if (!channel) {
    return (
      <main {...stylex.props(styles.root)}>
        <div {...stylex.props(styles.content)}>
          <Link href='/' {...stylex.props(styles.breadcrumb)}>
            AURA
          </Link>
          <p {...stylex.props(styles.notFound)}>{emptyMessage}</p>
        </div>
      </main>
    )
  }

  const { videos, ...channelProfile } = channel

  return (
    <main {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.content)}>
        <Link href='/' {...stylex.props(styles.breadcrumb)}>
          AURA SPACE
        </Link>
        <ChannelProfile
          channel={channelProfile}
          videoCount={videos.length}
          editHref={editHref}
        />
        <ChannelVideoList channelId={channel.id} videos={videos} showAddVideo={showAddVideo} />
      </div>
    </main>
  )
}

const styles = stylex.create({
  root: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: colors.skyLight,
    backgroundImage: "url('/channel-view-bg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center 62%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    '@media (max-width: 700px)': {
      backgroundPosition: 'center center',
      backgroundAttachment: 'scroll',
    },
    color: colors.ink,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  content: {
    width: '100%',
    maxWidth: '1480px',
    marginInline: 'auto',
    paddingInline: 'clamp(16px, 3.2vw, 48px)',
    paddingBlockEnd: '64px',
  },
  breadcrumb: {
    display: 'block',
    marginBlock: '8px',
    textAlign: 'center',
    transform: {
      default: 'scale(1)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': 'scale(1.05)',
      },
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    transitionProperty: 'transform, color',
    transitionDuration: {
      default: '180ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionTimingFunction: 'ease-out',
    color: colors.warmBronze,
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    ':hover': {
      color: colors.darkPink,
    },
    ':focus-visible': {
      outline: '2px solid',
      outlineColor: colors.gold,
      outlineOffset: '3px',
    },
  },
  notFound: {
    padding: '48px 24px',
    color: colors.darkPink,
    textAlign: 'center',
    fontSize: '18px',
  },
})
