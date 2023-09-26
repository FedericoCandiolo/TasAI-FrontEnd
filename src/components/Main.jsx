"use client";

import { useState, React } from "react";
import SingleForm from "./SingleForm";
import RootLayout from "@/app/layout";
import CargaDatos from "./CargaDatos";
import Resultados from "./Resultados";
import Login from "./Login";
import Register from "./Register";
import Processing from "./Processing";

export default function Main({ pagepart, setPagepart }) {
  //const [pagepart, setPagepart] = useState("login");
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [propiedad, setPropiedad] = useState({});

  const tasarPropiedad = (prop) => {
    setPropiedad(prop);
    setPagepart("procesando");

    //tasamos
    // Simple POST request with a JSON body using fetch
    const property = {
      calle: "Av de Mayo",
      numero: 880,
      habitaciones: 20,
      baños: 20,
      toilets: 20,
      dormitorios: 20,
      pisos: 20,
      pileta: true,
      parrilla: true,
      jardin: true,
      latitud: "80",
      longitud: "80",
      id_usuario: 1,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    };

    fetch("http://localhost:8000/tasacion-propiedad-nueva/", requestOptions)
      .then((response) => response.json())
      .then((data) => window.alert(data))
      .catch((data) => window.alert(data));

    setPropiedad(prop);
    setPagepart("resultados");
  };

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
        <CargaDatos {...{ btnsubmit: tasarPropiedad }} />
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
      ) : pagepart === "procesando" ? (
        <Processing />
      ) : (
        <p>Not Found</p>
      )}
    </>
  );
}
