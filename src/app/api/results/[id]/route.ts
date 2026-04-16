import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await prisma.result.findUnique({
      where: { id: params.id },
      include: { student: true },
    });
    if (!result) return NextResponse.json({ error: "Result not found" }, { status: 404 });
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch result" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const result = await prisma.result.update({
      where: { id: params.id },
      data: {
        ...body,
        fullMarks: body.fullMarks ? parseFloat(body.fullMarks) : undefined,
        passMarks: body.passMarks ? parseFloat(body.passMarks) : undefined,
        obtainedMarks: body.obtainedMarks ? parseFloat(body.obtainedMarks) : undefined,
        gpa: body.gpa ? parseFloat(body.gpa) : null,
      },
    });
    return NextResponse.json({ data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update result" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.result.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Result deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete result" }, { status: 500 });
  }
}
