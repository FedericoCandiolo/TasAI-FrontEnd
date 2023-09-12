"use client";

import { useState, React } from "react";
import SingleForm from "./SingleForm";
// import RootLayout from "@/app/layout";
import FieldTasacion from './FieldTasacion';
import Map from './Map';

function Resultados({resultados}) {
  const [pagepart, setPagePart] = useState("nuevaTasacion");
  const [mensaje, setMensaje] = useState("");

  const handleClick = () => {
    setMensaje("Propiedad Tasada");
  };

  return (
    <div class="flex items-centrer justify-center h-screen bg-gradient-to-b from-teal-50 to-teal-800">
      <div class="space-y-12 space-from-header" >
        <div class="border-b border-gray-900/10 pb-12 ">
          <article class="box">
            <h1>Propiedad</h1>         
            <section class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1 ml-2 mr-2">
              <h3>{resultados.direccion}</h3>
              <p>{resultados.m2cubiertos} m<sup>2</sup> cubiertos</p>
              <p>{resultados.m2descubiertos} m<sup>2</sup> descubiertos</p>
              <p>{resultados.ambientes} ambientes</p>
              <p>{resultados.plantas} plantas</p>
              <p>{resultados.banios} baños</p>
              {resultados.toilletes ? <p>{resultados.toilletes} toilletes</p> : <></>}
              { resultados.parrilla && <p>✔️ Parrilla </p> }
              { resultados.cochera && <p>✔️ Cochera </p> }
            </section>
          </article>
            
        </div>
      </div>

      
      <div style={...{width:'1000px', height: '1000px'}}/* class="mt-6 flex items-center justify-end gap-x-6 mr-2 mb-2" */>
        <Map {...{direccion:'Avenida de Mayo 866, Buenos Aires'}}/>
      </div>
    </div>
  );
}

export default Resultados;
