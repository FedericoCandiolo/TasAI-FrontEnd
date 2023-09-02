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
          <div className="container-xl mx-auto flex justify-between items-center">
            <div className="scale-x-75 scale-y-75">
              <Logo />
            </div>
            <button type="button">Iniciar Sesión</button>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-black p-4 text-white">This is a footer</footer>
      </body>
    </html>
  );
}