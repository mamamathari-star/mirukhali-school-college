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
  examName: z.string().min(1),
  subject: z.string().min(1),
  fullMarks: z.string().min(1),
  passMarks: z.string().min(1),
  obtainedMarks: z.string().min(1),
  grade: z.string().optional(),
  gpa: z.string().optional(),
  session: z.string().min(1),
  class: z.string().min(1),
  section: z.string().optional(),
  year: z.string().min(4),
});
type FormData = z.infer<typeof schema>;
const exams = ["Annual Exam","Half Yearly","First Term","Second Term","Test Exam","SSC","HSC"];
const grades = ["A+","A","A-","B","C","D","F"];

export default function ResultForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: initialData });
  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { router.push("/admin/results"); router.refresh(); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2"><Label>Student ID *</Label><Input {...register("studentId")}/></div>
        <div className="space-y-2"><Label>Exam Name *</Label>
          <Select onValueChange={(v) => setValue("examName", v)}><SelectTrigger><SelectValue placeholder="Select exam"/></SelectTrigger><SelectContent>{exams.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="space-y-2"><Label>Subject *</Label><Input {...register("subject")}/></div>
        <div className="space-y-2"><Label>Class *</Label><Input {...register("class")}/></div>
        <div className="space-y-2"><Label>Section</Label><Input {...register("section")}/></div>
        <div className="space-y-2"><Label>Session *</Label><Input {...register("session")}/></div>
        <div className="space-y-2"><Label>Year *</Label><Input {...register("year")} placeholder={String(new Date().getFullYear())}/></div>
        <div className="space-y-2"><Label>Full Marks *</Label><Input type="number" {...register("fullMarks")}/></div>
        <div className="space-y-2"><Label>Pass Marks *</Label><Input type="number" {...register("passMarks")}/></div>
        <div className="space-y-2"><Label>Obtained Marks *</Label><Input type="number" {...register("obtainedMarks")}/></div>
        <div className="space-y-2"><Label>Grade</Label><Select onValueChange={(v) => setValue("grade", v)}><SelectTrigger><SelectValue placeholder="Grade"/></SelectTrigger><SelectContent>{grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-2"><Label>GPA</Label><Input type="number" step="0.01" {...register("gpa")}/></div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Saving...</> : "Add Result"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
