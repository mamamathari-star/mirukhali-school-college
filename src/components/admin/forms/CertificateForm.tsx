"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const schema = z.object({
  studentId: z.string().min(1),
  studentName: z.string().min(2),
  fatherName: z.string().min(2),
  class: z.string().min(1),
  session: z.string().min(1),
  issueDate: z.string().min(1),
  type: z.enum(["TESTIMONIAL","CHARACTER","TRANSFER","CERTIFICATE"]),
});
type FormData = z.infer<typeof schema>;

export default function CertificateForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema), defaultValues: initialData,
  });
  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/certificates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { router.push("/admin/certificates"); router.refresh(); }
  };
  const currentYear = new Date().getFullYear();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2"><Label>Student Name *</Label><Input {...register("studentName")}/>{errors.studentName && <p className="text-xs text-red-600">{errors.studentName.message}</p>}</div>
        <div className="space-y-2"><Label>Father Name *</Label><Input {...register("fatherName")}/></div>
        <div className="space-y-2"><Label>Student ID *</Label><Input {...register("studentId")} placeholder="Student ID or custom"/></div>
        <div className="space-y-2"><Label>Class *</Label><Input {...register("class")}/></div>
        <div className="space-y-2"><Label>Session *</Label><Input {...register("session")} placeholder={String(currentYear)}/></div>
        <div className="space-y-2"><Label>Issue Date *</Label><Input type="date" {...register("issueDate")}/></div>
        <div className="space-y-2"><Label>Certificate Type *</Label>
          <Select onValueChange={(v) => setValue("type", v as any)}>
            <SelectTrigger><SelectValue placeholder="Select type"/></SelectTrigger>
            <SelectContent>
              <SelectItem value="TESTIMONIAL">Testimonial</SelectItem>
              <SelectItem value="CHARACTER">Character Certificate</SelectItem>
              <SelectItem value="TRANSFER">Transfer Certificate</SelectItem>
              <SelectItem value="CERTIFICATE">Certificate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Generating...</> : "Issue Certificate"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
