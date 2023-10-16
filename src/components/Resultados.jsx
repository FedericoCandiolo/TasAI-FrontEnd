"use client";

import { useState, useEffect, React } from "react";
// import RootLayout from "@/app/layout";
import Map from './Map';

function Resultados({resultados, user}) {
  ////INICIO FETCH
  const [data, setData] = useState([]);
  const [propiedad, setPropiedad] = useState(resultados);

    useEffect(() => {
    // URL de la API que deseas consultar
    const apiUrl = "http://localhost:8000/tasacion-propiedad-nueva/";
    
    const property = {
      calle: propiedad.calle,
      numero: propiedad.numero,
      ambientes: propiedad.ambientes,
      baños: propiedad.banios,
      dormitorios: propiedad.dormitorios,
      pileta: propiedad.pileta,
      parrilla: propiedad.parrilla,
      jardin: propiedad.jardin,
      latitud: "0", //CON LO DE RODRI
      longitud: "0", //CON LO DE RODRI
      esta_guardado: true,
      metros: propiedad.m2,
      cochera: propiedad.cocheras,
      ciudad: propiedad.ciudad,
      precioxLocalidad: 1500, //CAMBIAR POR CIUDAD
      toilette: propiedad.toilette,
      lavadero: propiedad.lavadero,
      AC: propiedad.ac,
      balcon: propiedad.balcon,
      googleMaps: "1",
      id_usuario: user.id_usuario
    }

    /* const property = { //Modificar proceso carga para que corresponda 1 a 1
        calle: propiedad.direccion,
        numero: propiedad.direccion.match(/(\d+)/)[0],
        habitaciones: propiedad.ambientes,
        baños: propiedad.banios,
        toilets: propiedad.toilletes,
        dormitorios: propiedad.ambientes,
        pisos: propiedad.plantas,
        pileta: true,
        parrilla: propiedad.parrilla || false,
        jardin: true,
        //latitud: "20", //desconocida
        //longitud: "20",
        id_usuario: 1,
      }; */
      console.log(
        JSON.stringify(property)
      )
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      };

    // Realizar una solicitud GET a la API utilizando fetch()
    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
        setData(data); // Actualizar el estado con los datos recibidos de la API
        window.alert(data);
        console.log(data);
        setPropiedad({...propiedad, precio: data.precio})
        })
        .catch((error) => {
            console.error('Error al obtener los datos:', error);
        });
    }, []); // Ejecuta esto solo una vez al montar el componente
  ////FIN FETCH


  console.log('resultados')
  console.log(resultados)

  const handleSave = () => {
    window.alert("Propiedad guardada");
  }

  const handleVolver = () => {
    window.alert("Vuelvo atras");
    btnsubmit();
  }


  return (
    <div class="flex items-centrer justify-center h-screen bg-gradient-to-b from-teal-50 to-teal-800">
      <div class="space-y-12 space-from-header" >
        <div class="border-b border-gray-900/10 pb-12 ">
          <article class="box">
            <h1>Propiedad</h1>         
            <section class="nospace mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1 ml-2 mr-2">
              <h3>{`${propiedad.calle} ${propiedad.numero}, ${propiedad.ciudad}`}</h3>
              <p>{propiedad.m2} Metros cuadrados</p>
              <p>{propiedad.ambientes} { propiedad.ambientes === 1 ? 'ambiente' : 'ambientes'}</p>
              <p>{propiedad.dormitorios} { propiedad.dormitorios === 1 ? 'dormitorio' : 'dormitorios'}</p>
              <p>{propiedad.cocheras} { propiedad.cocheras === 1 ? 'cochera' : 'cocheras'}</p>
              <p>{propiedad.banios} { propiedad.banios === 1 ? 'baño' : 'baños'}</p>
              <p>{ propiedad.toilette ? '✔️' : '❌'} Toilette</p>
              <p>{ propiedad.lavadero ? '✔️' : '❌'} Lavadero</p>
              <p>{ propiedad.parrilla ? '✔️' : '❌'} Parrilla</p>
              <p>{ propiedad.parrilla ? '✔️' : '❌'} Parrilla</p>
              <p>{ propiedad.parrilla ? '✔️' : '❌'} Parrilla</p>
              <p>{ propiedad.cochera ? '✔️' : '❌'} Cochera</p>
              <h2>{
                Intl.NumberFormat('es-AR', {style: 'currency', currency: 'USD'})
                .format(propiedad.precio)              
              }</h2>
            </section>

          {/* Botones */}
          <div class="mt-6 flex items-center justify-end gap-x-6 mr-2 mb-2">
          <button
            type="submit"
            class="rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={propiedad.btnNuevaTasacion}
          >
            Nueva Tasación
          </button>
          <button
            type="button"
            class="rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSave}
          >
            Guardar Propiedad
          </button>
        </div>  
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
