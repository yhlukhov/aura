import { redirect } from 'next/navigation'
import { getAllChannels } from '@/actions/channelActions'
import { AdminPageView } from '@/components/admin-page-view/admin-page-view'
import { auth } from '@/lib/auth/server'

export const instant = false

export default async function AdminPage() {
  const user = await auth.getSession()
  if (user.data?.user.role !== 'admin') {
    return redirect('/')
  }
  const channels = await getAllChannels()

  return <AdminPageView channels={channels} />
}
