import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nguyễn Hoàng Mai",
  description: "Contact information",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-zinc-600">
          <div className="max-w-md mx-auto pb-8">
            <nav className="flex justify-center gap-4 py-4"></nav>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
