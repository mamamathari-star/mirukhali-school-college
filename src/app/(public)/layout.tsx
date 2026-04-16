import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export const metadata: Metadata = {
  title: { default: "Mirukhali School & College", template: "%s | Mirukhali School & College" },
  description: "Mirukhali School & College - A premier educational institution in Mathbaria, Pirojpur, Bangladesh. Established 1937. EIIN: 102726.",
  keywords: ["Mirukhali School", "Mathbaria", "Pirojpur", "Bangladesh", "Education", "EIIN 102726"],
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
