import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, Paperclip, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const notice = await prisma.notice.findUnique({ where: { id: params.id } }).catch(() => null);
  return { title: notice?.title || "Notice" };
}

export default async function NoticePage({ params }: Props) {
  const notice = await prisma.notice
    .findUnique({
      where: { id: params.id, isPublished: true },
      include: { author: { select: { name: true } } },
    })
    .catch(() => null);

  if (!notice) notFound();

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/notices">
          <Button variant="ghost" size="sm" className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Notices
          </Button>
        </Link>

        <article className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Badge>{notice.category}</Badge>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(notice.publishedAt || notice.createdAt)}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{notice.title}</h1>

          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {notice.content}
          </div>

          {notice.attachmentUrl && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <a
                href={notice.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium"
              >
                <Paperclip className="w-4 h-4" />
                Download Attachment
              </a>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-400">
            <User className="w-4 h-4" />
            <span>Posted by: {notice.author?.name || "Administration"}</span>
          </div>
        </article>
      </div>
    </div>
  );
}
