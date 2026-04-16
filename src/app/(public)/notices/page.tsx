import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import NoticeCard from "@/components/public/NoticeCard";
import { Bell } from "lucide-react";

export const metadata: Metadata = { title: "Notices" };

const categories = ["All", "General", "Academic", "Exam", "Holiday", "Admission", "Sports"];

interface Props {
  searchParams: { category?: string; search?: string; page?: string };
}

export default async function NoticesPage({ searchParams }: Props) {
  const category = searchParams.category || "All";
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page || "1");
  const limit = 12;

  const where: any = { isPublished: true };
  if (category !== "All") where.category = category;
  if (search) where.title = { contains: search };

  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.notice.count({ where }),
  ]).catch(() => [[], 0]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Bell className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-2">Notices & Announcements</h1>
          <p className="text-green-100">Stay updated with the latest news and announcements</p>
        </div>
      </section>

      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/notices?category=${cat}${search ? `&search=${search}` : ""}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-800"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>

          {notices.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl font-medium">No notices found</p>
              <p className="text-sm mt-1">Check back later for updates</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <a
                      key={i}
                      href={`/notices?category=${category}&page=${i + 1}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        page === i + 1
                          ? "bg-green-700 text-white"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-green-50"
                      }`}
                    >
                      {i + 1}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
