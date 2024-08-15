import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'
import { ToastProvider } from "@/context/ToastContext";
import StarryBackground from "./components/layout/StarryBackground";
import ClientAnalytics from "./lib/clientAnalytics";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import "animate.css"
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'StellarDeck',
  description: 'A space-themed flashcard SaaS for collaborative learning and customizable study decks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
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
