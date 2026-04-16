import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateCertNo, generateQR } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";

    const where: any = {};
    if (search) {
      where.OR = [
        { certificateNo: { contains: search } },
        { studentName: { contains: search } },
      ];
    }
    if (type) where.type = type;

    const certificates = await prisma.certificate.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: certificates, total: certificates.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const certNo = body.certificateNo || generateCertNo(body.type?.slice(0, 4) || "CERT");
    const verifyUrl = `${process.env.NEXTAUTH_URL}/verify?cert=${certNo}`;
    const qrCode = await generateQR(verifyUrl);

    const certificate = await prisma.certificate.create({
      data: {
        ...body,
        certificateNo: certNo,
        issueDate: new Date(body.issueDate),
        qrCode,
      },
    });
    return NextResponse.json({ data: certificate }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create certificate" }, { status: 500 });
  }
}
