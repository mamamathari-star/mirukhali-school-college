import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Mirukhali School & College',
  description: 'Mirukhali High School - EIIN: 102726 | Established 1937 | Mirukhali, Mathbaria, Pirojpur, Barishal, Bangladesh',
  keywords: ['Mirukhali School', 'Mirukhali College', 'Mathbaria', 'Pirojpur', 'Bangladesh school'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
