'use client'

import * as stylex from '@stylexjs/stylex'
import { useAtom } from 'jotai'
import { useLayoutEffect, useRef, useState } from 'react'
import type { Channel } from '@/db/schema'
import { colors } from './tokens.stylex'
import { countryAtom, languageAtom } from '@/lib/store'

function FilterSelect({
  value,
  allLabel,
  options,
  formatOption,
  onChange,
}: {
  value: string
  allLabel: string
  options: readonly string[]
  formatOption?: (option: string) => string
  onChange: (value: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [selectedWidth, setSelectedWidth] = useState<number>()
  const [largestWidth, setLargestWidth] = useState<number>()
  const selectedMeasureRef = useRef<HTMLSpanElement>(null)
  const optionMeasureRefs = useRef<(HTMLSpanElement | null)[]>([])

  useLayoutEffect(() => {
    const measure = () => {
      const selectedTextWidth =
        selectedMeasureRef.current?.getBoundingClientRect().width ?? 0
      const optionWidths = optionMeasureRefs.current
        .map((element) => element?.getBoundingClientRect().width ?? 0)
        .filter((width) => width > 0)

      setSelectedWidth(selectedTextWidth + 18)
      setLargestWidth(Math.max(selectedTextWidth, ...optionWidths) + 18)
    }

    measure()
    void document.fonts?.ready.then(measure)
  }, [value, options])

  const format = formatOption ?? ((option: string) => option)
  const labels = [allLabel, ...options.map(format)]
  const selectedLabel =
    value === '' ? allLabel : format(value)
  const width = expanded ? largestWidth : selectedWidth ? selectedWidth + 2 : undefined

  return (
    <>
      <span
        aria-hidden="true"
        ref={selectedMeasureRef}
        {...stylex.props(styles.measure)}
      >
        {selectedLabel}
      </span>
      <div aria-hidden="true" {...stylex.props(styles.measureOptions)}>
        {labels.map((label, index) => (
          <span
            key={label}
            ref={(element) => {
              optionMeasureRefs.current[index] = element
            }}
            {...stylex.props(styles.measure)}
          >
            {label}
          </span>
        ))}
      </div>
      <span {...stylex.props(styles.selectWrap)}>
        <select
          data-channel-filter
          value={value}
          onFocus={() => setExpanded(true)}
          onPointerDown={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
          onChange={(event) => {
            onChange(event.currentTarget.value)
            setExpanded(false)
            event.currentTarget.blur()
          }}
          style={width ? { width: `${width}px` } : undefined}
          {...stylex.props(styles.select)}
        >
          <option value="">{allLabel}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {format(option)}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          {...stylex.props(
            styles.arrow,
            expanded && styles.arrowExpanded,
          )}
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </span>
    </>
  )
}

export function ChannelFilters({
  countryOptions,
  languageOptions,
}: {
  countryOptions: readonly Channel['country'][]
  languageOptions: readonly Channel['language'][]
}) {
  const [language, setLanguage] = useAtom(languageAtom)
  const [country, setCountry] = useAtom(countryAtom)

  return (
    <div {...stylex.props(styles.filtersPanel)}>
      <label {...stylex.props(styles.filter)}>
        <FilterSelect
          value={language}
          allLabel="All languages"
          options={languageOptions}
          formatOption={(option) =>
            option.charAt(0).toUpperCase() + option.slice(1)
          }
          onChange={setLanguage}
        />
      </label>
      <label {...stylex.props(styles.filter)}>
        <FilterSelect
          value={country}
          allLabel="All countries"
          options={countryOptions}
          onChange={setCountry}
        />
      </label>
    </div>
  )
}

const styles = stylex.create({
  measure: {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '13px',
  },
  measureOptions: {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
  },
  selectWrap: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
  },
  filtersPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '12px 24px',
    width: 'min(100%, 1400px)',
    marginInline: 'auto',
    marginBlockEnd: '20px',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  filter: {
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: '8px',
    rowGap: '4px',
    color: colors.mutedPlum,
    fontSize: '13px',
  },
  label: {
    fontWeight: 600,
  },
  select: {
    appearance: 'none',
    padding: '2px 0',
    color: colors.darkPink,
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(currentColor, currentColor)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 100%',
    backgroundSize: '0% 1px',
    font: 'inherit',
    cursor: 'pointer',
    transitionProperty: 'background-size, width',
    transitionDuration: {
      default: '180ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    ':hover': {
      backgroundSize: '100% 1px',
    },
    ':focus-visible': {
      outline: '2px solid',
      outlineColor: colors.gold,
      outlineOffset: '3px',
    },
  },
  arrow: {
    position: 'absolute',
    insetInlineEnd: '2px',
    width: '12px',
    height: '12px',
    fill: 'none',
    stroke: colors.darkPink,
    strokeWidth: 1.5,
    pointerEvents: 'none',
    transform: 'rotate(0deg)',
    transitionProperty: 'transform',
    transitionDuration: {
      default: '180ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionTimingFunction: 'ease',
  },
  arrowExpanded: {
    transform: 'rotate(180deg)',
  },
})