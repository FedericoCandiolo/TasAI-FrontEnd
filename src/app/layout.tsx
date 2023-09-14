"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Logo from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TasAI",
  description: "Universidad CAECE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 w-full bg-teal-800 p-2">
            <Logo />
        </header>
        <main>{children}</main>
        <footer className="fixed bottom-0 left-0 w-full p-2 bg-black content-center">
          <span className="text-sm text-white">Proyecto final - Universidad CAECE</span>
        </footer>
      </body>
    </html>
  );
}