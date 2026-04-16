import Image from "next/image";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommitteeMemberProps {
  member: {
    id: string;
    name: string;
    banglaName?: string | null;
    designation: string;
    role: string;
    phone?: string | null;
    photo?: string | null;
    tenure?: string | null;
  };
}

const roleColors: Record<string, "default" | "success" | "warning" | "info"> = {
  PRESIDENT: "success",
  SECRETARY: "warning",
  MEMBER: "default",
  TEACHER_REP: "info",
};

const roleLabels: Record<string, string> = {
  PRESIDENT: "President",
  SECRETARY: "Secretary",
  MEMBER: "Member",
  TEACHER_REP: "Teacher Representative",
};

export default function CommitteeCard({ member }: CommitteeMemberProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow hover:border-green-300">
      <div className="relative mx-auto mb-4 w-24 h-24">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="rounded-full object-cover border-3 border-green-200"
          />
        ) : (
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center border-3 border-green-200">
            <span className="text-3xl font-bold text-green-700">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <Badge variant={roleColors[member.role] || "default"} className="mb-2">
        {roleLabels[member.role] || member.role}
      </Badge>

      <h3 className="font-bold text-gray-900 mt-2">{member.name}</h3>
      {member.banglaName && <p className="text-sm text-gray-600">{member.banglaName}</p>}
      <p className="text-sm text-gray-500 mt-1">{member.designation}</p>
      {member.tenure && <p className="text-xs text-gray-400 mt-1">Tenure: {member.tenure}</p>}
      {member.phone && (
        <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-500">
          <Phone className="w-3 h-3" />
          <span>{member.phone}</span>
        </div>
      )}
    </div>
  );
}
