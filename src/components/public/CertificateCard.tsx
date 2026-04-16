import Image from "next/image";
import { CheckCircle, Calendar, Hash, User, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface CertificateCardProps {
  certificate: {
    certificateNo: string;
    studentName: string;
    fatherName: string;
    class: string;
    session: string;
    issueDate: Date | string;
    type: string;
    qrCode?: string | null;
    isVerified: boolean;
  };
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <div className="bg-white border-2 border-green-700 rounded-xl p-6 max-w-xl mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-yellow-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GraduationCap className="w-8 h-8 text-green-800" />
          <h2 className="text-xl font-bold text-green-800">Mirukhali School & College</h2>
        </div>
        <p className="text-sm text-gray-500">Mathbaria, Pirojpur, Bangladesh | EIIN: 102726</p>
        <div className="mt-3">
          <Badge variant="success" className="text-sm px-4 py-1">
            <CheckCircle className="w-4 h-4 mr-1 inline" />
            VERIFIED CERTIFICATE
          </Badge>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <Hash className="w-5 h-5 text-green-700 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Certificate Number</p>
            <p className="font-bold text-green-800 text-lg tracking-wider">{certificate.certificateNo}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <User className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Student Name</p>
            <p className="font-semibold text-gray-900">{certificate.studentName}</p>
            <p className="text-sm text-gray-600">Father: {certificate.fatherName}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Class / Level</p>
            <p className="font-semibold">{certificate.class}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Session</p>
            <p className="font-semibold">{certificate.session}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Certificate Type</p>
            <p className="font-semibold capitalize">{certificate.type.toLowerCase()}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Issue Date</p>
              <p className="font-semibold">{formatDate(certificate.issueDate)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code */}
      {certificate.qrCode && (
        <div className="text-center border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 mb-2">Scan to verify authenticity</p>
          <Image
            src={certificate.qrCode}
            alt="Certificate QR Code"
            width={120}
            height={120}
            className="mx-auto border border-gray-200 rounded"
          />
        </div>
      )}
    </div>
  );
}
