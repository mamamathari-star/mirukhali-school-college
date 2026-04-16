import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admission = await prisma.admission.findUnique({ where: { id: params.id } });
    if (!admission) return NextResponse.json({ error: "Admission not found" }, { status: 404 });
    return NextResponse.json({ data: admission });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admission" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const admission = await prisma.admission.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ data: admission });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update admission" }, { status: 500 });
  }
}
