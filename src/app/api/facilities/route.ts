import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: "asc" },
    });
    return NextResponse.json({ data: facilities });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch facilities" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const facility = await prisma.facility.create({ data: body });
    return NextResponse.json({ data: facility }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create facility" }, { status: 500 });
  }
}
