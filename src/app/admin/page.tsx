import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { StatsCard } from '@/components/admin/StatsCard'
import { PageHeader } from '@/components/admin/PageHeader'
import { Users, GraduationCap, Bell, UserCheck, Award, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export default async function AdminDashboard() {
  const [studentCount, teacherCount, noticeCount, pendingAdmissions, certCount, recentNotices, recentAdmissions] = await Promise.all([
    prisma.student.count({ where: { active: true } }),
    prisma.teacher.count({ where: { active: true } }),
    prisma.notice.count({ where: { published: true } }),
    prisma.admissionRequest.count({ where: { status: 'PENDING' } }),
    prisma.certificate.count({ where: { isValid: true } }),
    prisma.notice.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.admissionRequest.findMany({ where: { status: 'PENDING' }, orderBy: { createdAt: 'desc' }, take: 5 }),
  ])

  return (
    <div>
      <PageHeader title="ড্যাশবোর্ড" description="মিরুখালি স্কুল ও কলেজ - অ্যাডমিন প্যানেল" />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatsCard title="মোট শিক্ষার্থী" value={studentCount} icon={Users} color="blue" />
        <StatsCard title="মোট শিক্ষক" value={teacherCount} icon={GraduationCap} color="green" />
        <StatsCard title="প্রকাশিত নোটিশ" value={noticeCount} icon={Bell} color="purple" />
        <StatsCard title="অপেক্ষারত ভর্তি" value={pendingAdmissions} icon={UserCheck} color="amber" />
        <StatsCard title="সনদপত্র" value={certCount} icon={Award} color="red" />
        <StatsCard title="ফলাফল" value={await prisma.result.count()} icon={BookOpen} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">সাম্প্রতিক নোটিশ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotices.map((n) => (
                <div key={n.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 truncate flex-1">{n.title}</span>
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    <Badge variant={n.published ? 'success' : 'secondary'} className="text-xs">
                      {n.published ? 'প্রকাশিত' : 'খসড়া'}
                    </Badge>
                    <span className="text-gray-400 text-xs">{formatDate(n.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">অপেক্ষারত ভর্তি আবেদন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAdmissions.map((a) => (
                <div key={a.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-700 font-medium">{a.name}</p>
                    <p className="text-gray-400 text-xs">শ্রেণি {a.applyingClass} | {a.phone}</p>
                  </div>
                  <span className="text-gray-400 text-xs">{formatDate(a.createdAt)}</span>
                </div>
              ))}
              {recentAdmissions.length === 0 && <p className="text-gray-400 text-sm">কোনো অপেক্ষারত আবেদন নেই</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
