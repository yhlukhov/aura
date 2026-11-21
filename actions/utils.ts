import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth/server'
import { countryEnum, type NewChannel } from '@/db/schema'

export const prices = ['free', 'membership', 'donation'] as const
export const languages = ['silent', 'english', 'russian', 'ukrainian'] as const

export const MAX_TEXT_LENGTH = 255
export const MAX_INT = 2147483647
const MIN_DURATION = 1

export async function requireAdmin() {
  const session = await auth.getSession()
  if (session.data?.user.role !== 'admin') {
    redirect('/')
  }
}

export function getFormValue(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
}

export function parseChannelId(value: string) {
  const channelId = Number(value)
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(channelId)) {
    return null
  }
  return channelId
}

export function isValidWebUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function isValidImageUrl(value: string) {
  return value.startsWith('/') && !value.startsWith('//')
    ? true
    : isValidWebUrl(value)
}

export function parseDateValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day, 12))
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }
  return date
}

export function parseDuration(value: string) {
  if (!/^\d+$/.test(value)) {
    return null
  }
  const duration = Number(value)
  if (
    !Number.isSafeInteger(duration) ||
    duration < MIN_DURATION ||
    duration > MAX_INT
  ) {
    return null
  }
  return duration
}

export function parsePrices(formData: FormData) {
  const selectedPrices = formData.getAll('price')
  const validPrices: (typeof prices)[number][] = []

  for (const price of selectedPrices) {
    if (typeof price !== 'string' || !isPrice(price)) {
      return null
    }
    validPrices.push(price)
  }

  return validPrices.length > 0 ? validPrices : null
}

function isPrice(value: string): value is (typeof prices)[number] {
  return prices.some((option) => option === value)
}

export function parseLanguage(value: string) {
  return languages.find((option) => option === value) ?? null
}

export function parseCountry(value: string) {
  return countryEnum.enumValues.find((option) => option === value) ?? null
}

export type ChannelFieldsResult =
  | { error: string; channel?: undefined }
  | { error?: undefined; channel: NewChannel }

export function parseChannelFields(formData: FormData): ChannelFieldsResult {
  const getValue = (name: string) => getFormValue(formData, name)

  const name = getValue('name')
  const url = getValue('url')
  const author = getValue('author')
  const description = getValue('description')
  const atAddress = getValue('atAddress')
  const country = parseCountry(getValue('country'))
  const imageUrl = getValue('imageUrl')
  const topImageUrl = getValue('topImageUrl')
  const createdAtValue = getValue('createdAt')
  const language = parseLanguage(getValue('language'))

  if (
    !name ||
    !url ||
    !author ||
    !description ||
    !atAddress ||
    !country ||
    !imageUrl ||
    !topImageUrl ||
    !createdAtValue
  ) {
    return { error: 'Please complete all required fields.' }
  }

  const createdAt = parseDateValue(createdAtValue)
  if (!createdAt) {
    return { error: 'Choose a valid channel creation date.' }
  }

  if (
    name.length > MAX_TEXT_LENGTH ||
    url.length > MAX_TEXT_LENGTH ||
    author.length > MAX_TEXT_LENGTH ||
    atAddress.length > MAX_TEXT_LENGTH
  ) {
    return {
      error: `Name, channel URL, author, and address must be ${MAX_TEXT_LENGTH} characters or fewer.`,
    }
  }

  if (!isValidWebUrl(url)) {
    return {
      error: 'Enter a valid channel URL starting with http:// or https://.',
    }
  }

  if (!isValidImageUrl(imageUrl) || !isValidImageUrl(topImageUrl)) {
    return {
      error: 'Image URLs must be valid http(s) URLs or paths within this site.',
    }
  }

  if (!language) {
    return { error: 'Choose a valid language.' }
  }

  const price = parsePrices(formData)
  if (!price) {
    return { error: 'Choose at least one valid pricing option.' }
  }

  const channel: NewChannel = {
    name,
    url,
    author,
    description,
    atAddress,
    country,
    imageUrl,
    topImageUrl,
    language,
    price,
    createdAt,
  }

  return { channel }
}

export function revalidateChannelPaths(channelId: number) {
  revalidatePath(`/admin/channel/${channelId}`)
  revalidatePath(`/channel/${channelId}`)
}
