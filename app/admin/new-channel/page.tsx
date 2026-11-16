import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/server'
import { CreateChannelForm } from '@/components/admin-page-view/create-channel-form'

export const instant = false

export default async function NewChannelPage() {
  const user = await auth.getSession()
  if (user.data?.user.role !== 'admin') {
    return redirect('/')
  }
  return <CreateChannelForm />
}
