"use client";

import { useState, React } from "react";
import SingleForm from "./SingleForm";
import RootLayout from "@/app/layout";
import CargaDatos from "./CargaDatos";
import Resultados from "./Resultados";
import Login from "./Login";
import Register from "./Register";
import Fetch from "./Fetch"; ///////////////////
import Processing from "./Processing";
import Menu from "./Menu";

export default function Main({ pagepart, setPagepart, user, setUser }) {
  //const [pagepart, setPagepart] = useState("login");
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [propiedad, setPropiedad] = useState({});

  const tasarPropiedad = () => {
    const prop = propiedad;
    setPagepart("procesando");

    setTimeout(()=>{
      //setPropiedad({...prop, precio: 300000});
      setPagepart("resultados");
      console.log(propiedad)
    },Math.random()*1000+500)
  };

  //return   <Fetch />;
  return (
    <>
      {pagepart === "login" ? (
        <Login
          {...{
            btnLogin: () => setPagepart("carga"),
            btnRegister: () => setPagepart("register"),
            user, setUser,
          }}
        />
      ) : pagepart === "register" ? (
        <Register {...{ btnRegister: () => setPagepart("login") }} />
      ) : pagepart === "carga" ? (
        <CargaDatos {...{ btnsubmit: tasarPropiedad , fields: propiedad, setFields: setPropiedad}} />
      ) : pagepart === "menu" ? (
        <Menu {...{ setPagepart }} />
      ) : pagepart === "resultados" ? (
        <Resultados
          {...{
            resultados: {
              ...propiedad, 
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
