import {
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { fetchChannelPage } from '@/actions/channelFilterActions'
import type { ChannelCursor } from '@/actions/utils'
import type { ChannelPage } from '@/actions/channelActions'
import type { Channel } from '@/db/schema'

interface LoadedQuery {
  seed: string
  language: string
  country: string
}

interface UseFetchPageOptions {
  seed: string
  language: string
  country: string
  requestId: { current: number }
  loadingRef: { current: boolean }
  setVisibleChannels: Dispatch<SetStateAction<Channel[]>>
  setLoadedQuery: Dispatch<SetStateAction<LoadedQuery>>
  setCursor: Dispatch<SetStateAction<ChannelCursor | null>>
  setHasMore: Dispatch<SetStateAction<boolean>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setLoadError: Dispatch<SetStateAction<string | null>>
}

interface UseSyncChannelQueryOptions {
  filtersHydrated: boolean
  seed: string
  language: string
  country: string
  lastQueryRef: { current: LoadedQuery }
  initialPage: ChannelPage
  requestId: { current: number }
  loadingRef: { current: boolean }
  fetchPage: (pageCursor: ChannelCursor | null, append: boolean) => Promise<void>
  setVisibleChannels: Dispatch<SetStateAction<Channel[]>>
  setLoadedQuery: Dispatch<SetStateAction<LoadedQuery>>
  setCursor: Dispatch<SetStateAction<ChannelCursor | null>>
  setHasMore: Dispatch<SetStateAction<boolean>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setLoadError: Dispatch<SetStateAction<string | null>>
}

interface UseObserveLoadNextPageOptions {
  sentinelRef: { current: HTMLDivElement | null }
  filtersHydrated: boolean
  queryMatchesLoadedChannels: boolean
  hasMore: boolean
  isLoading: boolean
  loadError: string | null
  loadNextPage: () => void
}

export function useFetchPage({
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
}: UseFetchPageOptions) {
  return useCallback(
    async (pageCursor: ChannelCursor | null, append: boolean) => {
      if (loadingRef.current) return

      const currentRequestId = requestId.current
      loadingRef.current = true
      setIsLoading(true)
      setLoadError(null)

      try {
        const result = await fetchChannelPage({
          seed,
          language,
          country,
          cursor: pageCursor,
        })

        if (currentRequestId === requestId.current) {
          setVisibleChannels((current) =>
            append ? [...current, ...result.channels] : result.channels,
          )
          setLoadedQuery({ seed, language, country })
          setCursor(result.nextCursor)
          setHasMore(result.hasMore)
        }
      } catch (error: unknown) {
        if (currentRequestId === requestId.current) {
          console.error('Failed to load channel page.', error)
          setLoadError('Unable to load channels. Please try again.')
        }
      } finally {
        if (currentRequestId === requestId.current) {
          loadingRef.current = false
          setIsLoading(false)
        }
      }
    },
    [
      country,
      language,
      loadingRef,
      requestId,
      seed,
      setCursor,
      setHasMore,
      setIsLoading,
      setLoadError,
      setLoadedQuery,
      setVisibleChannels,
    ],
  )
}

export function useSyncChannelQuery({
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
}: UseSyncChannelQueryOptions) {
  useEffect(() => {
    if (!filtersHydrated) return

    const previousQuery = lastQueryRef.current
    if (
      previousQuery.seed === seed &&
      previousQuery.language === language &&
      previousQuery.country === country
    ) {
      setIsLoading(false)
      return
    }

    lastQueryRef.current = { seed, language, country }
    if (!language && !country) {
      setVisibleChannels(initialPage.channels)
      setLoadedQuery({ seed, language: '', country: '' })
      setCursor(initialPage.nextCursor)
      setHasMore(initialPage.hasMore)
      setIsLoading(false)
      setLoadError(null)
      return
    }

    requestId.current += 1
    loadingRef.current = false
    setVisibleChannels([])
    setCursor(null)
    setHasMore(false)
    void fetchPage(null, false)
  }, [
    country,
    fetchPage,
    filtersHydrated,
    initialPage,
    language,
    lastQueryRef,
    loadingRef,
    requestId,
    seed,
    setCursor,
    setHasMore,
    setIsLoading,
    setLoadError,
    setLoadedQuery,
    setVisibleChannels,
  ])
}

export function useObserveLoadNextPage({
  sentinelRef,
  filtersHydrated,
  queryMatchesLoadedChannels,
  hasMore,
  isLoading,
  loadError,
  loadNextPage,
}: UseObserveLoadNextPageOptions) {
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (
      !sentinel ||
      !filtersHydrated ||
      !queryMatchesLoadedChannels ||
      !hasMore ||
      isLoading ||
      loadError
    ) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadNextPage()
        }
      },
      { rootMargin: '300px 0px' },
    )
    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [
    filtersHydrated,
    hasMore,
    isLoading,
    loadError,
    loadNextPage,
    queryMatchesLoadedChannels,
    sentinelRef,
  ])
}