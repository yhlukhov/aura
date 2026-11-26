import type { NewChannel } from '@/db/schema'

export const countries = [
  'Australia',
  'Canada',
  'India',
  'Russia',
  'Turkey',
  'Ukraine',
  'United Kingdom',
  'United States',
] satisfies NewChannel['country'][]
