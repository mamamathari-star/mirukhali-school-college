import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { BookOpen, Monitor, FlaskConical, Trophy, Building, Users, Wifi } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = { title: 'সুযোগ-সুবিধা - মিরুখালি স্কুল ও কলেজ' }

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Monitor, FlaskConical, Trophy, Building, Users, Wifi,
}

export default async function FacilitiesPage() {
  const facilities = await prisma.facility.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">সুযোগ-সুবিধা</h1>
          <p className="text-blue-200">আমাদের শিক্ষা প্রতিষ্ঠানের সুযোগ-সুবিধাসমূহ</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => {
            const Icon = iconMap[facility.icon || 'Building'] || Building
            return (
              <Card key={facility.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-xl p-3 shrink-0">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{facility.name}</h3>
                      <p className="text-gray-600 text-sm">{facility.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
