import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: params.id },
    });
    if (!certificate) return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    return NextResponse.json({ data: certificate });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch certificate" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const certificate = await prisma.certificate.update({
      where: { id: params.id },
      data: { ...body, issueDate: body.issueDate ? new Date(body.issueDate) : undefined },
    });
    return NextResponse.json({ data: certificate });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update certificate" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.certificate.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Certificate deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
