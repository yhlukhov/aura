import { redirect } from 'next/navigation'
import { getChannel } from '@/actions/channelActions'
import { AddLinkForm } from '@/components/admin-page-view/add-link-form'
import { auth } from '@/lib/auth/server'

interface Props {
  params: Promise<{ id: string }>
}

export const instant = false

export default async function AddLink({ params }: Props) {
  const session = await auth.getSession()
  if (session.data?.user.role !== 'admin') {
    redirect('/')
  }

  const { id } = await params
  const channelId = Number(id)
  if (!Number.isSafeInteger(channelId) || channelId < 1) {
    redirect('/admin')
  }

  const channel = await getChannel(channelId)
  if (!channel) {
    redirect('/admin')
  }

  return <AddLinkForm channel={channel} />
}
