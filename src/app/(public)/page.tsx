import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NoticeCard from "@/components/public/NoticeCard";
import {
  GraduationCap, Users, BookOpen, Monitor, Trophy, Microscope,
  Library, Building2, ChevronRight, ArrowRight, CheckCircle
} from "lucide-react";

async function getHomeData() {
  try {
    const [notices, studentCount, teacherCount] = await Promise.all([
      prisma.notice.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        take: 4,
      }),
      prisma.student.count({ where: { status: "ACTIVE" } }),
      prisma.teacher.count({ where: { status: true } }),
    ]);
    return { notices, studentCount: studentCount || 679, teacherCount: teacherCount || 13 };
  } catch {
    return { notices: [], studentCount: 679, teacherCount: 13 };
  }
}

const stats = [
  { label: "Students", value: "679+", icon: Users, color: "bg-green-700" },
  { label: "Teachers", value: "13", icon: GraduationCap, color: "bg-yellow-600" },
  { label: "Staff", value: "4", icon: Users, color: "bg-green-600" },
  { label: "Computer PCs", value: "15", icon: Monitor, color: "bg-green-800" },
];

const facilities = [
  { name: "Science Laboratory", icon: Microscope, desc: "Fully equipped science lab for practical learning" },
  { name: "Computer Lab", icon: Monitor, desc: "15 PCs with modern computing resources" },
  { name: "Library", icon: Library, desc: "Vast collection of books and educational resources" },
  { name: "Sports Ground", icon: Trophy, desc: "Large field for sports and physical education" },
  { name: "Student Hostel", icon: Building2, desc: "Comfortable residential facility for students" },
  { name: "Mosque", icon: BookOpen, desc: "On-campus mosque for prayers and religious education" },
];

const timeline = [
  { year: "1937", event: "M.E. School established on 1 January 1937" },
  { year: "1962", event: "Upgraded to Junior Secondary School" },
  { year: "1967", event: "Recognized as High School" },
  { year: "Present", event: "School & College / Higher Secondary Institution" },
];

export default async function HomePage() {
  const { notices } = await getHomeData();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-green-300 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-400 text-green-900 text-sm font-semibold px-4 py-1 rounded-full mb-6">
              EIIN: 102726 | Established 1937
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              মিরুখালী স্কুল ও কলেজ
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-yellow-300 mb-6">
              Mirukhali School & College
            </h2>
            <p className="text-lg md:text-xl text-green-100 mb-4">
              Mirukhali, Mathbaria, Pirojpur, Bangladesh
            </p>
            <p className="text-green-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              A leading educational institution serving the community since 1937. 
              Providing quality education from primary to higher secondary level 
              in a peaceful rural environment with modern facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admission">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-8">
                  Apply for Admission
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-800 font-semibold px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white shadow-md relative -mt-1 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 py-6 px-6 hover:bg-green-50 transition-colors">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Journey</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Over 85 years of educational excellence in Mathbaria, Pirojpur
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200" />
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 mb-8 last:mb-0">
                  <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xs text-center leading-tight flex-shrink-0 z-10 shadow-lg">
                    {item.year}
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 flex-1 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-gray-800 font-medium">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notices Section */}
      {notices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Notices</h2>
                <p className="text-gray-600">Stay updated with important announcements</p>
              </div>
              <Link href="/notices" className="text-green-700 hover:text-green-800 font-medium flex items-center gap-1 hidden sm:flex">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/notices">
                <Button variant="outline">View All Notices</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Facilities */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Facilities</h2>
            <p className="text-gray-600">Modern facilities for a comprehensive learning experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => (
              <Card key={f.name} className="hover:shadow-lg transition-shadow border-green-100 hover:border-green-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-700 p-3 rounded-lg text-white flex-shrink-0">
                      <f.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{f.name}</h3>
                      <p className="text-sm text-gray-600">{f.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Quick Access</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { href: "/results", label: "Check Results", icon: Trophy },
              { href: "/notices", label: "View Notices", icon: BookOpen },
              { href: "/verify", label: "Verify Certificate", icon: CheckCircle },
              { href: "/admission", label: "Apply Now", icon: GraduationCap },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="border-2 border-green-200 rounded-xl p-6 text-center hover:bg-green-700 hover:border-green-700 hover:text-white transition-all group cursor-pointer">
                  <item.icon className="w-8 h-8 mx-auto mb-3 text-green-700 group-hover:text-white" />
                  <p className="font-semibold text-sm text-gray-800 group-hover:text-white">{item.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Begin Your Educational Journey</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of 679+ students. Admissions open for the new academic session.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/admission">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-10">
                Apply for Admission
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-800 px-10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
