import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">আমাদের সাথে যোগাযোগ করুন</h2>
          <p className="text-blue-200">যেকোনো প্রয়োজনে আমরা সদা প্রস্তুত</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="text-center p-6 bg-white/10 rounded-xl">
            <Phone className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">ফোন</h3>
            <a href="tel:01716213807" className="text-blue-200 hover:text-white block">01716213807</a>
            <a href="tel:01309102726" className="text-blue-200 hover:text-white block">01309102726</a>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-xl">
            <Mail className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">ইমেইল</h3>
            <a href="mailto:info@mirukhali.edu.bd" className="text-blue-200 hover:text-white">
              info@mirukhali.edu.bd
            </a>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-xl">
            <MapPin className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">ঠিকানা</h3>
            <p className="text-blue-200 text-sm">মিরুখালি, মঠবাড়িয়া,<br/>পিরোজপুর, বরিশাল</p>
          </div>
        </div>
        <div className="text-center">
          <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white border-0">
            <Link href="/contact">
              যোগাযোগ ফর্ম <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
