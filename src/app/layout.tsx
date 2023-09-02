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
        <header className="bg-teal-800 h-10 p-2">
            <Logo />
        </header>
        <main>{children}</main>
        <footer className="bg-black p-2 text-white text-xs">Proyecto final - Universidad CAECE</footer>
      </body>
    </html>
  );
}