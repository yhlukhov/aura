import Image from 'next/image'
import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import type { Video } from '@/db/schema'
import { colors } from '@/components/channel-list-view/tokens.stylex'

export function ChannelVideoItem({ video }: { video: Video }) {
  const youtubeId = getYouTubeVideoId(video.url)

  return (
    <article {...stylex.props(styles.card)}>
      <Link
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${video.title}`}
        {...stylex.props(styles.thumbnail)}
      >
        {youtubeId ? (
          <Image
            src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 680px"
            unoptimized
            {...stylex.props(styles.thumbnailImage)}
          />
        ) : (
          <div aria-hidden="true" {...stylex.props(styles.placeholder)}>
            <span {...stylex.props(styles.placeholderMark)}>AURA</span>
            <span {...stylex.props(styles.placeholderTitle)}>{video.title}</span>
          </div>
        )}
        <span aria-hidden="true" {...stylex.props(styles.play)}>
          <svg viewBox="0 0 24 24" {...stylex.props(styles.playIcon)}>
            <path d="M8 5.5v13L19 12 8 5.5Z" fill="currentColor" />
          </svg>
        </span>
        <span {...stylex.props(styles.duration)}>{formatDuration(video.duration)}</span>
      </Link>

      <div {...stylex.props(styles.caption)}>
        <Link
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.title)}
        >
          {video.title}
        </Link>
        <p {...stylex.props(styles.meta)}>
          <span aria-hidden="true" {...stylex.props(styles.metaDot)} />
          {new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(video.createdAt)}
        </p>
      </div>
    </article>
  )
}

function getYouTubeVideoId(value: string) {
  if (!URL.canParse(value)) {
    return null
  }

  const url = new URL(value)
  const hostname = url.hostname.toLowerCase()
  let id: string | null = null

  if (hostname === 'youtu.be' || hostname === 'www.youtu.be') {
    id = url.pathname.split('/').filter(Boolean)[0] ?? null
  } else if (
    hostname === 'youtube.com' ||
    hostname === 'www.youtube.com' ||
    hostname === 'm.youtube.com'
  ) {
    id =
      url.searchParams.get('v') ??
      url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ??
      null
  }

  return id && /^[\w-]{11}$/.test(id) ? id : null
}

function formatDuration(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainder = seconds % 60

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
    : `${minutes}:${String(remainder).padStart(2, '0')}`
}

const styles = stylex.create({
  card: {
    minWidth: 0,
  },
  thumbnail: {
    position: 'relative',
    display: 'block',
    width: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    borderRadius: '13px',
    backgroundColor: colors.greenLight,
    boxShadow: '0 10px 24px rgba(11, 61, 92, 0.14)',
    isolation: 'isolate',
    ':focus-visible': {
      outline: '3px solid #fbbf24',
      outlineOffset: '3px',
    },
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        boxShadow: '0 14px 32px rgba(11, 61, 92, 0.2)',
        transform: 'translateY(-3px)',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0ms',
    },
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '180ms',
    transitionTimingFunction: 'ease-out',
  },
  thumbnailImage: {
    objectFit: 'cover',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        transform: 'scale(1.035)',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0ms',
      transform: 'none',
    },
  },
  placeholder: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 'clamp(16px, 3vw, 30px)',
    backgroundImage:
      'radial-gradient(ellipse at 75% 20%, rgba(251, 191, 36, 0.35), transparent 38%), linear-gradient(135deg, #e0f7ff, #dcfce7 70%)',
  },
  placeholderMark: {
    color: colors.goldDeep,
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '0.24em',
  },
  placeholderTitle: {
    display: '-webkit-box',
    maxWidth: '80%',
    overflow: 'hidden',
    color: colors.ink,
    fontFamily: 'var(--font-spiritual-display), Georgia, serif',
    fontSize: 'clamp(20px, 3vw, 34px)',
    fontWeight: 600,
    lineHeight: 1.15,
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  },
  play: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'grid',
    width: '52px',
    height: '52px',
    placeItems: 'center',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: colors.greenDeep,
    transform: 'translate(-50%, -50%)',
    transitionProperty: 'background-color, color, transform',
    transitionDuration: '180ms',
    ':hover': {
      backgroundColor: colors.gold,
      color: colors.ink,
      transform: 'translate(-50%, -50%) scale(1.08)',
    },
  },
  playIcon: {
    width: '24px',
    height: '24px',
    marginInlineStart: '3px',
  },
  duration: {
    position: 'absolute',
    right: '10px',
    bottom: '10px',
    padding: '3px 6px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    color: colors.ink,
    fontSize: '12px',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
  },
  caption: {
    paddingBlockStart: '11px',
  },
  title: {
    display: '-webkit-box',
    overflow: 'hidden',
    color: colors.darkPink,
    fontSize: '16px',
    fontWeight: 650,
    lineHeight: 1.45,
    overflowWrap: 'anywhere',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    transitionProperty: 'color',
    transitionDuration: '160ms',
    ':hover': {
      color: colors.skyDeep,
    },
    ':focus-visible': {
      outline: '2px solid #d97706',
      outlineOffset: '3px',
      borderRadius: '2px',
    },
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '7px 0 0',
    color: colors.mutedPlum,
    fontSize: '13px',
    lineHeight: 1.4,
  },
  metaDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: colors.greenDeep,
  },
})
