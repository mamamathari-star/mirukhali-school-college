"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ResultTable from "@/components/public/ResultTable";
import { Search, Loader2, Trophy } from "lucide-react";

const schema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  examName: z.string().min(1, "Exam name is required"),
  year: z.string().min(1, "Year is required"),
});

type FormData = z.infer<typeof schema>;

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));
const exams = ["Annual Exam", "Half Yearly", "First Term", "Second Term", "Test Exam", "SSC", "HSC"];

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [studentInfo, setStudentInfo] = useState<any>(null);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSearch = async (data: FormData) => {
    const params = new URLSearchParams({
      studentId: data.studentId,
      examName: data.examName,
      year: data.year,
    });
    const res = await fetch(`/api/results?${params}`);
    const json = await res.json();
    setResults(json.data || []);
    if (json.data?.length > 0) {
      setStudentInfo(json.data[0].student);
    } else {
      setStudentInfo(null);
    }
    setSearched(true);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-2">Exam Results</h1>
          <p className="text-green-100">Search for student examination results</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Search className="w-5 h-5 text-green-700" />
              Search Results
            </h2>
            <form onSubmit={handleSubmit(onSearch)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID *</Label>
                <Input id="studentId" {...register("studentId")} placeholder="Enter student ID" />
                {errors.studentId && <p className="text-xs text-red-600">{errors.studentId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Exam Name *</Label>
                <Select onValueChange={(v) => setValue("examName", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select examination" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.examName && <p className="text-xs text-red-600">{errors.examName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Year *</Label>
                <Select onValueChange={(v) => setValue("year", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.year && <p className="text-xs text-red-600">{errors.year.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Searching...</>
                ) : (
                  <><Search className="w-4 h-4 mr-2" /> Search Results</>
                )}
              </Button>
            </form>
          </div>

          {searched && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h3>
              <ResultTable
                results={results}
                studentName={studentInfo?.name}
                studentId={studentInfo?.studentId}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
