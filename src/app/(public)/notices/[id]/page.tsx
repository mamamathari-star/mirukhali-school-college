import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { formatDateTime } from '@/lib/utils'
import { Bell, Calendar, ArrowLeft, Paperclip } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const categoryLabels: Record<string, string> = {
  exam: 'পরীক্ষা', result: 'ফলাফল', admission: 'ভর্তি', event: 'অনুষ্ঠান', general: 'সাধারণ',
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const notice = await prisma.notice.findUnique({ where: { id: params.id } })
  return { title: notice ? `${notice.title} - মিরুখালি স্কুল ও কলেজ` : 'নোটিশ' }
}

export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
  const notice = await prisma.notice.findUnique({
    where: { id: params.id, published: true },
    include: { author: { select: { name: true } } },
  })

  if (!notice) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6 text-gray-600">
          <Link href="/notices"><ArrowLeft className="mr-2 h-4 w-4" /> নোটিশ বোর্ডে ফিরুন</Link>
        </Button>
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-lg p-2">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <Badge variant="info" className="text-xs">
              {categoryLabels[notice.category] || notice.category}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{notice.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDateTime(notice.publishedAt)}
            </div>
            {notice.author && <span>প্রকাশক: {notice.author.name}</span>}
          </div>
          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {notice.content}
          </div>
          {notice.attachment && (
            <div className="mt-6 pt-6 border-t">
              <a
                href={notice.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Paperclip className="h-4 w-4" />
                সংযুক্তি ডাউনলোড করুন
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
