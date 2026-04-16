import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const cls = searchParams.get("class") || "";
    const status = searchParams.get("status") || "";

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { studentId: { contains: search } },
        { fatherName: { contains: search } },
      ];
    }
    if (cls) where.class = cls;
    if (status) where.status = status;

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.student.count({ where }),
    ]);

    return NextResponse.json({ data: students, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const student = await prisma.student.create({
      data: {
        ...body,
        dateOfBirth: new Date(body.dateOfBirth),
        roll: body.roll ? parseInt(body.roll) : null,
      },
    });
    return NextResponse.json({ data: student }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create student" }, { status: 500 });
  }
}
