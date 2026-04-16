'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Image as ImageIcon, X } from 'lucide-react'

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([])
  const [category, setCategory] = useState('')
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/public/gallery${category ? `?category=${category}` : ''}`)
      .then(r => r.json())
      .then(d => setItems(d.items || []))
  }, [category])

  const categories = ['', 'campus', 'sports', 'academic', 'cultural']
  const catLabels: Record<string, string> = {
    '': 'সব', campus: 'ক্যাম্পাস', sports: 'ক্রীড়া', academic: 'একাডেমিক', cultural: 'সাংস্কৃতিক',
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">ফটো গ্যালারি</h1>
          <p className="text-blue-200">আমাদের বিদ্যালয়ের স্মরণীয় মুহূর্তসমূহ</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {catLabels[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div
              key={item.id}
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelected(item)}
            >
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-xs font-medium">{item.title}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>কোনো ছবি নেই</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-4 right-4 text-white" onClick={() => setSelected(null)}>
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image src={selected.imageUrl} alt={selected.title} fill className="object-contain" />
            </div>
            <p className="text-white text-center mt-4 font-medium">{selected.title}</p>
            {selected.description && <p className="text-gray-300 text-center text-sm mt-1">{selected.description}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
