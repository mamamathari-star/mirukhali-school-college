import { Metadata } from 'next'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { getInitials } from '@/lib/utils'
import { GraduationCap, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = { title: 'শিক্ষকমণ্ডলী - মিরুখালি স্কুল ও কলেজ' }

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">শিক্ষকমণ্ডলী</h1>
          <p className="text-blue-200">আমাদের দক্ষ ও অভিজ্ঞ শিক্ষক পরিবার</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col items-center">
                {teacher.photo ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border-4 border-white shadow">
                    <Image src={teacher.photo} alt={teacher.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-2xl font-bold mb-3 border-4 border-white shadow">
                    {getInitials(teacher.name)}
                  </div>
                )}
                <h3 className="font-bold text-gray-900 text-center text-sm">{teacher.name}</h3>
                <p className="text-blue-600 text-xs mt-1 text-center">{teacher.designation}</p>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="text-gray-700 font-medium">{teacher.subject}</span>
                  </div>
                  {teacher.qualification && (
                    <div className="text-xs text-gray-500">{teacher.qualification}</div>
                  )}
                  {teacher.phone && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Phone className="h-3 w-3" />
                      {teacher.phone}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
