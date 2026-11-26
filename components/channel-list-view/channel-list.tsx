import stylex from '@stylexjs/stylex'
import { useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { fetchFilteredChannels } from '@/actions/channelFilterActions'
import { countryAtom, languageAtom } from '@/lib/store'
import type { Channel } from '@/db/schema'
import { colors } from './tokens.stylex'
import { ChannelItem } from './channel-item'
import { ChannelFilters } from './channel-filters'

interface Props {
  channels: Channel[]
  countryOptions: readonly Channel['country'][]
  languageOptions: readonly Channel['language'][]
}

export function ChannelList({
  channels,
  countryOptions,
  languageOptions,
}: Props) {
  const language = useAtomValue(languageAtom)
  const country = useAtomValue(countryAtom)
  const [visibleChannels, setVisibleChannels] = useState(channels)
  const [loadError, setLoadError] = useState<string | null>(null)
  const requestId = useRef(0)

  useEffect(() => {
    const currentRequestId = ++requestId.current

    fetchFilteredChannels({ language, country })
      .then((results) => {
        if (currentRequestId === requestId.current) {
          setVisibleChannels(results)
          setLoadError(null)
        }
      })
      .catch((error: unknown) => {
        if (currentRequestId === requestId.current) {
          console.error('Failed to load filtered channels.', error)
          setLoadError('Unable to load channels. Please try again.')
        }
      })

    return () => {
      requestId.current += 1
    }
  }, [country, language])

  return (
    <section {...stylex.props(styles.section)}>
      <ChannelFilters
        countryOptions={countryOptions}
        languageOptions={languageOptions}
      />
      <div {...stylex.props(styles.flex)}>
        <div aria-hidden="true" {...stylex.props(styles.backdrop)} />
        {visibleChannels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </div>
      {loadError && (
        <p role="alert" {...stylex.props(styles.error)}>
          {loadError}
        </p>
      )}
    </section>
  )
}

//* Styles *//
const styles = stylex.create({
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',
    backgroundColor: 'rgba(40, 28, 56, 0.32)',
    opacity: {
      default: 0,
      '@media (hover: hover) and (pointer: fine)': {
        [stylex.when.anySibling(':hover')]: 1,
      },
    },
    transitionProperty: 'opacity',
    transitionDuration: {
      default: '400ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 'clamp(24px, 2.5vw, 40px)',
    width: 'min(100%, 1400px)',
  },
  error: {
    marginBlock: '20px 0',
    color: colors.darkPink,
    fontSize: '14px',
    textAlign: 'center',
  },
})