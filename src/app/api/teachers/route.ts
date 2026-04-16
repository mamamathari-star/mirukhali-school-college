import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const active = searchParams.get("active");

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { designation: { contains: search } },
        { subject: { contains: search } },
      ];
    }
    if (active !== null && active !== "") where.status = active === "true";

    const teachers = await prisma.teacher.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: teachers, total: teachers.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const teacher = await prisma.teacher.create({
      data: { ...body, joiningDate: new Date(body.joiningDate) },
    });
    return NextResponse.json({ data: teacher }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create teacher" }, { status: 500 });
  }
}
