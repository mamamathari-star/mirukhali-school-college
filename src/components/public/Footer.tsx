import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institution Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-green-900" />
              </div>
              <div>
                <h3 className="font-bold text-lg">মিরুখালী স্কুল ও কলেজ</h3>
                <p className="text-green-200 text-sm">Mirukhali School & College</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-4">
              Established in 1937, Mirukhali School & College has been serving the educational needs 
              of Mathbaria upazila for over 85 years. MPO enlisted private co-educational institution 
              offering education from primary to higher secondary level.
            </p>
            <div className="flex flex-col gap-2 text-sm text-green-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Mirukhali, Mathbaria, Pirojpur-8540, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>+880-xxx-xxxxxxx</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>info@mirukhalischool.edu.bd</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Sun–Thu: 8:00 AM – 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-yellow-300 mb-4 border-b border-green-700 pb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm text-green-200">
              {[
                { href: "/about", label: "About Us" },
                { href: "/notices", label: "Notices" },
                { href: "/results", label: "Results" },
                { href: "/admission", label: "Admission" },
                { href: "/gallery", label: "Photo Gallery" },
                { href: "/committee", label: "Managing Committee" },
                { href: "/verify", label: "Certificate Verify" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-yellow-300 transition-colors">
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institution Details */}
          <div>
            <h4 className="font-semibold text-yellow-300 mb-4 border-b border-green-700 pb-2">Institution Details</h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li><span className="text-white font-medium">EIIN:</span> 102726</li>
              <li><span className="text-white font-medium">Established:</span> 1 January 1937</li>
              <li><span className="text-white font-medium">Type:</span> Private, MPO</li>
              <li><span className="text-white font-medium">Level:</span> School & College</li>
              <li><span className="text-white font-medium">Students:</span> 679</li>
              <li><span className="text-white font-medium">Teachers:</span> 13</li>
              <li><span className="text-white font-medium">Staff:</span> 4</li>
              <li><span className="text-white font-medium">Upazila:</span> Mathbaria</li>
              <li><span className="text-white font-medium">District:</span> Pirojpur</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-950 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-green-300">
          <p>© {new Date().getFullYear()} Mirukhali School & College. All rights reserved.</p>
          <p className="mt-1 text-xs">EIIN: 102726 | Mathbaria, Pirojpur, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
