import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import StarryBackground from "./components/layout/StarryBackground";
import ClientAnalytics from "./lib/clientAnalytics";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthProvider, ToastProvider } from "./context";

const inter = Inter({ subsets: ["latin"] });

const websiteUrl = "https://stellardeck.vercel.app";
export const metadata: Metadata = {
  title: "StellarDeck",
  description:
    "A next-gen flashcard platform that transforms learning into a cosmic journey with AI-driven insights and customizable study decks.",
  metadataBase: new URL(websiteUrl),
  openGraph: {
    title: "StellarDeck",
    description:
      "A next-gen flashcard platform that transforms learning into a cosmic journey with AI-driven insights and customizable study decks.",
    url: websiteUrl,
    images: [
      {
        url: "/icons/logo.png",
        width: 1200,
        height: 630,
        alt: "StellarDeck Open Graph Image",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "manifest.json",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: websiteUrl,
    title: "StellarDeck",
    description:
      "A space-themed flashcard SaaS for collaborative learning and customizable study decks.",
    images: [
      {
        url: "/icons/twitter_card.png",
        width: 1200,
        height: 630,
        alt: "StellarDeck Twitter Image",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh'
            }} >
              <Navbar />
              <StarryBackground />
              <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                strategy="afterInteractive" />
              <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ToastProvider>
        <ClientAnalytics />
      </body>
    </html >
  );
}
