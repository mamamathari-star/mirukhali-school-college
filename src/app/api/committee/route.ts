import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const members = await prisma.committeeMember.findMany({
      where: { isActive: true },
      orderBy: [{ orderIndex: "asc" }, { role: "asc" }],
    });
    return NextResponse.json({ data: members });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch committee" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const member = await prisma.committeeMember.create({ data: body });
    return NextResponse.json({ data: member }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create member" }, { status: 500 });
  }
}
