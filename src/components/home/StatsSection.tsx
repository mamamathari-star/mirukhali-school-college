'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Users, GraduationCap, Calendar, Hash } from 'lucide-react'

const stats = [
  { label: 'শিক্ষার্থী', value: 679, suffix: '+', icon: Users, color: 'text-blue-600' },
  { label: 'শিক্ষকমণ্ডলী', value: 13, suffix: '', icon: GraduationCap, color: 'text-green-600' },
  { label: 'প্রতিষ্ঠিত', value: 1937, suffix: '', icon: Calendar, color: 'text-amber-600' },
  { label: 'EIIN', value: 102726, suffix: '', icon: Hash, color: 'text-purple-600' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000
    const stepTime = Math.abs(Math.floor(duration / end))
    const timer = setInterval(() => {
      start += Math.ceil(end / 80)
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [value])

  return <span>{count.toLocaleString('bn-BD')}{suffix}</span>
}

export function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 mb-3 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
