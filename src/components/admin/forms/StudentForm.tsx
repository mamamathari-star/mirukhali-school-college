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
  studentId: z.string().min(1, "Student ID required"),
  name: z.string().min(2, "Name required"),
  banglaName: z.string().optional(),
  fatherName: z.string().min(2, "Father name required"),
  motherName: z.string().min(2, "Mother name required"),
  dateOfBirth: z.string().min(1, "Date of birth required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  religion: z.string().optional(),
  class: z.string().min(1, "Class required"),
  section: z.string().optional(),
  roll: z.string().optional(),
  session: z.string().min(1, "Session required"),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

type FormData = z.infer<typeof schema>;

const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
const currentYear = new Date().getFullYear();
const sessions = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

interface Props {
  initialData?: Partial<FormData & { id: string }>;
  mode: "create" | "edit";
}

export default function StudentForm({ initialData, mode }: Props) {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData as FormData,
  });

  const onSubmit = async (data: FormData) => {
    const url = mode === "edit" && initialData?.id
      ? `/api/students/${initialData.id}`
      : "/api/students";
    const method = mode === "edit" ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/students");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Student ID *</Label>
          <Input {...register("studentId")} placeholder="e.g. STU-2024-001" />
          {errors.studentId && <p className="text-xs text-red-600">{errors.studentId.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Full Name (English) *</Label>
          <Input {...register("name")} placeholder="Full name" />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Name (Bangla)</Label>
          <Input {...register("banglaName")} placeholder="বাংলা নাম" />
        </div>
        <div className="space-y-2">
          <Label>Date of Birth *</Label>
          <Input type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && <p className="text-xs text-red-600">{errors.dateOfBirth.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Father&apos;s Name *</Label>
          <Input {...register("fatherName")} />
          {errors.fatherName && <p className="text-xs text-red-600">{errors.fatherName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Mother&apos;s Name *</Label>
          <Input {...register("motherName")} />
          {errors.motherName && <p className="text-xs text-red-600">{errors.motherName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Gender *</Label>
          <Select onValueChange={(v) => setValue("gender", v as any)} defaultValue={initialData?.gender}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-xs text-red-600">{errors.gender.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Religion</Label>
          <Input {...register("religion")} placeholder="Islam, Hinduism, etc." />
        </div>
        <div className="space-y-2">
          <Label>Class *</Label>
          <Select onValueChange={(v) => setValue("class", v)} defaultValue={initialData?.class}>
            <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
            <SelectContent>
              {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.class && <p className="text-xs text-red-600">{errors.class.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Section</Label>
          <Input {...register("section")} placeholder="A, B, C..." />
        </div>
        <div className="space-y-2">
          <Label>Roll Number</Label>
          <Input type="number" {...register("roll")} />
        </div>
        <div className="space-y-2">
          <Label>Session *</Label>
          <Select onValueChange={(v) => setValue("session", v)} defaultValue={initialData?.session}>
            <SelectTrigger><SelectValue placeholder="Select session" /></SelectTrigger>
            <SelectContent>
              {sessions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.session && <p className="text-xs text-red-600">{errors.session.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input {...register("phone")} placeholder="01XXXXXXXXX" />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select onValueChange={(v) => setValue("status", v as any)} defaultValue={initialData?.status || "ACTIVE"}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : mode === "edit" ? "Update Student" : "Add Student"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
