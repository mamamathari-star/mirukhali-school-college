import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const notice = await prisma.notice.findUnique({
      where: { id: params.id },
      include: { author: { select: { name: true } } },
    });
    if (!notice) return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    return NextResponse.json({ data: notice });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notice" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const existing = await prisma.notice.findUnique({ where: { id: params.id } });
    const notice = await prisma.notice.update({
      where: { id: params.id },
      data: {
        ...body,
        publishedAt: body.isPublished && !existing?.publishedAt ? new Date() : existing?.publishedAt,
      },
    });
    return NextResponse.json({ data: notice });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update notice" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.notice.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Notice deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
  }
}
