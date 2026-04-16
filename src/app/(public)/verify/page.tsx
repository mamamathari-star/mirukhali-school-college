"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CertificateCard from "@/components/public/CertificateCard";
import { CheckCircle, XCircle, Search, Loader2, ShieldCheck } from "lucide-react";
import { Suspense } from "react";

const schema = z.object({
  certificateNo: z.string().min(3, "Certificate number is required"),
});

type FormData = z.infer<typeof schema>;

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialCert = searchParams.get("cert") || "";
  const [certificate, setCertificate] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { certificateNo: initialCert },
  });

  const onVerify = async (data: FormData) => {
    setNotFound(false);
    setCertificate(null);
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ certificateNo: data.certificateNo }),
    });
    const json = await res.json();
    if (json.verified && json.certificate) {
      setCertificate(json.certificate);
    } else {
      setNotFound(true);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Search className="w-5 h-5 text-green-700" />
          Enter Certificate Number
        </h2>
        <form onSubmit={handleSubmit(onVerify)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="certificateNo">Certificate Number</Label>
            <Input
              id="certificateNo"
              {...register("certificateNo")}
              placeholder="e.g. CERT-2024-12345"
              className="text-lg font-mono"
            />
            {errors.certificateNo && <p className="text-xs text-red-600">{errors.certificateNo.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
            ) : (
              <><CheckCircle className="w-4 h-4 mr-2" /> Verify Certificate</>
            )}
          </Button>
        </form>
      </div>

      {notFound && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-800 mb-2">Certificate Not Found</h3>
          <p className="text-red-600">
            No certificate was found with this number. Please check and try again.
            If you believe this is an error, contact the institution.
          </p>
        </div>
      )}

      {certificate && (
        <div>
          <div className="flex items-center gap-2 text-green-700 mb-4">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold text-lg">Certificate Verified Successfully</span>
          </div>
          <CertificateCard certificate={certificate} />
        </div>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-2">Certificate Verification</h1>
          <p className="text-green-100">Verify the authenticity of certificates issued by our institution</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <VerifyContent />
        </Suspense>
      </section>
    </div>
  );
}
