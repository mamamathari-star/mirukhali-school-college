"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard, Users, GraduationCap, Bell, Trophy, Award,
  FileText, Users2, Image, Building, Settings, LogOut,
  ChevronDown, ChevronRight, Menu, X, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navGroups = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, roles: ["SUPER_ADMIN", "ADMIN", "TEACHER"] }],
  },
  {
    label: "Academic",
    items: [
      { href: "/admin/students", label: "Students", icon: Users, roles: ["SUPER_ADMIN", "ADMIN", "TEACHER"] },
      { href: "/admin/teachers", label: "Teachers", icon: GraduationCap, roles: ["SUPER_ADMIN", "ADMIN"] },
      { href: "/admin/results", label: "Results", icon: Trophy, roles: ["SUPER_ADMIN", "ADMIN", "TEACHER"] },
    ],
  },
  {
    label: "Admissions",
    items: [
      { href: "/admin/admissions", label: "Applications", icon: FileText, roles: ["SUPER_ADMIN", "ADMIN"] },
      { href: "/admin/certificates", label: "Certificates", icon: Award, roles: ["SUPER_ADMIN", "ADMIN"] },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/notices", label: "Notices", icon: Bell, roles: ["SUPER_ADMIN", "ADMIN", "TEACHER"] },
      { href: "/admin/gallery", label: "Gallery", icon: Image, roles: ["SUPER_ADMIN", "ADMIN"] },
      { href: "/admin/committee", label: "Committee", icon: Users2, roles: ["SUPER_ADMIN", "ADMIN"] },
      { href: "/admin/facilities", label: "Facilities", icon: Building, roles: ["SUPER_ADMIN", "ADMIN"] },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings, roles: ["SUPER_ADMIN", "ADMIN"] },
      { href: "/admin/users", label: "Users", icon: Shield, roles: ["SUPER_ADMIN"] },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || "TEACHER";
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-800 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-green-900 text-white flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-0 overflow-hidden lg:w-64" : "w-64",
        "lg:static lg:flex"
      )}>
        {/* Logo */}
        <div className="p-4 border-b border-green-700">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-green-900" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight group-hover:text-yellow-300 transition-colors">
                Mirukhali School
              </p>
              <p className="text-xs text-green-300">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* User info */}
        {session?.user && (
          <div className="px-4 py-3 border-b border-green-700 bg-green-800">
            <p className="text-sm font-medium truncate">{session.user.name}</p>
            <p className="text-xs text-green-300 mt-0.5">{role}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter(item => item.roles.includes(role));
            if (!visibleItems.length) return null;

            return (
              <div key={group.label} className="mb-4">
                <p className="px-4 py-1 text-xs font-semibold text-green-400 uppercase tracking-wider">
                  {group.label}
                </p>
                {visibleItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5",
                      isActive(item.href)
                        ? "bg-green-700 text-white"
                        : "text-green-200 hover:bg-green-800 hover:text-white"
                    )}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                    {isActive(item.href) && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </Link>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-green-700">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-green-200 hover:bg-red-800 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-xs text-green-400 hover:text-green-200 mt-1">
            ← Back to Website
          </Link>
        </div>
      </aside>
    </>
  );
}
