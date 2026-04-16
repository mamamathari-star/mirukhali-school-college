import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [students, teachers, notices, admissions, pendingAdmissions, certificates] = await Promise.all([
      prisma.student.count({ where: { status: "ACTIVE" } }),
      prisma.teacher.count({ where: { status: true } }),
      prisma.notice.count({ where: { isPublished: true } }),
      prisma.admission.count(),
      prisma.admission.count({ where: { status: "PENDING" } }),
      prisma.certificate.count(),
    ]);

    const recentAdmissions = await prisma.admission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, applicantName: true, class: true, status: true, createdAt: true },
    });

    const recentNotices = await prisma.notice.findMany({
      take: 5,
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, category: true, createdAt: true },
    });

    return NextResponse.json({
      data: {
        students,
        teachers,
        notices,
        admissions,
        pendingAdmissions,
        certificates,
        recentAdmissions,
        recentNotices,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
