import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { Bell, Calendar, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = { title: 'নোটিশ বোর্ড - মিরুখালি স্কুল ও কলেজ' }

const categoryLabels: Record<string, string> = {
  exam: 'পরীক্ষা', result: 'ফলাফল', admission: 'ভর্তি', event: 'অনুষ্ঠান', general: 'সাধারণ',
}
const categoryColors: Record<string, 'default' | 'warning' | 'success' | 'info'> = {
  exam: 'warning', result: 'success', admission: 'info', event: 'default', general: 'default',
}

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string }
}) {
  const category = searchParams.category || ''
  const page = parseInt(searchParams.page || '1')
  const perPage = 10

  const where = {
    published: true,
    ...(category ? { category } : {}),
  }

  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.notice.count({ where }),
  ])

  const totalPages = Math.ceil(total / perPage)
  const categories = ['', 'exam', 'result', 'admission', 'event', 'general']

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">নোটিশ বোর্ড</h1>
          <p className="text-blue-200">সর্বশেষ বিজ্ঞপ্তি ও ঘোষণা</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat ? `?category=${cat}` : '/notices'}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat ? categoryLabels[cat] : 'সব'}
            </Link>
          ))}
        </div>

        {/* Notices list */}
        <div className="space-y-3">
          {notices.map((notice) => (
            <Link key={notice.id} href={`/notices/${notice.id}`}>
              <Card className="hover:shadow-md hover:border-blue-100 transition-all">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="bg-blue-100 rounded-lg p-2 shrink-0">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant={categoryColors[notice.category] || 'default'} className="text-xs">
                        {categoryLabels[notice.category] || notice.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 hover:text-blue-700">{notice.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{notice.content}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {formatDate(notice.publishedAt)}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {notices.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>কোনো নোটিশ পাওয়া যায়নি</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`?${category ? `category=${category}&` : ''}page=${p}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === page ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
