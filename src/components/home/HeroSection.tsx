'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1d4ed8] text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm px-4 py-1.5 rounded-full mb-6">
              EIIN: 102726 | স্থাপিত ১৯৩৭
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            মিরুখালি স্কুল ও কলেজ
            <span className="block text-amber-400 text-2xl lg:text-3xl font-normal mt-2">
              Mirukhali School &amp; College
            </span>
          </motion.h1>

          <motion.p
            className="text-blue-100 text-lg lg:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ১৯৩৭ সাল থেকে মানসম্পন্ন শিক্ষা প্রদানে নিবেদিত। মঠবাড়িয়া, পিরোজপুর, বরিশাল, বাংলাদেশ।
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white border-0">
              <Link href="/admission">
                <GraduationCap className="mr-2 h-5 w-5" />
                ভর্তি হোন
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <Link href="/about">
                আরও জানুন
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 0C1200 40 960 60 720 60C480 60 240 40 0 0L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
