'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Monitor, FlaskConical, Trophy, Building, Users, ArrowRight } from 'lucide-react'

const facilities = [
  { icon: BookOpen, name: 'পাঠাগার', desc: '৫০০০+ বই সমৃদ্ধ', color: 'bg-blue-50 text-blue-600' },
  { icon: Monitor, name: 'কম্পিউটার ল্যাব', desc: '১৫টি আধুনিক কম্পিউটার', color: 'bg-green-50 text-green-600' },
  { icon: FlaskConical, name: 'বিজ্ঞান গবেষণাগার', desc: 'আধুনিক যন্ত্রপাতি সহ', color: 'bg-purple-50 text-purple-600' },
  { icon: Trophy, name: 'খেলার মাঠ', desc: 'বিশাল ক্রীড়া মাঠ', color: 'bg-amber-50 text-amber-600' },
  { icon: Building, name: 'মসজিদ', desc: 'প্রার্থনার সুব্যবস্থা', color: 'bg-red-50 text-red-600' },
  { icon: Users, name: 'শিক্ষক মিলনায়তন', desc: 'বিশ্রাম ও আলোচনা কক্ষ', color: 'bg-pink-50 text-pink-600' },
]

export function FacilitiesPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">আমাদের সুযোগ-সুবিধা</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">শিক্ষার উন্নত পরিবেশ</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {facilities.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.name}
                className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${f.color}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.name}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:gap-3 transition-all">
            সব সুবিধা দেখুন <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
