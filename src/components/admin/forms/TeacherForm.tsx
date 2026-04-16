"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const schema = z.object({
  employeeId: z.string().min(1),
  name: z.string().min(2),
  banglaName: z.string().optional(),
  designation: z.string().min(2),
  subject: z.string().min(1),
  qualification: z.string().optional(),
  joiningDate: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  nid: z.string().optional(),
  address: z.string().optional(),
  status: z.boolean().default(true),
});
type FormData = z.infer<typeof schema>;

interface Props { initialData?: any; mode: "create" | "edit" }

export default function TeacherForm({ initialData, mode }: Props) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });
  const onSubmit = async (data: FormData) => {
    const url = mode === "edit" ? `/api/teachers/${initialData?.id}` : "/api/teachers";
    const res = await fetch(url, { method: mode === "edit" ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { router.push("/admin/teachers"); router.refresh(); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {([["employeeId","Employee ID"],["name","Full Name"],["banglaName","Bangla Name"],["designation","Designation"],["subject","Subject"],["qualification","Qualification"],["phone","Phone"],["email","Email"],["nid","NID"],["address","Address"]] as const).map(([field, label]) => (
          <div key={field} className="space-y-2">
            <Label>{label}</Label>
            <Input {...register(field as any)} />
            {errors[field as keyof typeof errors] && <p className="text-xs text-red-600">{(errors[field as keyof typeof errors] as any)?.message}</p>}
          </div>
        ))}
        <div className="space-y-2">
          <Label>Joining Date *</Label>
          <Input type="date" {...register("joiningDate")} />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Saving...</> : mode === "edit" ? "Update" : "Add Teacher"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
