'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

export function HistoryPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">আমাদের ইতিহাস</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">৮৭ বছরের গৌরবময় পথচলা</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ১৯৩৭ সালের ১ জানুয়ারি খিতিশ চন্দ্র চৌধুরীর নেতৃত্বে প্রতিষ্ঠিত মিরুখালি স্কুল দীর্ঘ পথ পরিক্রমায় আজ
              একটি সম্পূর্ণ শিক্ষা প্রতিষ্ঠানে পরিণত হয়েছে।
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              মঠবাড়িয়া, পিরোজপুরের এই অঞ্চলের শিক্ষা বিস্তারে আমাদের প্রতিষ্ঠান অগ্রণী ভূমিকা পালন করে আসছে।
              এসএসসি থেকে এইচএসসি পর্যন্ত শিক্ষার সকল স্তরে আমরা মানসম্পন্ন শিক্ষা নিশ্চিত করি।
            </p>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:gap-3 transition-all"
            >
              পূর্ণ ইতিহাস পড়ুন <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { year: '১৯৩৭', event: 'বিদ্যালয় প্রতিষ্ঠা', color: 'bg-blue-50 border-blue-200' },
              { year: '১৯৬০', event: 'মাধ্যমিক স্তর উন্নীত', color: 'bg-green-50 border-green-200' },
              { year: '১৯৮০', event: 'MPO ভুক্তি', color: 'bg-amber-50 border-amber-200' },
              { year: '২০০৫', event: 'উচ্চ মাধ্যমিক চালু', color: 'bg-purple-50 border-purple-200' },
            ].map((item) => (
              <div key={item.year} className={`p-4 rounded-xl border ${item.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="font-bold text-gray-700">{item.year}</span>
                </div>
                <p className="text-sm text-gray-600">{item.event}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
