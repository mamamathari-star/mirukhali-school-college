import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { ArrowRight } from 'lucide-react'

export async function GalleryPreview() {
  const items = await prisma.galleryItem.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  })

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">ছবি ঘর</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">ফটো গ্যালারি</h2>
          </div>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:gap-3 transition-all text-sm">
            সব ছবি <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative aspect-video rounded-xl overflow-hidden group">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-sm font-medium">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
