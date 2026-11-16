import * as stylex from '@stylexjs/stylex'
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
}: {
  channel: ChannelWithContent | undefined
  emptyMessage?: string
  editHref?: string
}) {
  if (!channel) {
    return (
      <main {...stylex.props(styles.root)}>
        <p {...stylex.props(styles.notFound)}>{emptyMessage}</p>
      </main>
    )
  }

  const { videos, ...channelProfile } = channel

  return (
    <main {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.content)}>
        <ChannelProfile
          channel={channelProfile}
          videoCount={videos.length}
          editHref={editHref}
        />
        <ChannelVideoList videos={videos} />
      </div>
    </main>
  )
}

const styles = stylex.create({
  root: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: colors.skyLight,
    backgroundImage:
      'linear-gradient(180deg, rgba(224, 247, 255, 0.55), rgba(255, 247, 204, 0.45))',
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
  notFound: {
    padding: '48px 24px',
    color: colors.darkPink,
    textAlign: 'center',
    fontSize: '18px',
  },
})
