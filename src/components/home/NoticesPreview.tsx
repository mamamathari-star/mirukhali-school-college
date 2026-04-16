import Link from 'next/link'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { Bell, ArrowRight, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const categoryLabels: Record<string, string> = {
  exam: 'পরীক্ষা',
  result: 'ফলাফল',
  admission: 'ভর্তি',
  event: 'অনুষ্ঠান',
  general: 'সাধারণ',
}

const categoryColors: Record<string, 'default' | 'info' | 'success' | 'warning' | 'destructive'> = {
  exam: 'warning',
  result: 'success',
  admission: 'info',
  event: 'default',
  general: 'default',
}

export async function NoticesPreview() {
  const notices = await prisma.notice.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 5,
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">সর্বশেষ</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">নোটিশ বোর্ড</h2>
          </div>
          <Link href="/notices" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:gap-3 transition-all text-sm">
            সব নোটিশ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {notices.map((notice) => (
            <Link key={notice.id} href={`/notices/${notice.id}`}>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all">
                <div className="bg-blue-100 rounded-lg p-2 shrink-0">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={categoryColors[notice.category] || 'default'} className="text-xs">
                      {categoryLabels[notice.category] || notice.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">{notice.title}</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                  <Calendar className="h-3 w-3" />
                  {formatDate(notice.publishedAt)}
                </div>
              </div>
            </Link>
          ))}
          {notices.length === 0 && (
            <div className="text-center py-8 text-gray-400">কোনো নোটিশ নেই</div>
          )}
        </div>
      </div>
    </section>
  )
}
