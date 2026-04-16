import Link from "next/link";
import { Calendar, Tag, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, truncate } from "@/lib/utils";

interface NoticeCardProps {
  notice: {
    id: string;
    title: string;
    content: string;
    category: string;
    attachmentUrl?: string | null;
    publishedAt?: Date | string | null;
    createdAt: Date | string;
  };
}

const categoryColors: Record<string, "default" | "success" | "warning" | "info" | "secondary"> = {
  General: "default",
  Academic: "success",
  Exam: "warning",
  Holiday: "info",
  Admission: "secondary",
};

export default function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow hover:border-green-300">
      <div className="flex items-start justify-between gap-3 mb-2">
        <Badge variant={categoryColors[notice.category] || "default"}>{notice.category}</Badge>
        <span className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
          <Calendar className="w-3 h-3" />
          {formatDate(notice.publishedAt || notice.createdAt)}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 leading-snug">
        <Link href={`/notices/${notice.id}`} className="hover:text-green-700 transition-colors">
          {notice.title}
        </Link>
      </h3>
      <p className="text-sm text-gray-600 mb-3">{truncate(notice.content, 120)}</p>
      <div className="flex items-center justify-between">
        <Link
          href={`/notices/${notice.id}`}
          className="text-sm text-green-700 hover:text-green-800 font-medium hover:underline"
        >
          Read more →
        </Link>
        {notice.attachmentUrl && (
          <a
            href={notice.attachmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Paperclip className="w-3 h-3" />
            Attachment
          </a>
        )}
      </div>
    </div>
  );
}
