
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import InsideLayout from "./insideLayout"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TasAI",
  description: "Universidad CAECE",
};

export default function RootLayout({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  return <InsideLayout {...{children,isLoggedIn}} />
}
