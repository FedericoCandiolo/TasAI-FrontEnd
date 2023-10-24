"use client";

import { useState, useEffect, React } from "react";
// import RootLayout from "@/app/layout";
import Map from './Map';
import LeafletMap from './LeafletMap'

function Resultados({resultados, user}) {
  ////INICIO FETCH
  const [data, setData] = useState([]);
  const [propiedad, setPropiedad] = useState({...resultados,direccion: `${resultados.calle} ${resultados.numero}`});

    useEffect(() => {
      if(!propiedad.latitud){
        //window.alert('Obteniendo Coordenadas')
        const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
        const nominatim_request_options = {
          method: "GET",
          redirect: "follow",
        };

        const nominatim_params = {
          q: `${propiedad.calle} ${propiedad.numero}` + "+" + "Ciudad Autonoma Buenos Aires",
          format: "json",
          addressdetails: 1,
          polygon_geojson: 0,
        };
    
        const queryString = new URLSearchParams(nominatim_params).toString();
    
        //console.log(searchText);
        //console.log(`${NOMINATIM_BASE_URL}${queryString}`);
        fetch(`${NOMINATIM_BASE_URL}${queryString}`, nominatim_request_options)
          .then((response) => response.json())
          .then((result) => {
            
            const propTasada = [
              {
                geocode: [result[0]?.lat, result[0]?.lon],
              },
            ];
            console.log(propTasada[0]?.geocode);
            setPropiedad({...propiedad,latitud:propTasada[0]?.geocode[0],longitud:propTasada[0]?.geocode[1]});
          })
          .catch((err) => {
            console.log("err: ", err);
          });
      } else if(!propiedad.id_propiedad){
        
        //window.alert('Tasando propiedad')
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
          latitud: propiedad.latitud, //CON LO DE RODRI
          longitud: propiedad.longitud, //CON LO DE RODRI
          // latitud: "-34.6090085", //CON LO DE RODRI
          // longitud: "-58.3787534", //CON LO DE RODRI
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
            //window.alert(data);
            console.log("PRECIO");
            console.log(data);
            setPropiedad({...propiedad, precio: data.precio, id_propiedad: data.id_propiedad})
            console.log(propiedad)
            })
          .then(data=>console.log(data))
          .catch((error) => {
              console.error('Error al obtener los datos:', error);
          });

      } else if(!propiedad.similares){            
          //window.alert('Buscando similares')
          //const apiUrlSimilares = "http://localhost:8000/propiedades-similares/1/"; //Poner dinamico 
          
          const apiUrlSimilares = `http://localhost:8000/propiedades-similares/${propiedad.id_propiedad}/`; //Poner dinamico 

          const requestOptionsSimilares = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          fetch(apiUrlSimilares, requestOptionsSimilares)
          .then((response) => response.json())
          .then((data) => {
          setPropiedad({...propiedad, similares: data})
          return [propiedad];
          })
          .catch((error) => {
              console.error('Error al obtener los datos:', error);
          });        
      }       
    }, [propiedad]); // Ejecuta esto solo una vez al montar el componente
  ////FIN FETCH
  

  console.log('resultados')
  console.log(resultados)

  const handleSave = () => {
    window.alert("Propiedad guardada");
  }

  const handleVolver = () => {
    //window.alert("Vuelvo atras");
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
              {propiedad.precio &&
                <h2>{
                  Intl.NumberFormat('es-AR', {style: 'currency', currency: 'USD'})
                  .format(data.precio)              
                }</h2>
              }
              <div className="grid2col">
                <p>{propiedad.m2} metros cuadrados</p>
                <p>{propiedad.ambientes} { propiedad.ambientes === 1 ? 'ambiente' : 'ambientes'}</p>
                <p>{propiedad.dormitorios} { propiedad.dormitorios === 1 ? 'dormitorio' : 'dormitorios'}</p>
                <p>{propiedad.cocheras} { propiedad.cocheras === 1 ? 'cochera' : 'cocheras'}</p>
                <p>{propiedad.banios} { propiedad.banios === 1 ? 'baño' : 'baños'}</p>
                <p>{ propiedad.toilette ? '✔️' : '❌'} Toilette</p>
                <p>{ propiedad.lavadero ? '✔️' : '❌'} Lavadero</p>
                <p>{ propiedad.ac ? '✔️' : '❌'} A/C</p>
                <p>{ propiedad.balcon ? '✔️' : '❌'} Balcón</p>
                <p>{ propiedad.parrilla ? '✔️' : '❌'} Parrilla</p>
                <p>{ propiedad.jardin ? '✔️' : '❌'} Jardin</p>
                <p>{ propiedad.pileta ? '✔️' : '❌'} Pileta</p>
              </div>
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
        {/* <Map {...{direccion:'Avenida de Mayo 866, Buenos Aires'}}/> */}
        {
          propiedad.id_propiedad &&
        <LeafletMap propiedad={{direccion: propiedad.direccion , similares: propiedad.similares} }/>
        }
      </div>
    </div>
  );
}

export default Resultados;
