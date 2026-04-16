import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CommitteeCard from "@/components/public/CommitteeCard";
import { Users } from "lucide-react";

export const metadata: Metadata = { title: "Managing Committee" };

export default async function CommitteePage() {
  const members = await prisma.committeeMember
    .findMany({
      where: { isActive: true },
      orderBy: [{ orderIndex: "asc" }, { role: "asc" }],
    })
    .catch(() => []);

  const president = members.filter(m => m.role === "PRESIDENT");
  const secretary = members.filter(m => m.role === "SECRETARY");
  const teacherReps = members.filter(m => m.role === "TEACHER_REP");
  const regularMembers = members.filter(m => m.role === "MEMBER");

  return (
    <div>
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-2">Managing Committee</h1>
          <p className="text-green-100">The governing body of Mirukhali School & College</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {members.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl font-medium">Committee information not available</p>
            </div>
          ) : (
            <div className="space-y-12">
              {president.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-200 flex items-center gap-2">
                    <span className="w-2 h-6 bg-green-700 rounded-full inline-block" />
                    President
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {president.map(m => <CommitteeCard key={m.id} member={m} />)}
                  </div>
                </div>
              )}

              {secretary.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-yellow-200 flex items-center gap-2">
                    <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block" />
                    Secretary
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {secretary.map(m => <CommitteeCard key={m.id} member={m} />)}
                  </div>
                </div>
              )}

              {teacherReps.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-200 flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-500 rounded-full inline-block" />
                    Teacher Representatives
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {teacherReps.map(m => <CommitteeCard key={m.id} member={m} />)}
                  </div>
                </div>
              )}

              {regularMembers.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200 flex items-center gap-2">
                    <span className="w-2 h-6 bg-gray-500 rounded-full inline-block" />
                    Committee Members
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {regularMembers.map(m => <CommitteeCard key={m.id} member={m} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
