import * as stylex from '@stylexjs/stylex'
import type { Video } from '@/db/schema'
import { ChannelVideoItem } from './channel-video-item'
import { colors } from '@/components/channel-list-view/tokens.stylex'

export function ChannelVideoList({ videos }: { videos: Video[] }) {
  return (
    <section aria-labelledby="for-you-heading" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.headingRow)}>
        <div>
          <p {...stylex.props(styles.eyebrow)}>A little inspiration</p>
          <h2 id="for-you-heading" {...stylex.props(styles.heading)}>
            For You
          </h2>
        </div>
        <span {...stylex.props(styles.count)}>
          {videos.length} {videos.length === 1 ? 'video' : 'videos'}
        </span>
      </div>

      {videos.length > 0 ? (
        <div {...stylex.props(styles.grid)}>
          {videos.map((video) => (
            <ChannelVideoItem key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <p {...stylex.props(styles.empty)}>
          Videos from this channel will appear here.
        </p>
      )}
    </section>
  )
}

const styles = stylex.create({
  section: {
    borderBlockStart: '1px solid rgba(2, 132, 199, 0.2)',
    paddingBlockStart: '24px',
  },
  headingRow: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    gap: '16px',
    marginBlockEnd: '19px',
  },
  eyebrow: {
    margin: '0 0 3px',
    color: colors.greenDeep,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  heading: {
    margin: 0,
    color: colors.darkPink,
    fontFamily: 'var(--font-spiritual-display), Georgia, serif',
    fontSize: '25px',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  count: {
    paddingBlockEnd: '2px',
    color: colors.mutedPlum,
    fontSize: '13px',
    whiteSpace: 'nowrap',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '30px 18px',
    '@media (max-width: 700px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
      rowGap: '24px',
    },
  },
  empty: {
    margin: 0,
    padding: '25px 20px',
    border: '1px solid rgba(2, 132, 199, 0.18)',
    borderRadius: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
    color: colors.mutedPlum,
    fontSize: '14px',
  },
})
