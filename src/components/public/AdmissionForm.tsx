"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  applicantName: z.string().min(2, "Name is required"),
  fatherName: z.string().min(2, "Father name is required"),
  motherName: z.string().min(2, "Mother name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  class: z.string().min(1, "Class is required"),
  session: z.string().min(1, "Session is required"),
  previousSchool: z.string().optional(),
  previousClass: z.string().optional(),
  previousGpa: z.string().optional(),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Address is required"),
});

type FormData = z.infer<typeof schema>;

const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
const currentYear = new Date().getFullYear();
const sessions = [`${currentYear}`, `${currentYear + 1}`, `${currentYear}-${(currentYear + 1).toString().slice(-2)}`];

export default function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/admissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      setApplicationId(json.data.id);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
        <p className="text-gray-600 mb-4">
          Your admission application has been submitted successfully.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
          <p className="text-sm text-gray-600">Your Application ID:</p>
          <p className="text-xl font-bold text-green-800 font-mono">{applicationId.slice(-8).toUpperCase()}</p>
        </div>
        <p className="text-sm text-gray-500 mt-4">Please save this ID for future reference. We will contact you after reviewing your application.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="applicantName">Applicant Name *</Label>
          <Input id="applicantName" {...register("applicantName")} placeholder="Full name in English" />
          {errors.applicantName && <p className="text-xs text-red-600">{errors.applicantName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && <p className="text-xs text-red-600">{errors.dateOfBirth.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fatherName">Father&apos;s Name *</Label>
          <Input id="fatherName" {...register("fatherName")} placeholder="Father's full name" />
          {errors.fatherName && <p className="text-xs text-red-600">{errors.fatherName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="motherName">Mother&apos;s Name *</Label>
          <Input id="motherName" {...register("motherName")} placeholder="Mother's full name" />
          {errors.motherName && <p className="text-xs text-red-600">{errors.motherName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Gender *</Label>
          <Select onValueChange={(v) => setValue("gender", v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-xs text-red-600">{errors.gender.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Class Applying For *</Label>
          <Select onValueChange={(v) => setValue("class", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.class && <p className="text-xs text-red-600">{errors.class.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Session *</Label>
          <Select onValueChange={(v) => setValue("session", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select session" />
            </SelectTrigger>
            <SelectContent>
              {sessions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.session && <p className="text-xs text-red-600">{errors.session.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Contact Phone *</Label>
          <Input id="phone" {...register("phone")} placeholder="01XXXXXXXXX" />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="previousSchool">Previous School</Label>
          <Input id="previousSchool" {...register("previousSchool")} placeholder="Previous school name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="previousGpa">Previous GPA</Label>
          <Input id="previousGpa" {...register("previousGpa")} placeholder="e.g. 4.50" type="number" step="0.01" min="0" max="5" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea id="address" {...register("address")} placeholder="Full address" rows={3} />
        {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
}
