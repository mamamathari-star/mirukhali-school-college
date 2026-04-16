import { Metadata } from 'next'
import { BookOpen, FlaskConical } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = { title: 'একাডেমিক - মিরুখালি স্কুল ও কলেজ' }

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  )
}

export default function AcademicPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">একাডেমিক কার্যক্রম</h1>
          <p className="text-blue-200">শিক্ষা কার্যক্রম ও বিভাগসমূহ</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Programs */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>মাধ্যমিক (SSC)</CardTitle>
                  <p className="text-sm text-gray-500">নবম ও দশম শ্রেণি</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">মাধ্যমিক শিক্ষা সমাপনী পরীক্ষার জন্য প্রস্তুতিমূলক দুই বছরের কোর্স।</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="info">বিজ্ঞান বিভাগ</Badge>
                  <Badge variant="success">মানবিক বিভাগ</Badge>
                  <Badge variant="warning">বাণিজ্য বিভাগ</Badge>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">বিষয়সমূহ (সাধারণ):</h4>
                <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                  {['বাংলা', 'ইংরেজি', 'গণিত', 'ধর্ম শিক্ষা', 'বাংলাদেশ ও বিশ্ব পরিচয়', 'তথ্য প্রযুক্তি'].map(s => (
                    <div key={s} className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-amber-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 rounded-lg p-2">
                  <GraduationCapIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle>উচ্চ মাধ্যমিক (HSC)</CardTitle>
                  <p className="text-sm text-gray-500">একাদশ ও দ্বাদশ শ্রেণি</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">উচ্চ মাধ্যমিক শিক্ষা সমাপনী পরীক্ষার জন্য দুই বছরের কোর্স।</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="info">বিজ্ঞান বিভাগ</Badge>
                  <Badge variant="success">মানবিক বিভাগ</Badge>
                  <Badge variant="warning">বাণিজ্য বিভাগ</Badge>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">বিষয়সমূহ (সাধারণ):</h4>
                <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                  {['বাংলা', 'ইংরেজি', 'তথ্য প্রযুক্তি', 'আইসিটি'].map(s => (
                    <div key={s} className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Science, Commerce, Humanities subjects */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">বিভাগ অনুযায়ী বিষয়</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'বিজ্ঞান বিভাগ', color: 'bg-blue-600', subjects: ['পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'উচ্চতর গণিত'],
            },
            {
              name: 'মানবিক বিভাগ', color: 'bg-green-600', subjects: ['ইতিহাস', 'ভূগোল', 'পৌরনীতি', 'অর্থনীতি', 'সমাজকর্ম'],
            },
            {
              name: 'বাণিজ্য বিভাগ', color: 'bg-amber-600', subjects: ['হিসাববিজ্ঞান', 'ব্যবসায় শিক্ষা', 'ফিন্যান্স', 'উৎপাদন ব্যবস্থাপনা'],
            },
          ].map((div) => (
            <Card key={div.name}>
              <div className={`h-2 ${div.color} rounded-t-lg`} />
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-3">{div.name}</h3>
                <ul className="space-y-1.5">
                  {div.subjects.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full ${div.color}`} />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
