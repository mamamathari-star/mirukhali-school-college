import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId") || "";
    const examName = searchParams.get("examName") || "";
    const year = searchParams.get("year") || "";
    const cls = searchParams.get("class") || "";

    const where: any = {};
    if (studentId) {
      const student = await prisma.student.findFirst({ where: { studentId } });
      if (student) where.studentId = student.id;
      else return NextResponse.json({ data: [], total: 0 });
    }
    if (examName) where.examName = { contains: examName };
    if (year) where.year = year;
    if (cls) where.class = cls;

    const results = await prisma.result.findMany({
      where,
      include: { student: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: results, total: results.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const result = await prisma.result.create({
      data: {
        ...body,
        fullMarks: parseFloat(body.fullMarks),
        passMarks: parseFloat(body.passMarks),
        obtainedMarks: parseFloat(body.obtainedMarks),
        gpa: body.gpa ? parseFloat(body.gpa) : null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
      },
    });
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create result" }, { status: 500 });
  }
}
