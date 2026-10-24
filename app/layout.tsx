import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kunal Farma — Product Specialist | Product Management, Analytics & AI",
  description:
    "Portfolio of Kunal Farma — 4+ years in product management and analytics. PRDs, SQL & GA4, Jira/Agile delivery, and AI-assisted workflows. Hypothetical case studies clearly labelled.",
  openGraph: {
    title: "Kunal Farma — Product Specialist",
    description:
      "Product management, analytics & AI-assisted delivery. Case studies (hypothetical, clearly labelled), experience, and AI projects.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-zinc-200">
        {/* Progressive-enhancement marker: without JS, reveal animations
            never hide content (see globals.css motion gates). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <ScrollTopButton />
        <Footer />
      </body>
    </html>
  );
}
