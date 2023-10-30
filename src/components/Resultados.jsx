"use client";

import { useState, useEffect, React } from "react";
// import RootLayout from "@/app/layout";
import Map from './Map';
import LeafletMap from './LeafletMap'
import CheckBoxList from './CheckBoxList'

function Resultados({resultados, user}) {
  ////INICIO FETCH
  const [data, setData] = useState([]);
  const [propiedad, setPropiedad] = useState({...resultados,direccion: `${resultados.calle} ${resultados.numero}`});
  const [similaresSeleccionadas, setSimilaresSeleccionadas] = useState([]);
  const [filtros, setFiltros] = useState([]);
  const [filtrosEstructura, setFiltrosEstructura] = useState([]);
  const [filtroAbierto, setFiltroAbierto] = useState('')

  const toSentenceCase = v => v[0].toUpperCase().concat(v.substring(1));

  let mis_filtros_final = {};

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
      }  else if(filtros.length === 0) { // CREO FILTROS
        const mis_filtros = {};
        for (const k in propiedad.similares[0]) mis_filtros[k] = [];
        propiedad.similares.map(prop=>{
          for (const k_p in prop){
            mis_filtros[k_p] = [...mis_filtros[k_p], prop[k_p]]
          }
        });
        console.log(mis_filtros);

        const mis_filtros_limpios = {};

        for(const k_f in mis_filtros){
          const item = Array.from(new Set(mis_filtros[k_f]))
          .sort((a,b)=> typeof(a) === 'boolean' ? a :
          typeof(a) === 'number' ? parseFloat(a) - parseFloat(b) :
          a >= b
          )
          mis_filtros_limpios[k_f] = item;
        };

        const estructura_booleanos = [false,true];        

        mis_filtros_final = {
          ambientes: mis_filtros_limpios.ambientes,
          dormitorios: mis_filtros_limpios.dormitorios,
          baños: mis_filtros_limpios.baños,
          cochera: mis_filtros_limpios.cochera,
          metros: mis_filtros_limpios.metros,
          AC: [...estructura_booleanos],
          balcon: [...estructura_booleanos],
          jardin: [...estructura_booleanos],
          parrilla: [...estructura_booleanos],
          pileta: [...estructura_booleanos],
          toilette: [...estructura_booleanos],
        };

        console.log(mis_filtros_final)
        setFiltros({...mis_filtros_final});
        setFiltrosEstructura({...mis_filtros_final});
      } else {
        let props = [...propiedad.similares];
        props = props.filter(prop=>{
          let matches = true;
          for (const k_s in filtros){

            console.log("MATCH")
            console.log(filtros[k_s])
            console.log(prop[k_s])
            matches = matches && filtros[k_s].findIndex(f=>f===prop[k_s]) !== -1; //Revisar esto
          }
          return matches;
        })
        setSimilaresSeleccionadas(props);
      }     
    }, [propiedad,filtros]); // Ejecuta esto solo una vez al montar el componente
  ////FIN FETCH
  
  const list_filtros_nombres = [
    'ambientes',
    'dormitorios',
    'baños',
    'cochera',
    // metros: mis_filtros_limpios.metros,
    'AC',
    'balcon',
    'jardin',
    'parrilla',
    'pileta',
    'toilette',
  ];

  console.log('resultados')
  console.log(resultados)

  const handleSave = () => {
    window.alert("Propiedad guardada");
  }

  const handleVolver = () => {
    //window.alert("Vuelvo atras");
    btnsubmit();
  }
  
  const refreshPropsSeleccionadas = () => {
    let props = [...propiedad.similares];
    props = props.filter(prop=>{
      let matches = true;
      for (const k_s in filtros){

        console.log("MATCH")
        console.log(filtros[k_s])
        console.log(prop[k_s])
        matches = matches && filtros[k_s].findIndex(f=>f===prop[k_s]) !== -1; //Revisar esto
      }
      return matches;
    })
    setSimilaresSeleccionadas(props);
  }

  const toggleFiltro = (filtro, valor) => {
    console.log(filtro);
    console.log(valor);
    let nuevos_filtros = {...filtros};
    nuevos_filtros[filtro] = (
      filtros[filtro].filter(e=>e===valor).length ?
      filtros[filtro].filter(e=>e!==valor) :
      [...filtros[filtro], valor]
    );
    setFiltros(nuevos_filtros);
    //refreshPropsSeleccionadas(); // No espera al cambio, corregir
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

      
      <div className="space-from-header" style={...{width:'1000px', height: '1000px'}}>
        { (filtros && filtrosEstructura) &&//filtros.length &&
          <div className="flex-row">
            {
              list_filtros_nombres.map(f=>filtros[f] ? (<CheckBoxList {...{
                nombre: toSentenceCase(f),
                estados: filtrosEstructura[f],
                estados_seleccionados: filtros[f],
                fcambio: (e) => toggleFiltro(f,e),
                estaAbierto: filtroAbierto === f,
                seleccionarFiltro : () => setFiltroAbierto(filtroAbierto === f ? '' : f), 
              }}/>) : <></>)
            }
          </div>
        }
        {
          propiedad.id_propiedad &&
          <LeafletMap propiedad={{...propiedad, similares: similaresSeleccionadas} }/>
        }
      </div> 
    </div>
  );
}

export default Resultados;
