import { Metadata } from 'next'
import { Shield, MapPin, Calendar, Hash, Users, GraduationCap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'পরিচিতি - মিরুখালি স্কুল ও কলেজ',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 rounded-full p-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">EIIN: 102726</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-3">বিদ্যালয় পরিচিতি</h1>
          <p className="text-blue-200 max-w-2xl">মিরুখালি স্কুল ও কলেজ সম্পর্কে বিস্তারিত তথ্য</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick info cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Calendar, label: 'প্রতিষ্ঠাকাল', value: '১ জানুয়ারি ১৯৩৭', color: 'text-blue-600 bg-blue-50' },
            { icon: Hash, label: 'EIIN', value: '102726', color: 'text-green-600 bg-green-50' },
            { icon: Users, label: 'শিক্ষার্থী', value: '৬৭৯ জন', color: 'text-amber-600 bg-amber-50' },
            { icon: GraduationCap, label: 'শিক্ষক', value: '১৩ জন', color: 'text-purple-600 bg-purple-50' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.label}>
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-semibold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* About text */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">আমাদের সম্পর্কে</h2>
            <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
              <p>
                মিরুখালি স্কুল ও কলেজ (মিরুখালি উচ্চ বিদ্যালয়) ১৯৩৭ সালের ১ জানুয়ারি মঠবাড়িয়া, পিরোজপুরে
                প্রতিষ্ঠিত হয়। প্রতিষ্ঠাতা প্রধান শিক্ষক খিতিশ চন্দ্র চৌধুরীর নেতৃত্বে এই শিক্ষা প্রতিষ্ঠানটি
                এই অঞ্চলের শিক্ষার আলো ছড়িয়ে দিতে শুরু করে।
              </p>
              <p>
                দীর্ঘ ৮৭ বছরের পথচলায় বিদ্যালয়টি একটি পূর্ণাঙ্গ শিক্ষা প্রতিষ্ঠানে পরিণত হয়েছে।
                বর্তমানে এখানে SSC (নবম-দশম শ্রেণি) এবং HSC (একাদশ-দ্বাদশ শ্রেণি) পর্যায়ে শিক্ষা কার্যক্রম পরিচালিত হচ্ছে।
              </p>
              <p>
                বেসরকারি MPO ভুক্ত এই প্রতিষ্ঠানটিতে বর্তমানে ৬৭৯ জন শিক্ষার্থী, ১৩ জন শিক্ষক ও ৪ জন কর্মচারী আছেন।
                ছাত্র-ছাত্রী উভয়ের জন্য উন্মুক্ত এই প্রতিষ্ঠানে বিজ্ঞান, মানবিক ও বাণিজ্য বিভাগে শিক্ষা দেওয়া হয়।
              </p>
            </div>
          </div>

          {/* School details table */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">প্রাতিষ্ঠানিক তথ্য</h2>
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              {[
                { label: 'প্রতিষ্ঠানের নাম', value: 'মিরুখালি স্কুল ও কলেজ' },
                { label: 'EIIN নম্বর', value: '102726' },
                { label: 'প্রতিষ্ঠাকাল', value: '১ জানুয়ারি ১৯৩৭' },
                { label: 'প্রথম প্রধান শিক্ষক', value: 'খিতিশ চন্দ্র চৌধুরী' },
                { label: 'শিক্ষার স্তর', value: 'উচ্চ মাধ্যমিক (Higher Secondary)' },
                { label: 'ব্যবস্থাপনা', value: 'বেসরকারি MPO ভুক্ত' },
                { label: 'শিক্ষার্থী ভর্তি', value: 'সহশিক্ষা (Co-Education)' },
                { label: 'ঠিকানা', value: 'মিরুখালি, মঠবাড়িয়া, পিরোজপুর, বরিশাল' },
                { label: 'ফোন', value: '01716213807, 01309102726' },
              ].map((row, i) => (
                <div key={row.label} className={`flex items-start gap-2 px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <span className="w-44 shrink-0 font-medium text-gray-600">{row.label}</span>
                  <span className="text-gray-900">: {row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">আমাদের লক্ষ্য</h3>
              <p className="text-gray-600">
                মানসম্পন্ন শিক্ষার মাধ্যমে শিক্ষার্থীদের নৈতিক, মানবিক ও বৌদ্ধিক বিকাশ সাধন করে
                একটি আলোকিত সমাজ গড়ে তোলা।
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">আমাদের দৃষ্টিভঙ্গি</h3>
              <p className="text-gray-600">
                প্রযুক্তি ও মানবিক মূল্যবোধের সমন্বয়ে এমন শিক্ষার্থী তৈরি করা যারা জাতীয় উন্নয়নে
                সক্রিয় ভূমিকা রাখতে সক্ষম হবে।
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
