"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Logo from "@/components/Logo";
import { SetStateAction, useState } from "react";
import Main from "@/components/Main";
const inter = Inter({ subsets: ["latin"] });


export default function InsideLayout({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  const [stateSuscription, setStateSuscription] = useState(false);
  const [user, setUser] = useState({username: "",status:"not logged",id_plan:-1});
  const [pagepart, setPagepartRaw] = useState("login");

  function setPagepart (v : SetStateAction<string>) {
    if (user || v === "login" || v === "register") {
      setPagepartRaw(v);
    }
    return pagepart;
  }

  const handleSuscription = () => {
    if(user.id_plan === 3) window.location.href = "localhost:8000/admin";
    else setPagepart('premium');
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
            {(user && user.status === 'ok')
            ?
            <div className="mr-4 pointer" onClick={()=>setPagepart('menu')}>
              <div className="inline items-center">
                <Logo />
                <p className="headertext">Ir al menú</p>
              </div>
            </div>
            :
            <div className="mr-4 " >
              <div className="inline items-center">
                <Logo />
              </div>
            </div>
          }
            
            {user.status === "ok" && (
              <div className="inline absolute top-1/2 transform -translate-y-1/2 right-2">
                <p>{user.status === 'ok' ? user.username : ""}</p>
                {user.id_plan === 3 ?
                  <a className=" bg-orange-400 text-white py-1 px-3 hover:bg-orange-300" href="http://localhost:8000/admin/">Administrador</a>
                :
                  <button
                    className="bg-orange-400 text-white py-1 px-3 hover:bg-orange-300"
                    onClick={handleSuscription}
                  >
                    {
                    user.id_plan === 1 ?  "Básico" :
                    user.id_plan === 2 ?  "Premium" :
                    "ERROR"
                  }
                  </button>
                } 
              </div>
            )}
          </div>
        </header>
        <Main {...{ pagepart, setPagepartRaw, user, setUser }} />
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
