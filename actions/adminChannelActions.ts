'use server'

import { redirect } from 'next/navigation'
import {
  addLinkToChannel,
  addVideoToChannel,
  createChannel,
  getChannel,
  updateChannel,
} from '@/actions/channelActions'
import {
  getFormValue,
  isValidImageUrl,
  isValidWebUrl,
  MAX_TEXT_LENGTH,
  parseChannelFields,
  parseChannelId,
  parseDateValue,
  parseDuration,
  requireAdmin,
  revalidateChannelPaths,
} from '@/actions/utils'
import type { NewLink, NewVideo } from '@/db/schema'

const CHANNEL_NOT_FOUND = 'This channel could not be found.'
const REQUIRED_FIELDS = 'Please complete all required fields.'
const INVALID_VIDEO_URL = `Enter a valid video URL starting with http:// or https:// (${MAX_TEXT_LENGTH} characters or fewer).`
const VIDEO_URL_TOO_LONG = `The video URL must be ${MAX_TEXT_LENGTH} characters or fewer.`
const INVALID_VIDEO_DURATION = 'Enter the video duration as a whole number of seconds.'
const INVALID_VIDEO_DATE = 'Choose a valid video creation date.'
const COULD_NOT_ADD_VIDEO = 'We could not add the video. Please try again.'
const INVALID_LINK_URL = `Enter a valid link URL starting with http:// or https:// (${MAX_TEXT_LENGTH} characters or fewer).`
const LINK_NAME_TOO_LONG = `The link name must be ${MAX_TEXT_LENGTH} characters or fewer.`
const LINK_URL_TOO_LONG = `The link URL must be ${MAX_TEXT_LENGTH} characters or fewer.`
const INVALID_LINK_ICON_URL =
  'Enter a valid icon URL starting with http:// or https://, or a path within this site.'
const COULD_NOT_ADD_LINK = 'We could not add the link. Please try again.'
const COULD_NOT_CREATE_CHANNEL = 'We could not create the channel. Please try again.'
const COULD_NOT_UPDATE_CHANNEL = 'We could not update the channel. Please try again.'

//* Create Channel Action *//
export async function createChannelAction(
  _previousState: string | null,
  formData: FormData,
): Promise<string | null> {
  await requireAdmin()

  const result = parseChannelFields(formData)
  if (!result.channel) {
    return result.error
  }

  let createdChannel: { id: number } | undefined
  try {
    ;[createdChannel] = await createChannel(result.channel)
  } catch (error) {
    console.error('Failed to create channel', error)
    return COULD_NOT_CREATE_CHANNEL
  }

  if (!createdChannel) {
    return COULD_NOT_CREATE_CHANNEL
  }

  redirect(`/admin/channel/${createdChannel.id}`)
}

//* Update Channel Action *//
export async function updateChannelAction(
  _previousState: string | null,
  formData: FormData,
): Promise<string | null> {
  await requireAdmin()

  const channelId = parseChannelId(getFormValue(formData, 'channelId'))
  if (!channelId || !(await getChannel(channelId))) {
    return CHANNEL_NOT_FOUND
  }

  const result = parseChannelFields(formData)
  if (!result.channel) {
    return result.error
  }

  try {
    await updateChannel(channelId, result.channel)
  } catch (error) {
    console.error('Failed to update channel', error)
    return COULD_NOT_UPDATE_CHANNEL
  }

  revalidateChannelPaths(channelId)
  redirect(`/admin/channel/${channelId}`)
}

//* Add Video Action *//
export async function addVideoAction(
  _previousState: string | null,
  formData: FormData,
): Promise<string | null> {
  await requireAdmin()

  const channelId = parseChannelId(getFormValue(formData, 'channelId'))
  if (!channelId || !(await getChannel(channelId))) {
    return CHANNEL_NOT_FOUND
  }

  const url = getFormValue(formData, 'url')
  const title = getFormValue(formData, 'title')
  const durationValue = getFormValue(formData, 'duration')
  const createdAtValue = getFormValue(formData, 'createdAt')

  if (!url || !title || !durationValue || !createdAtValue) {
    return REQUIRED_FIELDS
  }

  if (url.length > MAX_TEXT_LENGTH) {
    return VIDEO_URL_TOO_LONG
  }

  if (!isValidWebUrl(url)) {
    return INVALID_VIDEO_URL
  }

  const duration = parseDuration(durationValue)
  if (!duration) {
    return INVALID_VIDEO_DURATION
  }

  const createdAt = parseDateValue(createdAtValue)
  if (!createdAt) {
    return INVALID_VIDEO_DATE
  }

  const video: NewVideo = {
    channelId,
    url,
    title,
    duration,
    createdAt,
  }

  try {
    await addVideoToChannel(channelId, video)
  } catch (error) {
    console.error('Failed to add video to channel', error)
    return COULD_NOT_ADD_VIDEO
  }

  revalidateChannelPaths(channelId)
  redirect(`/admin/channel/${channelId}`)
}

//* Add Link Action *//
export async function addLinkAction(
  _previousState: string | null,
  formData: FormData,
): Promise<string | null> {
  await requireAdmin()

  const channelId = parseChannelId(getFormValue(formData, 'channelId'))
  if (!channelId || !(await getChannel(channelId))) {
    return CHANNEL_NOT_FOUND
  }

  const name = getFormValue(formData, 'name')
  const url = getFormValue(formData, 'url')
  const imageUrl = getFormValue(formData, 'imageUrl')
  if (!name || !url || !imageUrl) {
    return REQUIRED_FIELDS
  }

  if (name.length > MAX_TEXT_LENGTH) {
    return LINK_NAME_TOO_LONG
  }

  if (url.length > MAX_TEXT_LENGTH) {
    return LINK_URL_TOO_LONG
  }

  if (!isValidWebUrl(url)) {
    return INVALID_LINK_URL
  }

  if (!isValidImageUrl(imageUrl)) {
    return INVALID_LINK_ICON_URL
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
    return COULD_NOT_ADD_LINK
  }

  revalidateChannelPaths(channelId)
  redirect(`/admin/channel/${channelId}`)
}
