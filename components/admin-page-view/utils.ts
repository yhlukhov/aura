import type { NewChannel } from '@/db/schema'

export const countries = [
  'Australia',
  'Canada',
  'India',
  'Norway',
  'Russia',
  'Turkey',
  'Ukraine',
  'United Kingdom',
  'United States',
] satisfies NewChannel['country'][]
