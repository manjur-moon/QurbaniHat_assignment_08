import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastProvider from "@/providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "QurbaniHat - Livestock Booking Platform",
  description: "A modern Qurbani livestock marketplace for booking cows and goats."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider />
        <Navbar />
        <main className="min-h-[calc(100vh-360px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
