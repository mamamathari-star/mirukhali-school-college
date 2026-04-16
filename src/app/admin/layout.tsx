import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/layout/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="text-sm text-gray-500">
            স্বাগতম, <span className="font-medium text-gray-900">{session.user?.name}</span>
          </div>
          <div className="text-xs text-gray-400">মিরুখালি স্কুল ও কলেজ - অ্যাডমিন</div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
