'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  addLinkToChannel,
  addVideoToChannel,
  createChannel,
  updateChannel,
  getChannel,
} from '@/actions/channelActions'
import {
  countryEnum,
  type NewChannel,
  type NewLink,
  type NewVideo,
} from '@/db/schema'
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

//* Create Channel Action *//
export async function createChannelAction(
  _previousState: string | null,
  formData: FormData,
): Promise<string | null> {

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

//* Update Channel Action *//
export async function updateChannelAction(
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

  const channelIdValue = getValue('channelId')
  const channelId = Number(channelIdValue)
  if (!/^[1-9]\d*$/.test(channelIdValue) || !Number.isSafeInteger(channelId)) {
    return 'This channel could not be found.'
  }

  const existingChannel = await getChannel(channelId)
  if (!existingChannel) {
    return 'This channel could not be found.'
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

  try {
    await updateChannel(channelId, channel)
  } catch (error) {
    console.error('Failed to update channel', error)
    return 'We could not update the channel. Please try again.'
  }

  revalidatePath(`/admin/channel/${channelId}`)
  revalidatePath(`/channel/${channelId}`)
  redirect(`/admin/channel/${channelId}`)
}

//* Add Video Action *//
export async function addVideoAction(
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

  const channelIdValue = getValue('channelId')
  const channelId = Number(channelIdValue)
  if (
    !/^[1-9]\d*$/.test(channelIdValue) ||
    !Number.isSafeInteger(channelId)
  ) {
    return 'This channel could not be found.'
  }

  const channel = await getChannel(channelId)
  if (!channel) {
    return 'This channel could not be found.'
  }

  const url = getValue('url')
  const title = getValue('title')
  const durationValue = getValue('duration')
  const duration = Number(durationValue)
  const createdAtValue = getValue('createdAt')

  if (!url || !title || !durationValue || !createdAtValue) {
    return 'Please complete all required fields.'
  }

  if (url.length > 255 || !isValidWebUrl(url)) {
    return 'Enter a valid video URL starting with http:// or https:// (255 characters or fewer).'
  }

  if (
    !/^\d+$/.test(durationValue) ||
    !Number.isSafeInteger(duration) ||
    duration < 1 ||
    duration > 2147483647
  ) {
    return 'Enter the video duration as a whole number of seconds greater than zero.'
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(createdAtValue)) {
    return 'Choose a valid video creation date.'
  }

  const [year, month, day] = createdAtValue.split('-').map(Number)
  const selectedDate = new Date(Date.UTC(year, month - 1, day, 12))
  if (
    selectedDate.getUTCFullYear() !== year ||
    selectedDate.getUTCMonth() !== month - 1 ||
    selectedDate.getUTCDate() !== day
  ) {
    return 'Choose a valid video creation date.'
  }

  const video: NewVideo = {
    channelId,
    url,
    title,
    duration,
    createdAt: selectedDate,
  }

  try {
    await addVideoToChannel(channelId, video)
  } catch (error) {
    console.error('Failed to add video to channel', error)
    return 'We could not add the video. Please try again.'
  }

  revalidatePath(`/admin/channel/${channelId}`)
  revalidatePath(`/channel/${channelId}`)
  redirect(`/admin/channel/${channelId}`)
}

//* Add Link Action *//
export async function addLinkAction(
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

  const channelIdValue = getValue('channelId')
  const channelId = Number(channelIdValue)
  if (!/^[1-9]\d*$/.test(channelIdValue) || !Number.isSafeInteger(channelId)) {
    return 'This channel could not be found.'
  }

  const channel = await getChannel(channelId)
  if (!channel) {
    return 'This channel could not be found.'
  }

  const name = getValue('name')
  const url = getValue('url')
  const imageUrl = getValue('imageUrl')
  if (!name || !url || !imageUrl) {
    return 'Please complete all required fields.'
  }

  if (name.length > 255) {
    return 'The link name must be 255 characters or fewer.'
  }

  if (url.length > 255 || !isValidWebUrl(url)) {
    return 'Enter a valid link URL starting with http:// or https:// (255 characters or fewer).'
  }

  if (!isValidImageUrl(imageUrl)) {
    return 'Enter a valid icon URL starting with http:// or https://, or a path within this site.'
  }

  const link: NewLink = {
    channelId,
    name,
    url,
    imageUrl,
  }

  try {
    await addLinkToChannel(channelId, link)
  } catch (error) {
    console.error('Failed to add link to channel', error)
    return 'We could not add the link. Please try again.'
  }

  revalidatePath(`/admin/channel/${channelId}`)
  revalidatePath(`/channel/${channelId}`)
  redirect(`/admin/channel/${channelId}`)
}
