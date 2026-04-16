import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const published = searchParams.get("published");

    const where: any = {};
    if (category) where.category = category;
    if (published === "true") where.isPublished = true;

    const items = await prisma.gallery.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: items, total: items.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const item = await prisma.gallery.create({
      data: { ...body, takenAt: body.takenAt ? new Date(body.takenAt) : null },
    });
    return NextResponse.json({ data: item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create gallery item" }, { status: 500 });
  }
}
