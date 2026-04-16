import Link from 'next/link'
import { Shield, Phone, MapPin, Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#1e3a8a] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-500 rounded-full p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">মিরুখালি স্কুল ও কলেজ</div>
                <div className="text-blue-300 text-sm">Mirukhali School & College</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              ১৯৩৭ সাল থেকে মানসম্পন্ন শিক্ষা প্রদানে নিবেদিত। EIIN: 102726
            </p>
            <div className="space-y-2 text-sm text-blue-200">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
                <span>মিরুখালি, মঠবাড়িয়া, পিরোজপুর, বরিশাল, বাংলাদেশ</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                <a href="tel:01716213807" className="hover:text-white">01716213807</a>
                <span>|</span>
                <a href="tel:01309102726" className="hover:text-white">01309102726</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                <a href="mailto:info@mirukhali.edu.bd" className="hover:text-white">info@mirukhali.edu.bd</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-amber-400 mb-4 uppercase text-xs tracking-wider">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              {[
                { href: '/about', label: 'পরিচিতি' },
                { href: '/history', label: 'ইতিহাস' },
                { href: '/academic', label: 'একাডেমিক' },
                { href: '/teachers', label: 'শিক্ষকমণ্ডলী' },
                { href: '/notices', label: 'নোটিশ বোর্ড' },
                { href: '/results', label: 'ফলাফল' },
                { href: '/admission', label: 'ভর্তি' },
                { href: '/committee', label: 'পরিচালনা পর্ষদ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:pl-1 transition-all">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-amber-400 mb-4 uppercase text-xs tracking-wider">সেবাসমূহ</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              {[
                { href: '/verify', label: 'সনদ যাচাই' },
                { href: '/facilities', label: 'সুযোগ-সুবিধা' },
                { href: '/gallery', label: 'ফটো গ্যালারি' },
                { href: '/contact', label: 'যোগাযোগ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:pl-1 transition-all">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h3 className="font-semibold text-amber-400 mb-3 uppercase text-xs tracking-wider">বিদ্যালয় তথ্য</h3>
              <div className="text-sm text-blue-200 space-y-1">
                <p>প্রতিষ্ঠা: ১ জানুয়ারি ১৯৩৭</p>
                <p>শিক্ষার্থী: ৬৭৯ জন</p>
                <p>শিক্ষক: ১৩ জন</p>
                <p>স্তর: উচ্চ মাধ্যমিক</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="bg-blue-700" />
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-blue-300">
        <p>© {year} মিরুখালি স্কুল ও কলেজ। সর্বস্বত্ব সংরক্ষিত।</p>
        <p>EIIN: 102726 | মঠবাড়িয়া, পিরোজপুর, বাংলাদেশ</p>
      </div>
    </footer>
  )
}
