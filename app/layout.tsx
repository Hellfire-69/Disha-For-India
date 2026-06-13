import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatWidget } from "@/components/features/AIChatWidget";

const clashDisplay = localFont({
  src: [
    { path: '../public/fonts/ClashDisplay-Medium.woff2', weight: '500' },
    { path: '../public/fonts/ClashDisplay-Semibold.woff2', weight: '600' },
    { path: '../public/fonts/ClashDisplay-Bold.woff2', weight: '700' },
  ],
  variable: '--font-display-var',
  display: 'swap',
});

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Satoshi-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Satoshi-Bold.woff2', weight: '700' },
  ],
  variable: '--font-body-var',
  display: 'swap',
});

const cabinetGrotesk = localFont({
  src: [
    { path: '../public/fonts/CabinetGrotesk-Medium.woff2', weight: '500' },
    { path: '../public/fonts/CabinetGrotesk-Bold.woff2', weight: '700' },
    { path: '../public/fonts/CabinetGrotesk-Extrabold.woff2', weight: '800' },
  ],
  variable: '--font-accent-var',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Disha for India",
  description: "Empowering the next generation of leaders across India",
  openGraph: {
    title: "Disha for India",
    description: "Empowering the next generation of leaders across India",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${clashDisplay.variable} ${satoshi.variable} ${cabinetGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col pt-20" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <AIChatWidget />
      </body>
    </html>
  );
}
