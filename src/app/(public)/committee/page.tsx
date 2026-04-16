import { Metadata } from 'next'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { getInitials } from '@/lib/utils'
import { Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = { title: 'পরিচালনা পর্ষদ - মিরুখালি স্কুল ও কলেজ' }

export default async function CommitteePage() {
  const members = await prisma.committeeMember.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">পরিচালনা পর্ষদ</h1>
          <p className="text-blue-200">বিদ্যালয় পরিচালনা কমিটির সদস্যবৃন্দ</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {member.photo ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-100">
                    <Image src={member.photo} alt={member.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {getInitials(member.name)}
                  </div>
                )}
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <Badge variant="info" className="mt-1 mb-2 text-xs">{member.designation}</Badge>
                {member.phone && (
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                    <Phone className="h-3 w-3" />
                    {member.phone}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
