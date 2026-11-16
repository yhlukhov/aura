'use server'

import { redirect } from 'next/navigation'
import { createChannel } from '@/actions/channelActions'
import { countryEnum, type NewChannel } from '@/db/schema'
import { auth } from '@/lib/auth/server'

const prices = ['free', 'membership', 'donation'] as const
const languages = ['silent', 'english', 'russian', 'ukrainian'] as const

function isValidWebUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isValidImageUrl(value: string) {
  return value.startsWith('/') && !value.startsWith('//')
    ? true
    : isValidWebUrl(value)
}

export async function createChannelAction(
  _previousState: string | null,
  formData: FormData,
): Promise<string | null> {
  const session = await auth.getSession()
  if (session.data?.user.role !== 'admin') {
    redirect('/')
  }

  const getValue = (name: string) => {
    const value = formData.get(name)
    return typeof value === 'string' ? value.trim() : ''
  }

  const name = getValue('name')
  const url = getValue('url')
  const author = getValue('author')
  const description = getValue('description')
  const atAddress = getValue('atAddress')
  const country = countryEnum.enumValues.find(
    (option) => option === getValue('country'),
  )
  const imageUrl = getValue('imageUrl')
  const topImageUrl = getValue('topImageUrl')
  const createdAtValue = getValue('createdAt')
  const language = languages.find((option) => option === getValue('language'))
  const selectedPrices = formData.getAll('price')

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
    return 'Please complete all required fields.'
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(createdAtValue)) {
    return 'Choose a valid channel creation date.'
  }

  const [year, month, day] = createdAtValue.split('-').map(Number)
  const selectedDate = new Date(Date.UTC(year, month - 1, day, 12))
  if (
    selectedDate.getUTCFullYear() !== year ||
    selectedDate.getUTCMonth() !== month - 1 ||
    selectedDate.getUTCDate() !== day
  ) {
    return 'Choose a valid channel creation date.'
  }

  if (name.length > 255 || url.length > 255 || author.length > 255 || atAddress.length > 255) {
    return 'Name, channel URL, author, and address must be 255 characters or fewer.'
  }

  if (!isValidWebUrl(url)) {
    return 'Enter a valid channel URL starting with http:// or https://.'
  }

  if (!isValidImageUrl(imageUrl) || !isValidImageUrl(topImageUrl)) {
    return 'Image URLs must be valid http(s) URLs or paths within this site.'
  }

  if (!language) {
    return 'Choose a valid language.'
  }

  if (
    selectedPrices.length === 0 ||
    selectedPrices.some(
      (price) => typeof price !== 'string' || !prices.some((option) => option === price),
    )
  ) {
    return 'Choose at least one valid pricing option.'
  }

  const validPrices = selectedPrices.filter(
    (price): price is (typeof prices)[number] =>
      typeof price === 'string' && prices.some((option) => option === price),
  )

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
    price: validPrices,
    createdAt: selectedDate,
  }

  let createdChannel: { id: number } | undefined
  try {
    ;[createdChannel] = await createChannel(channel)
  } catch (error) {
    console.error('Failed to create channel', error)
    return 'We could not create the channel. Please try again.'
  }

  if (!createdChannel) {
    return 'We could not create the channel. Please try again.'
  }

  redirect(`/admin/channel/${createdChannel.id}`)
}
