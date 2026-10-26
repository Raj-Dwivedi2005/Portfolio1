import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AirplaneCanvas } from "@/components/3d/AirplaneCanvas";
import { CursorBubbleEmitter } from "@/components/effects/CursorBubbleEmitter";
import { portfolioData } from "@/data/portfolio";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
    { media: "(prefers-color-scheme: light)", color: "#f0f7ff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rajdwivedi.dev"),
  title: `${portfolioData.personal.name} | AI/ML Engineer & Full-Stack Developer`,
  description: `${portfolioData.personal.about.slice(0, 160)}...`,
  keywords: [
    "Raj Dwivedi",
    "Portfolio",
    "AI/ML Engineer",
    "Machine Learning",
    "FastAPI",
    "Next.js",
    "SRM Institute of Science and Technology",
    "Full-Stack Developer",
    "HydroGuard.ai",
    "EcoPackAI",
    "Python",
    "TypeScript",
  ],
  authors: [{ name: portfolioData.personal.name, url: portfolioData.personal.social.github }],
  creator: portfolioData.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rajdwivedi.dev",
    title: `${portfolioData.personal.name} | AI/ML Engineer & Full-Stack Developer`,
    description: portfolioData.personal.tagline,
    siteName: `${portfolioData.personal.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${portfolioData.personal.name} - Aviation Themed Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.personal.name} | AI/ML Engineer`,
    description: portfolioData.personal.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.personal.name,
    jobTitle: "AI/ML Engineer & Full-Stack Developer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: portfolioData.education.institution,
    },
    url: "https://rajdwivedi.dev",
    sameAs: [
      portfolioData.personal.social.github,
      portfolioData.personal.social.linkedin,
      portfolioData.personal.social.leetcode,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "FastAPI",
      "Next.js",
      "Python",
      "Data Structures & Algorithms",
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
        <ThemeProvider>
          <SmoothScroll>
            {/* Signature Feature 1: Scroll-Driven 3D Airplane Canvas */}
            <AirplaneCanvas />

            {/* Signature Feature 2: Interactive Cursor Bubble Emitter */}
            <CursorBubbleEmitter />

            {/* Main Application Content */}
            <div className="relative z-10 flex min-h-screen flex-col">
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
