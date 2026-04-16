import { Metadata } from 'next'
import { Clock, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ইতিহাস - মিরুখালি স্কুল ও কলেজ',
}

const timeline = [
  { year: '১৯৩৭', title: 'বিদ্যালয় প্রতিষ্ঠা', desc: 'খিতিশ চন্দ্র চৌধুরীর নেতৃত্বে মিরুখালি হাই স্কুল প্রতিষ্ঠিত হয়। স্থানীয় গণ্যমান্য ব্যক্তিবর্গের সহযোগিতায় একটি ছোট্ট ঘর থেকে শুরু হয় শিক্ষার যাত্রা।', highlight: true },
  { year: '১৯৪৭', title: 'দেশ বিভাগ পরবর্তী', desc: 'দেশ বিভাগের পরেও বিদ্যালয়টি তার শিক্ষা কার্যক্রম অব্যাহত রাখে এবং এই অঞ্চলের মানুষের শিক্ষার আলো জ্বালিয়ে রাখে।', highlight: false },
  { year: '১৯৬০', title: 'মাধ্যমিক স্তরে উন্নীত', desc: 'বিদ্যালয়টি জুনিয়র স্তর থেকে পূর্ণ মাধ্যমিক স্তরে উন্নীত হয়। এসএসসি পরীক্ষায় শিক্ষার্থীরা প্রথম অংশগ্রহণ করে।', highlight: false },
  { year: '১৯৭১', title: 'মুক্তিযুদ্ধের সময়', desc: 'মহান মুক্তিযুদ্ধের সময় বিদ্যালয়টি সাময়িক বন্ধ থাকলেও দেশ স্বাধীন হওয়ার পর পুনরায় কার্যক্রম শুরু হয়।', highlight: false },
  { year: '১৯৮০', title: 'MPO ভুক্তি', desc: 'সরকারি অনুদান তালিকায় (MPO) অন্তর্ভুক্ত হওয়ার মাধ্যমে বিদ্যালয়ের আর্থিক ভিত্তি আরও মজবুত হয়।', highlight: false },
  { year: '১৯৯০', title: 'অবকাঠামো উন্নয়ন', desc: 'নতুন ভবন নির্মাণ ও অবকাঠামো উন্নয়নের মাধ্যমে বিদ্যালয়ের পরিবেশ আরও উন্নত করা হয়।', highlight: false },
  { year: '২০০০', title: 'কম্পিউটার শিক্ষা চালু', desc: 'তথ্য প্রযুক্তির যুগে প্রবেশ করে বিদ্যালয়ে কম্পিউটার শিক্ষা কার্যক্রম শুরু হয়।', highlight: true },
  { year: '২০০৫', title: 'কলেজ শাখা চালু', desc: 'উচ্চ মাধ্যমিক (HSC) শাখা খোলার মাধ্যমে বিদ্যালয়টি একটি পূর্ণাঙ্গ শিক্ষা প্রতিষ্ঠানে পরিণত হয়।', highlight: true },
  { year: '২০১০', title: 'কম্পিউটার ল্যাব স্থাপন', desc: '১৫টি আধুনিক কম্পিউটার সম্বলিত ল্যাব স্থাপন করা হয়। শিক্ষার্থীরা হাতে-কলমে তথ্য প্রযুক্তি শিক্ষা গ্রহণ শুরু করে।', highlight: false },
  { year: '২০২৪', title: 'বর্তমান অবস্থা', desc: '৬৭৯ জন শিক্ষার্থী ও ১৩ জন শিক্ষক নিয়ে বিদ্যালয়টি সুষ্ঠুভাবে পরিচালিত হচ্ছে। ডিজিটাল সনদ যাচাই ব্যবস্থা চালু করা হয়েছে।', highlight: true },
]

export default function HistoryPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">বিদ্যালয়ের ইতিহাস</h1>
          <p className="text-blue-200">১৯৩৭ থেকে বর্তমান - ৮৭ বছরের গৌরবময় পথচলা</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Intro */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-amber-800 mb-3">প্রতিষ্ঠার গল্প</h2>
          <p className="text-amber-700">
            ১৯৩৭ সালের ১ জানুয়ারি, মঠবাড়িয়া উপজেলার মিরুখালি গ্রামে খিতিশ চন্দ্র চৌধুরীর প্রচেষ্টায়
            এবং স্থানীয় জনসাধারণের সহযোগিতায় এই বিদ্যালয়ের যাত্রা শুরু হয়। সেই থেকে আজ পর্যন্ত
            এই বিদ্যালয় এই অঞ্চলের শিক্ষা বিস্তারে অগ্রণী ভূমিকা পালন করে আসছে।
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100" />
          <div className="space-y-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative flex gap-6">
                <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full shrink-0 ${item.highlight ? 'bg-blue-700 text-white' : 'bg-white border-2 border-blue-200 text-blue-700'}`}>
                  {item.highlight ? <Star className="h-6 w-6" /> : <Clock className="h-5 w-5" />}
                </div>
                <div className={`flex-1 pb-8 ${item.highlight ? 'bg-blue-50 border border-blue-100 rounded-xl p-4' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-lg font-bold ${item.highlight ? 'text-blue-800' : 'text-gray-900'}`}>{item.year}</span>
                    <h3 className={`font-semibold ${item.highlight ? 'text-blue-700' : 'text-gray-800'}`}>{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
