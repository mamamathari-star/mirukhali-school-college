"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  category: z.string().min(1),
  attachmentUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
});
type FormData = z.infer<typeof schema>;

const categories = ["General","Academic","Exam","Holiday","Admission","Sports","Cultural"];

interface Props { initialData?: any; mode: "create" | "edit" }

export default function NoticeForm({ initialData, mode }: Props) {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { isPublished: false },
  });
  const onSubmit = async (data: FormData) => {
    const url = mode === "edit" ? `/api/notices/${initialData?.id}` : "/api/notices";
    const res = await fetch(url, { method: mode === "edit" ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { router.push("/admin/notices"); router.refresh(); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2"><Label>Title *</Label><Input {...register("title")} />{errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}</div>
      <div className="space-y-2"><Label>Category *</Label>
        <Select onValueChange={(v) => setValue("category", v)} defaultValue={initialData?.category || "General"}>
          <SelectTrigger><SelectValue/></SelectTrigger>
          <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="space-y-2"><Label>Content *</Label><Textarea {...register("content")} rows={8} />{errors.content && <p className="text-xs text-red-600">{errors.content.message}</p>}</div>
      <div className="space-y-2"><Label>Attachment URL</Label><Input {...register("attachmentUrl")} placeholder="https://..." /></div>
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register("isPublished")} className="w-4 h-4"/><span className="text-sm font-medium">Publish immediately</span></label>
      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Saving...</> : mode === "edit" ? "Update" : "Create Notice"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
