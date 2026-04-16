import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ResultRow {
  id: string;
  subject: string;
  fullMarks: number;
  passMarks: number;
  obtainedMarks: number;
  grade?: string | null;
  gpa?: number | null;
  examName: string;
  year: string;
}

interface ResultTableProps {
  results: ResultRow[];
  studentName?: string;
  studentId?: string;
}

function getGradeVariant(grade?: string | null): "success" | "warning" | "destructive" | "default" {
  if (!grade) return "default";
  if (["A+", "A"].includes(grade)) return "success";
  if (["A-", "B"].includes(grade)) return "info" as any;
  if (["C", "D"].includes(grade)) return "warning";
  if (grade === "F") return "destructive";
  return "default";
}

export default function ResultTable({ results, studentName, studentId }: ResultTableProps) {
  if (!results.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No results found</p>
        <p className="text-sm mt-1">Please check the student ID and exam details</p>
      </div>
    );
  }

  const total = results.reduce((sum, r) => sum + r.obtainedMarks, 0);
  const totalFull = results.reduce((sum, r) => sum + r.fullMarks, 0);
  const percentage = totalFull > 0 ? ((total / totalFull) * 100).toFixed(2) : "0";

  return (
    <div className="space-y-4">
      {(studentName || studentId) && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {studentName && (
              <div><span className="font-medium text-gray-600">Student Name:</span> <span className="font-semibold">{studentName}</span></div>
            )}
            {studentId && (
              <div><span className="font-medium text-gray-600">Student ID:</span> <span className="font-semibold">{studentId}</span></div>
            )}
            {results[0] && (
              <>
                <div><span className="font-medium text-gray-600">Class:</span> {results[0].examName}</div>
                <div><span className="font-medium text-gray-600">Year:</span> {results[0].year}</div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-800 text-white hover:bg-green-800">
              <TableHead className="text-white font-semibold">Subject</TableHead>
              <TableHead className="text-white font-semibold text-center">Full Marks</TableHead>
              <TableHead className="text-white font-semibold text-center">Pass Marks</TableHead>
              <TableHead className="text-white font-semibold text-center">Obtained</TableHead>
              <TableHead className="text-white font-semibold text-center">Grade</TableHead>
              <TableHead className="text-white font-semibold text-center">GPA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, i) => (
              <TableRow key={result.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="font-medium">{result.subject}</TableCell>
                <TableCell className="text-center">{result.fullMarks}</TableCell>
                <TableCell className="text-center">{result.passMarks}</TableCell>
                <TableCell className="text-center font-semibold">
                  <span className={result.obtainedMarks >= result.passMarks ? "text-green-700" : "text-red-600"}>
                    {result.obtainedMarks}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {result.grade && (
                    <Badge variant={getGradeVariant(result.grade)}>{result.grade}</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">{result.gpa ?? "-"}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-green-50 font-semibold">
              <TableCell>Total</TableCell>
              <TableCell className="text-center">{totalFull}</TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center text-green-800">{total}</TableCell>
              <TableCell className="text-center">{percentage}%</TableCell>
              <TableCell className="text-center">-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
