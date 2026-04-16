import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import GalleryGrid from "@/components/public/GalleryGrid";
import { Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = { title: "Photo Gallery" };

const categories = ["All", "Academic", "Sports", "Cultural", "Infrastructure", "Events"];

interface Props { searchParams: { category?: string } }

export default async function GalleryPage({ searchParams }: Props) {
  const category = searchParams.category || "All";

  const where: any = { isPublished: true };
  if (category !== "All") where.category = category;

  const items = await prisma.gallery
    .findMany({ where, orderBy: { createdAt: "desc" } })
    .catch(() => []);

  return (
    <div>
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-2">Photo Gallery</h1>
          <p className="text-green-100">Moments captured at Mirukhali School & College</p>
        </div>
      </section>

      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/gallery?category=${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-green-700 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-green-100 hover:text-green-800"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>
          <GalleryGrid items={items} />
        </div>
      </section>
    </div>
  );
}
