import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSideBar from "@/components/RightSideBar";
import MobileNavigation from "@/components/MobileNavigation";
import AuthModal from "@/components/AuthModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voice Drip",
  description: "Voice Drip is a platform for sharing your thoughts and ideas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen bg-base-200">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Left Sidebar */}
              <Sidebar />

              {/* Mobile Navigation */}
              <MobileNavigation />

              <div className="col-span-1 md:col-span-7 pb-20">
                {children}
                <AuthModal />
              </div>
              <RightSideBar />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
