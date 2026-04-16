"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description?: string | null;
  takenAt?: Date | string | null;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  if (!items.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No gallery items found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-100 border border-gray-200 hover:border-green-400 transition-all"
            onClick={() => setLightbox(item)}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
              <p className="text-white text-sm font-medium truncate">{item.title}</p>
              {item.takenAt && (
                <p className="text-white/70 text-xs">{formatDate(item.takenAt)}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[60vh]">
              <Image
                src={lightbox.imageUrl}
                alt={lightbox.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-black/80 text-white p-4 rounded-b-lg">
              <h3 className="font-semibold text-lg">{lightbox.title}</h3>
              {lightbox.description && <p className="text-gray-300 text-sm mt-1">{lightbox.description}</p>}
              <div className="flex gap-4 mt-2 text-xs text-gray-400">
                <span>{lightbox.category}</span>
                {lightbox.takenAt && <span>{formatDate(lightbox.takenAt)}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
