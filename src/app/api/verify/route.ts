import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { certificateNo } = await req.json();
    if (!certificateNo) return NextResponse.json({ error: "Certificate number required" }, { status: 400 });

    const certificate = await prisma.certificate.findUnique({
      where: { certificateNo },
    });

    if (!certificate) {
      return NextResponse.json({ verified: false, message: "Certificate not found" });
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    await prisma.verificationLog.create({
      data: {
        certificateId: certificate.id,
        verifierIp: ip,
        verifierAgent: userAgent,
      },
    });

    await prisma.certificate.update({
      where: { id: certificate.id },
      data: { isVerified: true, verifiedAt: new Date() },
    });

    return NextResponse.json({ verified: true, certificate });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
