"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Logo from "@/components/Logo";
import { SetStateAction, useState } from "react";
import Main from "@/components/Main";
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
  const [stateSuscription, setStateSuscription] = useState(false);
  const [user, setUser] = useState(1);
  const [pagepart, setPagepartRaw] = useState("login");

  function setPagepart (v : SetStateAction<string>) {
    if (user || v === "login" || v === "register") {
      setPagepartRaw(v);
    }
    return pagepart;
  }

  const handleSuscription = () => {
    if (stateSuscription === false) {
      setStateSuscription(true);
    } else {
      setStateSuscription(false);
    }
  };

  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 w-full bg-teal-800 p-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-4" onClick={()=>setPagepart('menu')}>
              <Logo />
            </div>
            {pagepart !== "login" && (
              <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
                <button
                  className=" bg-orange-400 text-white py-1 px-3 hover:bg-orange-300"
                  onClick={handleSuscription}
                >
                  {stateSuscription ? "Premium" : "Básico"}
                </button>
              </div>
            )}
          </div>
        </header>
        <Main {...{ pagepart, setPagepart, user, setUser }} />
        {/* <main className="flex-grow mt-16">{children}</main> */}
        <footer className="fixed bottom-0 left-0 w-full p-2 bg-black content-center">
          <span className="text-sm text-white">
            Proyecto final - Universidad CAECE
          </span>
        </footer>
      </body>
    </html>
  );
}
