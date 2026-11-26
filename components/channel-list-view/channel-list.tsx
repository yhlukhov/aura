import stylex from '@stylexjs/stylex'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import { countryAtom, languageAtom } from '@/lib/store'
import type { ChannelCursor } from '@/actions/utils'
import type { Channel } from '@/db/schema'
import type { ChannelPage } from '@/actions/channelActions'
import { colors } from './tokens.stylex'
import { ChannelItem } from './channel-item'
import { ChannelFilters } from './channel-filters'
import {
  useFetchPage,
  useObserveLoadNextPage,
  useSyncChannelQuery,
} from './channel-list-hooks'

interface Props {
  initialPage: ChannelPage
  seed: string
  countryOptions: readonly Channel['country'][]
  languageOptions: readonly Channel['language'][]
}

export function ChannelList({
  initialPage,
  seed,
  countryOptions,
  languageOptions,
}: Props) {
  const language = useAtomValue(languageAtom)
  const country = useAtomValue(countryAtom)
  const [visibleChannels, setVisibleChannels] = useState(initialPage.channels)
  const [loadedQuery, setLoadedQuery] = useState({
    seed,
    language: '',
    country: '',
  })
  const [cursor, setCursor] = useState<ChannelCursor | null>(
    initialPage.nextCursor,
  )
  const [hasMore, setHasMore] = useState(initialPage.hasMore)
  const [isLoading, setIsLoading] = useState(true)
  const [filtersHydrated, setFiltersHydrated] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const requestId = useRef(0)
  const loadingRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const lastQueryRef = useRef({ seed, language: '', country: '' })
  const queryMatchesLoadedChannels =
    loadedQuery.seed === seed &&
    loadedQuery.language === language &&
    loadedQuery.country === country

  useEffect(() => {
    setFiltersHydrated(true)
  }, [])

  const fetchPage = useFetchPage({
    seed,
    language,
    country,
    requestId,
    loadingRef,
    setVisibleChannels,
    setLoadedQuery,
    setCursor,
    setHasMore,
    setIsLoading,
    setLoadError,
  })

  const loadNextPage = useCallback(() => {
    if (queryMatchesLoadedChannels && hasMore && cursor) {
      void fetchPage(cursor, true)
    }
  }, [cursor, fetchPage, hasMore, queryMatchesLoadedChannels])

  useSyncChannelQuery({
    filtersHydrated,
    seed,
    language,
    country,
    lastQueryRef,
    initialPage,
    requestId,
    loadingRef,
    fetchPage,
    setVisibleChannels,
    setLoadedQuery,
    setCursor,
    setHasMore,
    setIsLoading,
    setLoadError,
  })

  useObserveLoadNextPage({
    sentinelRef,
    filtersHydrated,
    queryMatchesLoadedChannels,
    hasMore,
    isLoading,
    loadError,
    loadNextPage,
  })

  return (
    <section {...stylex.props(styles.section)}>
      <ChannelFilters
        countryOptions={countryOptions}
        languageOptions={languageOptions}
      />
      <div {...stylex.props(styles.flex)}>
        <div aria-hidden="true" {...stylex.props(styles.backdrop)} />
        {filtersHydrated &&
          queryMatchesLoadedChannels &&
          visibleChannels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </div>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        {...stylex.props(styles.sentinel)}
      />
      {(isLoading || !filtersHydrated) && (
        <p aria-live="polite" {...stylex.props(styles.status)}>
          Loading channels…
        </p>
      )}
      {loadError && (
        <div {...stylex.props(styles.errorContainer)}>
          <p role="alert" {...stylex.props(styles.error)}>
            {loadError}
          </p>
          <button
            type="button"
            onClick={() => void fetchPage(cursor, cursor !== null)}
            {...stylex.props(styles.retry)}
          >
            Retry
          </button>
        </div>
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
    margin: 0,
    color: colors.darkPink,
    fontSize: '14px',
    textAlign: 'center',
  },
  sentinel: {
    width: '100%',
    height: '1px',
  },
  status: {
    marginBlock: '14px 0',
    color: colors.mutedPlum,
    fontSize: '14px',
    textAlign: 'center',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    marginBlock: '14px 0',
  },
  retry: {
    border: '1px solid',
    borderColor: colors.warmBronze,
    borderRadius: '6px',
    padding: '4px 10px',
    color: colors.darkPink,
    backgroundColor: 'transparent',
    font: 'inherit',
    cursor: 'pointer',
  },
})