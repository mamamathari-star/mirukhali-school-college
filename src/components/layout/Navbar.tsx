'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'হোম' },
  { href: '/about', label: 'পরিচিতি' },
  { href: '/academic', label: 'একাডেমিক' },
  { href: '/notices', label: 'নোটিশ' },
  { href: '/teachers', label: 'শিক্ষকমণ্ডলী' },
  { href: '/results', label: 'ফলাফল' },
  { href: '/verify', label: 'যাচাই' },
  { href: '/admission', label: 'ভর্তি' },
  { href: '/gallery', label: 'গ্যালারি' },
  { href: '/contact', label: 'যোগাযোগ' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* Top bar */}
      <div className="bg-blue-900 text-blue-200 text-xs py-1 px-4 flex justify-between items-center">
        <span>EIIN: 102726 | স্থাপিত: ১ জানুয়ারি ১৯৩৭</span>
        <a href="tel:01716213807" className="flex items-center gap-1 hover:text-white">
          <Phone className="h-3 w-3" />
          01716213807
        </a>
      </div>
      {/* Main nav */}
      <nav className="bg-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-amber-500 rounded-full p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">মিরুখালি স্কুল ও কলেজ</div>
                <div className="text-xs text-blue-200 leading-tight">Mirukhali School & College</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md transition-colors hover:bg-blue-700',
                    pathname === link.href ? 'bg-blue-700 font-semibold' : 'text-blue-100'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden bg-blue-800"
            >
              <div className="px-4 py-2 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm transition-colors',
                      pathname === link.href ? 'bg-blue-600 font-semibold' : 'text-blue-100 hover:bg-blue-700'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
