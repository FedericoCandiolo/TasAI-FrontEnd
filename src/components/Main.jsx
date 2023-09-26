"use client";

import { useState, React } from "react";
import SingleForm from "./SingleForm";
import RootLayout from "@/app/layout";
import CargaDatos from "./CargaDatos";
import Resultados from "./Resultados";
import Login from "./Login";
import Register from "./Register";

export default function TestLogin({ pagepart, setPagepart }) {
  //const [pagepart, setPagepart] = useState("login");
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {pagepart === "login" ? (
        <Login
          {...{
            btnLogin: () => setPagepart("carga"),
            btnRegister: () => setPagepart("register"),
          }}
        />
      ) : pagepart === "register" ? (
        <Register {...{ btnRegister: () => setPagepart("login") }} />
      ) : pagepart === "carga" ? (
        <CargaDatos {...{ btnsubmit: () => setPagepart("resultados") }} />
      ) : pagepart === "resultados" ? (
        <Resultados
          {...{
            resultados: {
              direccion: "Av. de Mayo 866",
              ambientes: 3,
              banios: 1,
              toilletes: 0,
              cochera: false,
              parrilla: true,
              plantas: 1,
              m2cubiertos: 120,
              m2descubiertos: 80,
              btnNuevaTasacion: () => setPagepart("carga"),
            },
          }}
        />
      ) : (
        <p>Not Found</p>
      )}
    </>
  );
}
