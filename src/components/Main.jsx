"use client";

import { useState, React } from "react";
import RootLayout from "@/app/layout";
import CargaDatos from "./CargaDatos";
import Resultados from "./Resultados";
import Login from "./Login";
import Register from "./Register";
import Processing from "./Processing";
import Menu from "./Menu";
import CreditCardForm from "./CreditCardForm";

export default function Main({ pagepart, setPagepartRaw, user, setUser }) {
  const [propiedad, setPropiedad] = useState({});
  const [leermas, setLeerMas] = useState(false);

  const setPagepart = v => {
    if(v==='carga') setPropiedad({});
    setPagepartRaw(v);
  }

  const procesar = (f) => {
    const prop = propiedad;
    setPagepart("procesando");

    setTimeout(()=>{
      //setPropiedad({...prop, precio: 300000});
      f();
      //console.log(propiedad)
    },Math.random()*1000+500)
  };

  //return   <Fetch />;
  return (
    <>
      {pagepart === "login" ? (
        <Login
          {...{
            btnLogin: () => setPagepart("menu"),
            btnRegister: () => setPagepart("register"),
            user, setUser,
            leermas, toggleLeerMas: ()=>setLeerMas(!leermas),
          }}
        />
      ) : pagepart === "register" ? (
        <Register {...{ 
          btnRegister: () => setPagepart("menu"),
          btnLogin: () => setPagepart("login"),
          user, setUser,
          leermas, toggleLeerMas: ()=>setLeerMas(!leermas),
        }} />
      ) : pagepart === "premium" ? (
        <CreditCardForm {...{ 
          btnVolver: () => setPagepart("menu"),
          btnCargar: () => procesar(()=>setPagepart("menu")),
          user
        }} />
      ) : pagepart === "carga" ? (
        <CargaDatos {...{ 
          btnsubmit: () => setPagepart("resultados"),
          btnCancelar: () => setPagepart("menu"), 
          fields: propiedad, 
          setFields: setPropiedad,
          user
        }} />
      ) : pagepart === "menu" ? (
        <Menu {...{ setPagepart ,user,setUser}} />
      ) : pagepart === "resultados" ? (
        <Resultados
          {...{
            resultados: {
              ...propiedad, 
              btnNuevaTasacion: () => {
                setPropiedad({});
                setPagepart("carga");
              },
            },
            user
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
