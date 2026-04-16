import type { Metadata } from "next";
import { CheckCircle, MapPin, Calendar, Users, Building2, Microscope, Monitor, Library, Trophy, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "About Us" };

const timeline = [
  { year: "1937", title: "Foundation", desc: "Mirukhali M.E. School was established on 1 January 1937, serving the local community with primary education." },
  { year: "1962", title: "Junior Secondary", desc: "The institution was upgraded to Junior Secondary School, expanding its curriculum to meet growing educational demands." },
  { year: "1967", title: "High School Recognition", desc: "Officially recognized as Mirukhali High School, offering secondary education up to Class 10." },
  { year: "Present", title: "School & College", desc: "Now operating as Mirukhali School & College, offering education from primary through Higher Secondary (HSC) level." },
];

const facilities = [
  { name: "Science Laboratory", icon: Microscope, desc: "Fully equipped modern science laboratory for practical experiments in Physics, Chemistry and Biology." },
  { name: "Computer Lab", icon: Monitor, desc: "Computer laboratory with 15 PCs providing digital literacy and computer education programs." },
  { name: "Library", icon: Library, desc: "Well-stocked library with hundreds of books, reference materials and periodicals." },
  { name: "Sports Ground", icon: Trophy, desc: "Large open field supporting cricket, football, athletics, and various outdoor sports." },
  { name: "Student Hostel", icon: Building2, desc: "Residential hostel facilities for students coming from distant areas." },
  { name: "Mosque", icon: BookOpen, desc: "On-campus mosque for daily prayers and Islamic education." },
  { name: "Multimedia Classrooms", icon: Monitor, desc: "Modern multimedia-equipped classrooms for interactive and engaging lessons." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Our Institution</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Over 85 years of educational excellence in Mathbaria, Pirojpur, Bangladesh
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Institution Overview</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Mirukhali School & College is a prestigious educational institution located in the 
                  serene village of Mirukhali, Mathbaria Upazila, Pirojpur District, Bangladesh. 
                  Established on 1 January 1937, it has grown from a small M.E. School to a full-fledged 
                  School & College offering Higher Secondary education.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The institution is MPO enlisted and recognized by the Bangladesh government, 
                  operating as a co-educational institution serving the educational needs of 
                  Mathbaria and surrounding areas.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With 679 enrolled students, 13 dedicated teachers, and 4 support staff, 
                  the institution provides a nurturing environment that combines academic 
                  excellence with character development.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="font-semibold text-green-800 mb-4 text-lg">Institution Details</h3>
                  <div className="space-y-3">
                    {[
                      { label: "EIIN", value: "102726" },
                      { label: "Established", value: "1 January 1937" },
                      { label: "Type", value: "Private, MPO Enlisted" },
                      { label: "Education System", value: "Co-Education" },
                      { label: "Level", value: "School & College" },
                      { label: "Students", value: "679" },
                      { label: "Teachers", value: "13" },
                      { label: "Staff", value: "4" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-1 border-b border-green-100 last:border-0">
                        <span className="text-sm text-gray-600 font-medium">{label}</span>
                        <span className="text-sm font-semibold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <MapPin className="w-10 h-10 text-green-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Location</h2>
            <p className="text-gray-600">
              Mirukhali, Mathbaria Upazila, Pirojpur District — 8540<br />
              Barisal Division, Bangladesh
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 flex-wrap text-sm text-gray-500">
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-600" /> Peaceful Rural Environment</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-600" /> Easy Accessibility</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-600" /> Safe Campus</span>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our History</h2>
            <p className="text-gray-600">From a small school to a full college — 85+ years of progress</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200" />
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 mb-10 last:mb-0">
                  <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xs text-center leading-tight flex-shrink-0 z-10 shadow-lg">
                    {item.year}
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 flex-1 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 text-green-800">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Facilities</h2>
            <p className="text-gray-600">Comprehensive facilities for holistic student development</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => (
              <Card key={f.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-700 p-3 rounded-lg text-white flex-shrink-0">
                      <f.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{f.name}</h3>
                      <p className="text-sm text-gray-600">{f.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Co-Curricular Activities</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Sports", desc: "Cricket, Football, Athletics" },
              { name: "Scouting", desc: "Boy Scouts & Girl Guides" },
              { name: "Debating", desc: "Inter-school competitions" },
              { name: "Cultural", desc: "Music, Drama & Arts" },
            ].map((act) => (
              <div key={act.name} className="text-center border border-gray-200 rounded-xl p-5 hover:border-green-400 hover:bg-green-50 transition-all">
                <Trophy className="w-8 h-8 text-green-700 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{act.name}</h3>
                <p className="text-xs text-gray-500">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
