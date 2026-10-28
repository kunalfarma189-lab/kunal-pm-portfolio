import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
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
  "Kunal Farma is a Product Manager in New Delhi with 4+ years in e-commerce: finding the real customer problem, deciding what to build, shipping it with the team and proving it with numbers (SQL, GA4, A/B tests, AI prototypes).";

export const metadata: Metadata = {
  metadataBase: new URL("https://kunal-pm-portfolio.vercel.app"),
  title: "Kunal Farma — Product Manager",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Kunal Farma",
    url: "/",
    title: "Kunal Farma — Product Manager",
    description:
      "4+ years in product and e-commerce: finding the problem, prototyping the fix with AI, shipping it, and measuring it.",
    images: [{ url: "/kunal-farma.jpg", width: 900, height: 1200, alt: "Portrait of Kunal Farma" }],
  },
  twitter: { card: "summary" },
};

// Browser chrome matches the page background; the site is dark-only.
export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark",
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
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
