import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: params.id },
      include: { results: true },
    });
    if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });
    return NextResponse.json({ data: student });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch student" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const student = await prisma.student.update({
      where: { id: params.id },
      data: {
        ...body,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
        roll: body.roll ? parseInt(body.roll) : null,
      },
    });
    return NextResponse.json({ data: student });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update student" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.student.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
  }
}
