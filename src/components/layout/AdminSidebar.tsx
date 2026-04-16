'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, Users, GraduationCap, Award, CheckCircle,
  UserCheck, Users2, Building2, Image, Settings, LogOut, Shield, Bell, BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/admin', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { href: '/admin/notices', label: 'নোটিশ', icon: Bell },
  { href: '/admin/students', label: 'শিক্ষার্থী', icon: Users },
  { href: '/admin/teachers', label: 'শিক্ষকমণ্ডলী', icon: GraduationCap },
  { href: '/admin/results', label: 'ফলাফল', icon: BookOpen },
  { href: '/admin/certificates', label: 'সনদপত্র', icon: Award },
  { href: '/admin/verification-logs', label: 'যাচাই লগ', icon: CheckCircle },
  { href: '/admin/admissions', label: 'ভর্তি আবেদন', icon: UserCheck },
  { href: '/admin/committee', label: 'পরিচালনা পর্ষদ', icon: Users2 },
  { href: '/admin/facilities', label: 'সুযোগ-সুবিধা', icon: Building2 },
  { href: '/admin/gallery', label: 'গ্যালারি', icon: Image },
  { href: '/admin/settings', label: 'সেটিংস', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#1e3a8a] text-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-4 border-b border-blue-700">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="bg-amber-500 rounded-full p-1.5">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">অ্যাডমিন প্যানেল</div>
            <div className="text-xs text-blue-300">মিরুখালি স্কুল ও কলেজ</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-blue-700 text-white font-medium'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-blue-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-blue-200 hover:text-white hover:bg-blue-800"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
        >
          <LogOut className="h-4 w-4 mr-2" />
          লগআউট
        </Button>
      </div>
    </aside>
  )
}
