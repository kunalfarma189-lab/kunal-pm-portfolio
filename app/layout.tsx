import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial accent face for single words in headlines only.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Kunal Farma — Product Specialist in New Delhi with 4+ years in product and e-commerce. PRDs and Jira delivery, SQL and GA4 analytics, A/B tests, and working prototypes built with AI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kunal-pm-portfolio.onrender.com"),
  title: "Kunal Farma — Product Specialist",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Kunal Farma",
    url: "/",
    title: "Kunal Farma — Product Specialist",
    description:
      "4+ years in product and e-commerce: finding the problem, prototyping the fix with AI, shipping it, and measuring it.",
    images: [{ url: "/kunal-farma.jpg", width: 720, height: 960, alt: "Portrait of Kunal Farma" }],
  },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
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
        <Footer />
      </body>
    </html>
  );
}
