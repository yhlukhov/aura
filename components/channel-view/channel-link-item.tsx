'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IoArrowRedoOutline } from 'react-icons/io5'
import * as stylex from '@stylexjs/stylex'
import type { Link as ChannelLink } from '@/db/schema'
import { colors } from '@/components/channel-list-view/tokens.stylex'

export function ChannelLinkItem({ link }: { link: ChannelLink }) {
  return (
    <Link
      href={link.url}
      target='_blank'
      rel='noopener noreferrer'
      data-channel-link-item
      {...stylex.props(styles.link)}
    >
      <div {...stylex.props(styles.linkIcon)}>
        <Image src={link.imageUrl} alt='' width={20} height={20} unoptimized />
      </div>
      <span {...stylex.props(styles.label)}>{link.name}</span>
      <span aria-hidden='true' {...stylex.props(styles.externalIcon)}>
        <IoArrowRedoOutline />
      </span>
    </Link>
  )
}

const styles = stylex.create({
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    minHeight: '38px',
    maxWidth: '100%',
    padding: '7px 12px 7px 8px',
    borderRadius: '999px',
    backgroundColor: 'rgba(224, 247, 255, 0.72)',
    color: colors.ink,
    fontSize: '13px',
    lineHeight: 1.3,
    overflowWrap: 'anywhere',
    transform: {
      default: 'scale(1)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': 'scale(1.05)',
      },
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    transitionProperty: 'background-color, border-color, color, transform',
    transitionDuration: '160ms',
    ':hover': {
      backgroundColor: colors.goldLight,
      color: colors.darkPink,
    },
    ':focus-visible': {
      outline: '2px solid #d97706',
      outlineOffset: '2px',
    },
  },
  label: {
    color: colors.skyDeep,
    fontWeight: 600,
  },
  linkIcon: {
    display: 'grid',
    width: '20px',
    height: '20px',
    flexShrink: 0,
    placeItems: 'center',
    overflow: 'hidden',
    borderRadius: '50%',
    outline: '1px solid rgba(175, 124, 73, 0.35)',
    backgroundColor: 'rgba(224, 247, 255, 0.9)',
  },
  externalIcon: {
    flexShrink: 0,
    color: colors.goldDeep,
    fontSize: '13px',
  },
})
