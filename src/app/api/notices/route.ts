import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const published = searchParams.get("published");

    const where: any = {};
    if (category) where.category = category;
    if (search) where.title = { contains: search };
    if (published === "true") where.isPublished = true;

    const [notices, total] = await Promise.all([
      prisma.notice.findMany({
        where,
        include: { author: { select: { name: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.notice.count({ where }),
    ]);

    return NextResponse.json({ data: notices, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const notice = await prisma.notice.create({
      data: {
        ...body,
        authorId: (session.user as any).id,
        publishedAt: body.isPublished ? new Date() : null,
      },
    });
    return NextResponse.json({ data: notice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create notice" }, { status: 500 });
  }
}
