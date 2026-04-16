"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/notices", label: "Notices" },
  { href: "/results", label: "Results" },
  { href: "/admission", label: "Admission" },
  { href: "/gallery", label: "Gallery" },
  { href: "/committee", label: "Committee" },
  { href: "/verify", label: "Verify Certificate" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-green-900 text-xs py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>EIIN: 102726 | Mirukhali, Mathbaria, Pirojpur</span>
          <Link href="/admin" className="hover:text-yellow-300 transition-colors">
            Admin Login
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow">
              <GraduationCap className="w-7 h-7 text-green-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight group-hover:text-yellow-300 transition-colors">
                মিরুখালী স্কুল ও কলেজ
              </h1>
              <p className="text-sm font-medium text-yellow-200">Mirukhali School & College</p>
              <p className="text-xs text-green-200">Mathbaria, Pirojpur | Est. 1937</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm rounded hover:bg-green-700 hover:text-yellow-300 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded hover:bg-green-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-green-900 border-t border-green-700">
          <nav className="container mx-auto px-4 py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm hover:bg-green-800 hover:text-yellow-300 rounded transition-colors border-b border-green-800"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
