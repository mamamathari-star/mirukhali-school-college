import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id: params.id } });
    if (!teacher) return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    return NextResponse.json({ data: teacher });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teacher" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const teacher = await prisma.teacher.update({
      where: { id: params.id },
      data: { ...body, joiningDate: body.joiningDate ? new Date(body.joiningDate) : undefined },
    });
    return NextResponse.json({ data: teacher });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update teacher" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.teacher.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 });
  }
}
