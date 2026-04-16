import type { Metadata } from "next";
import AdmissionForm from "@/components/public/AdmissionForm";
import { CheckCircle, GraduationCap } from "lucide-react";

export const metadata: Metadata = { title: "Admission" };

const requirements = [
  "Previous school Transfer Certificate (TC)",
  "Birth Certificate or National ID",
  "Previous year's Result Sheet / Marksheet",
  "Two passport-size photographs",
  "Parent/Guardian NID copy",
];

export default function AdmissionPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-2">Admission Application</h1>
          <p className="text-green-100">Apply online for admission to Mirukhali School & College</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Info sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Available Classes</h3>
                <div className="space-y-2">
                  {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10 (SSC)", "Class 11 (HSC)", "Class 12 (HSC)"].map(c => (
                    <div key={c} className="flex items-center gap-2 text-sm text-gray-700 py-1 border-b border-gray-100 last:border-0">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Required Documents</h3>
                <ul className="space-y-2">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-sm text-yellow-700">
                  Submission of this form does not guarantee admission. 
                  Shortlisted applicants will be contacted for further process.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Form</h2>
              <AdmissionForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
