'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { useEffect, useRef, useState } from 'react'
import type { Channel, Link as ChannelLink } from '@/db/schema'
import { colors } from '@/components/channel-list-view/tokens.stylex'
import { channelActionButton } from './channel-action-button.stylex'
import { ChannelLinkItem } from './channel-link-item'
import { channelPriceMarkers } from '../channel-list-view/channel-item'

type ChannelProfileData = Pick<
  Channel,
  | 'id'
  | 'name'
  | 'url'
  | 'atAddress'
  | 'country'
  | 'description'
  | 'imageUrl'
  | 'topImageUrl'
  | 'price'
> & { links: ChannelLink[] }

export function ChannelProfile({
  channel,
  videoCount,
  editHref,
}: {
  channel: ChannelProfileData
  videoCount: number
  editHref?: string
}) {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [isExpandable, setIsExpandable] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const description = descriptionRef.current
    if (description) {
      setIsExpandable(description.scrollHeight > 300)
    }
  }, [channel.description])

  return (
    <header {...stylex.props(styles.profile)}>
      <Link href={channel.url} target='_blank' rel='noopener noreferrer'>
        <div {...stylex.props(styles.cover)}>
          <Image
            src={channel.topImageUrl}
            alt={`${channel.name} cover`}
            fill
            priority
            sizes='(max-width: 700px) 100vw, 1400px'
            unoptimized
            {...stylex.props(styles.coverImage)}
          />
        </div>
      </Link>

      <div {...stylex.props(styles.identity)}>
        <Link
          href={channel.url}
          target='_blank'
          rel='noopener noreferrer'
          {...stylex.props(styles.avatarLink)}
        >
          <div {...stylex.props(styles.avatar)}>
            <Image
              src={channel.imageUrl}
              alt={`${channel.name} profile`}
              fill
              sizes='(max-width: 700px) 104px, 164px'
              unoptimized
              {...stylex.props(styles.avatarImage)}
            />
          </div>
        </Link>

        <div {...stylex.props(styles.details)}>
          <div {...stylex.props(styles.nameRow)}>
            <Link href={channel.url} target='_blank' rel='noopener noreferrer'>
              <h1 {...stylex.props(styles.name)}>{channel.name}</h1>
            </Link>
            {editHref && (
              <Link href={editHref} {...stylex.props(channelActionButton.root)}>
                Edit
              </Link>
            )}
          </div>
          <Link
            href={channel.url}
            target='_blank'
            rel='noopener noreferrer'
            {...stylex.props(styles.address)}
          >
            {channel.atAddress}
            <span {...stylex.props(styles.meta)}> · {channel.country}</span>
            <span {...stylex.props(styles.meta)}>
              {' '}
              · {videoCount} {videoCount === 1 ? 'video' : 'videos'}
            </span>
          </Link>

          <div {...stylex.props(styles.descriptionArea)}>
            <p
              ref={descriptionRef}
              id={`channel-description-${channel.id}`}
              {...stylex.props(
                styles.description,
                !isExpanded && styles.descriptionCollapsed,
              )}
            >
              {channel.description}
            </p>
            {isExpandable && !isExpanded && (
              <span
                aria-hidden='true'
                {...stylex.props(styles.descriptionFade)}
              />
            )}
          </div>
          {isExpandable && (
            <button
              type='button'
              aria-expanded={isExpanded}
              aria-controls={`channel-description-${channel.id}`}
              onClick={() => setIsExpanded((expanded) => !expanded)}
              data-channel-description-toggle
              {...stylex.props(styles.expandButton)}
            >
              {isExpanded ? 'Show less' : '… Show more'}
            </button>
          )}

          {channelPriceMarkers(channel.price)}

          <nav
            aria-label={`${channel.name} links`}
            {...stylex.props(styles.links)}
          >
            <div {...stylex.props(styles.linkItems)}>
              {channel.links.length > 0 ? (
                channel.links.map((link) => (
                  <ChannelLinkItem key={link.id} link={link} />
                ))
              ) : (
                <p {...stylex.props(styles.noLinks)}>No links added yet.</p>
              )}
            </div>
            {editHref && (
              <Link
                href={`/admin/channel/${channel.id}/add-link`}
                {...stylex.props(channelActionButton.root)}
              >
                Add link
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

const styles = stylex.create({
  profile: {
    display: 'block',
  },
  cover: {
    position: 'relative',
    width: '100%',
    height: 'clamp(112px, 19vw, 230px)',
    overflow: 'hidden',
    borderRadius: '24px',
    backgroundColor: colors.greenLight,
    boxShadow: '0 12px 40px rgba(11, 61, 92, 0.14)',
  },
  coverImage: {
    objectFit: 'cover',
    objectPosition: 'center 44%',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        transform: 'translateY(-3px) scale(1.05)',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0ms',
      transform: 'none',
    },
  },
  identity: {
    display: 'grid',
    gridTemplateColumns: '164px minmax(0, 1fr)',
    alignItems: 'start',
    columnGap: '28px',
    paddingBlock: '28px 30px',
    '@media (max-width: 700px)': {
      gridTemplateColumns: '104px minmax(0, 1fr)',
      columnGap: '18px',
      paddingBlock: '22px 24px',
    },
    '@media (max-width: 460px)': {
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
      rowGap: '16px',
    },
  },
  avatar: {
    position: 'relative',
    width: '164px',
    height: '164px',
    overflow: 'hidden',
    borderRadius: '50%',
    border: '3px solid #fbbf24',
    backgroundColor: colors.greenLight,
    boxShadow: '0 8px 28px rgba(11, 61, 92, 0.16)',
    '@media (max-width: 700px)': {
      width: '104px',
      height: '104px',
    },
  },
  avatarLink: {
    display: 'block',
    borderRadius: '50%',
  },
  avatarImage: {
    objectFit: 'cover',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        transform: 'translateY(-3px) scale(1.05)',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0ms',
      transform: 'none',
    },
  },
  details: {
    minWidth: 0,
    paddingBlockStart: '2px',
    '@media (max-width: 460px)': {
      width: '100%',
    },
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  name: {
    margin: 0,
    color: colors.darkPink,
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: 700,
    lineHeight: 1.12,
    letterSpacing: '-0.035em',
    overflowWrap: 'anywhere',
    transformOrigin: 'left center',
    backgroundImage: 'linear-gradient(currentColor, currentColor)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 100%',
    backgroundSize: '0% 2px',
    transitionProperty: 'transform, background-size',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        transform: 'scale(1.05)',
        backgroundSize: '100% 2px',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0ms',
      transform: 'none',
    },
  },
  address: {
    display: 'inline-block',
    marginBlockStart: '7px',
    color: colors.skyDeep,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.5,
    overflowWrap: 'anywhere',
    transitionProperty: 'color',
    transitionDuration: '160ms',
    ':hover': {
      color: colors.warmBronze,
    },
    ':focus-visible': {
      outline: '2px solid #fbbf24',
      outlineOffset: '3px',
      borderRadius: '2px',
    },
  },
  meta: {
    color: colors.mutedPlum,
    fontWeight: 400,
  },
  descriptionArea: {
    position: 'relative',
    marginBlockStart: '13px',
  },
  description: {
    margin: 0,
    color: colors.mutedPlum,
    fontSize: '15px',
    lineHeight: 1.7,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  },
  descriptionCollapsed: {
    maxHeight: '300px',
    overflow: 'hidden',
  },
  descriptionFade: {
    position: 'absolute',
    insetInline: 0,
    bottom: 0,
    height: '42px',
    backgroundImage: 'linear-gradient(transparent, #f8fcff)',
    pointerEvents: 'none',
  },
  expandButton: {
    display: 'block',
    marginBlockStart: '4px',
    padding: '2px 0',
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.goldDeep,
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    ':hover': {
      color: colors.warmBronze,
    },
    ':focus-visible': {
      outline: '2px solid #fbbf24',
      outlineOffset: '3px',
      borderRadius: '2px',
    },
  },
  links: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
    marginBlockStart: '17px',
  },
  linkItems: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '9px',
    minWidth: 0,
  },
  noLinks: {
    margin: 0,
    color: colors.mutedPlum,
    fontSize: '13px',
  },
})
