import type { Metadata } from "next";
import { Bebas_Neue, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Jayakumar",
  description: "Portfolio of Jayakumar M, AI Product Developer & Creative Full-Stack Engineer.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${interTight.variable}`}>
      <body className="min-h-screen bg-bg text-text font-body antialiased selection:bg-accent selection:text-white">
        <LenisProvider>
          <main className="w-full flex flex-col">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
