import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import StructuredData from "@/components/StructuredData";
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
  "Kunal Farma is a Growth Marketer in New Delhi with 4+ years in e-commerce: Meta Ads, Google Ads, conversion rate optimisation and GA4 analytics — bringing the right traffic and fixing the funnel so more visitors buy.";

// The title carries the terms a recruiter types: name, role, channels,
// city. Child pages set their own title; the template adds the name.
export const metadata: Metadata = {
  metadataBase: new URL("https://kunal-farma.vercel.app"),
  title: {
    default: "Kunal Farma — Growth Marketer | Meta Ads, Google Ads & E-commerce CRO, New Delhi",
    template: "%s | Kunal Farma",
  },
  description,
  keywords: [
    "Kunal Farma",
    "Growth Marketer",
    "Performance Marketer",
    "Growth Marketing New Delhi",
    "Performance Marketing Delhi",
    "Meta Ads specialist",
    "Facebook Ads",
    "Instagram Ads",
    "Google Ads specialist",
    "Google Shopping Ads",
    "E-commerce CRO",
    "Conversion rate optimisation",
    "GA4",
    "Google Tag Manager",
    "A/B testing",
    "ROAS",
    "E-commerce growth marketer India",
    "Growth marketer portfolio",
  ],
  authors: [{ name: "Kunal Farma", url: "https://www.linkedin.com/in/kunal-farma/" }],
  creator: "Kunal Farma",
  category: "marketing",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    firstName: "Kunal",
    lastName: "Farma",
    siteName: "Kunal Farma",
    locale: "en_IN",
    url: "/",
    title: "Kunal Farma — Growth Marketer | Meta Ads, Google Ads & E-commerce CRO",
    description:
      "4+ years in e-commerce growth: Meta and Google Ads, GA4 and GTM tracking, A/B tests and CRO, measured in ROAS and revenue. New Delhi, India.",
    images: [{ url: "/kunal-farma.jpg", width: 900, height: 1200, alt: "Portrait of Kunal Farma, Growth Marketer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunal Farma — Growth Marketer",
    description: "Meta Ads, Google Ads, GA4 and CRO for e-commerce. 4+ years, New Delhi.",
    images: ["/kunal-farma.jpg"],
  },
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
        <StructuredData />
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
