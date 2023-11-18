"use client";

import { useState, React, useEffect } from "react";
import ciudades from "./options/ciudades";
// import RootLayout from "@/app/layout";
import FieldTasacion from "./FieldTasacion";
import Tasacion from "./Tasacion"

function CargaDatos({ btnsubmit, btnCancelar, fields, setFields, user}) {
  const [data, setData] = useState(undefined);
  const [propiedades, setPropiedades] = useState([]);
  const [tasaciones, setTasaciones] = useState([]);
  const [buscoPropiedades, setBuscoPropiedades] = useState(false);
  const [buscoTasaciones, setBuscoTasaciones] = useState(false);
  const [estaCompleto,setEstaCompleto] = useState(false); 
  
  useEffect(()=>{
    if(fields){
      setFields({});
    }
    if(!buscoPropiedades) {

      const apiUrlProps = `http://localhost:8000/propiedades-de-usuario/${user.id_usuario}/`;
        
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      // Realizar una solicitud GET a la API utilizando fetch()
      fetch(apiUrlProps, requestOptions)
        .then((response) => response.json())
        .then((data) => {
        setData(data); // Actualizar el estado con los datos recibidos de la API
        //window.alert(data);
        console.log("PROPIEDADES");
        console.log(data);
        setPropiedades([...data.filter(p=>p.esta_guardado)])
        console.log(propiedades)
        })
      .then(data=>console.log(data))
      .catch((error) => {
          console.error('Error al obtener los datos:', error);
      });

      setBuscoPropiedades(true);

    } else if(!buscoTasaciones) {
      const apiUrlTasaciones = `http://localhost:8000/tasaciones-de-usuario/${user.id_usuario}/`;
        
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      // Realizar una solicitud GET a la API utilizando fetch()
      fetch(apiUrlTasaciones, requestOptions)
        .then((response) => response.json())
        .then((data) => {
        setData(data); // Actualizar el estado con los datos recibidos de la API
        //window.alert(data);
        console.log("TASACIONES");
        console.log(data);
        setTasaciones([
          ...data
          .filter(t=>t.esta_guardado)
          .map(e=>{return {...e, fecha: new Date(e.fecha_tasacion).toLocaleDateString("es-AR")}})
        ])
        console.log(tasaciones)
        })
      .then(data=>console.log(data))
      .catch((error) => {
          console.error('Error al obtener los datos:', error);
      });

      setBuscoTasaciones(true);
    }

  },[ propiedades, tasaciones ])

  const refrescarCompleto = () => {
    const campos = ['calle','numero','ciudad',"m2","ambientes","dormitorios","cocheras","banios"];
    setEstaCompleto(fields && campos.reduce((acc,el)=>acc && fields[el],true))
  }

  const handleField = (cod_item, val_item) => {
    const new_fields = fields;
    fields[cod_item] = val_item;
    setFields({
      ...new_fields,
    })
    refrescarCompleto();
  };

  const handleTasar = () => {
    window.alert("La propiedad será tasada.");
    //console.log('HANDLE TASAR')
    console.log(fields);
    btnsubmit();
  };


 

  return (
    <div className="flex items-centrer justify-center h-screen bg-gradient-to-b from-teal-50 to-teal-800">
      <div className="mt-20 row">
        <div className="bg-white rounded-2xl ml-2 h-fit padding-hor DivWithScroll tasaciones ">          
          <h2 className="text-base font-semibold leading-7 text-gray-900 ml-2 space-before no-margin-left margin-top">
            Propiedades guardadas
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 ml-2 space-below no-margin-left">
            Se presentan las propiedades guardadas con sus tasaciones.
          </p>
          {
            (propiedades && propiedades.length) ?
            (
               propiedades.map(prop=>
                <Tasacion {...{
                  prop, 
                  tasaciones: tasaciones.filter((tas)=>tas.id_propiedad === prop.id),
                  btnEliminar: () => setPropiedades([...propiedades.filter(p=>p.id!== prop.id)]),
                  setFields, 
                  btnsubmit
                }} />
              )
            ) : (
              <p>No hay propiedades guardadas. Tase una nueva propiedad y guárdela.</p>
            )
          }

        </div>
        <form className="bg-white rounded-2xl ml-2 h-fit padding-hor">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12 DivWithScroll paddingbottom0">
              <h2 className="text-base font-semibold leading-7 text-gray-900 ml-2 space-before">
                Nueva tasación
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 ml-2 space-below">
                Ingrese todos los datos de la propiedad a tasar.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-8 gridboxbottom gridboxup ml-2 mr-2 grid-gap">
                <FieldTasacion
                  {...{
                    fieldtype: "string",
                    classes: "sm:col-span-2 ml-2 mr-2 separacion-campos margin0",
                    cod: "calle",
                    labeltext: "Calle",
                    ph: "Calle",
                    tt: "Dirección en Ciudad de Buenos Aires",
                    maxlength: 80
                  }}
                  {...{valor: fields["calle"]}}{...{actualizarDato: (v)=>handleField("calle",v)}}
                  />

                <FieldTasacion
                  {...{
                    fieldtype: "string",
                    classes: "sm:col-span-2 ml-2 mr-2 separacion-campos margin0",
                    cod: "numero",
                    labeltext: "Nro.",
                    ph: "123",
                    tt: "Dirección en Ciudad de Buenos Aires",
                    maxlength: 7
                  }}
                  {...{valor: fields["numero"]}}{...{actualizarDato: (v)=>handleField("numero",v)}}
                  />

                <FieldTasacion
                  {...{
                    fieldtype: "options",
                    classes: "sm:col-span-2 ml-2 mr-2 separacion-campos margin0",
                    cod: "ciudad",
                    labeltext: "Barrio",
                    ph: "Calle 123, Ciudad",
                    tt: "Ciudad en Ciudad de Buenos Aires",
                    options: [...(ciudades.sort())/*,'OTRA'*/]
                  }}
                  {...{valor: fields["ciudad"]}}{...{actualizarDato: (v)=>handleField("ciudad",v)}}
                  />

                {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-8 ml-2 mr-2 grid-gap"> */}
                  {[
                    {
                      fieldtype: "number",
                      classes: "sm:col-span-2",
                      cod: "m2",
                      labeltext: "Metros Cuadrados",
                      ph: 0,
                      tt: "Cantidad de metros cuadrados",
                      min: 1,
                      max: 99999,
                    },
                    {
                      fieldtype: "number",
                      classes: "sm:col-span-2",
                      cod: "ambientes",
                      labeltext: "Ambientes",
                      ph: 0,
                      tt: "Cantidad de ambientes",
                      min: 1,
                      max: 20,
                    },
                    {
                      fieldtype: "number",
                      classes: "sm:col-span-2",
                      cod: "dormitorios",
                      labeltext: "Dormitorios",
                      ph: 0,
                      tt: "Cantidad de dormitorios",
                      min: 0,
                      max: 20,
                    },
                    {
                      fieldtype: "number",
                      classes: "sm:col-span-2",
                      cod: "cocheras",
                      labeltext: "Cocheras",
                      ph: 0,
                      tt: "Cantidad de cocheras",
                      min: 0,
                      max: 20,
                    },
                    {
                      fieldtype: "number",
                      classes: "sm:col-span-2",
                      cod: "banios",
                      labeltext: "Baños",
                      ph: 0,
                      tt: "Cantidad de baños",
                      min: 0,
                      max: 20,
                    },
                  ].map((e) => (
                    <FieldTasacion {...e} {...{valor: fields[e.cod]}}{...{actualizarDato: (v)=>handleField(e.cod,v)}} />
                  ))
                }
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-600 ml-2 space-below">
                Asigne las características de la propiedad que correspondan.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-8 gridboxup ml-2 mr-2 grid-gap">
              {
                [
                  {
                    fieldtype: "boolean",
                    classes: "sm:col-span-2",
                    cod: "toilette",
                    labeltext: "Toilette",
                    tt: "Tiene toilette (baño sin ducha)",
                  },
                  {
                    fieldtype: "boolean",
                    classes: "sm:col-span-2",
                    cod: "lavadero",
                    labeltext: "Lavadero",
                    tt: "Tiene lavadero",
                  },
                  {
                    fieldtype: "boolean",
                    classes: "sm:col-span-2",
                    cod: "ac",
                    labeltext: "A/C",
                    tt: "Tiene aire acondicionado",
                  },
                  {
                    fieldtype: "boolean",
                    classes: "sm:col-span-2",
                    cod: "balcon",
                    labeltext: "Balcón",
                    tt: "Tiene balcón",
                  },
                  {
                    fieldtype: "boolean",
                    classes: "sm:col-span-2",
                    cod: "parrilla",
                    labeltext: "Parrilla",
                    tt: "Tiene parrilla propia",
                  },
                  {
                    fieldtype: "boolean",
                    classes: "sm:col-span-2",
                    cod: "jardin",
                    labeltext: "Jardín",
                    tt: "Tiene jardín",
                  },
                  {
                    fieldtype: "boolean",
                    classes: "sm:col-span-2",
                    cod: "pileta",
                    labeltext: "Pileta",
                    tt: "Tiene pileta",
                  },
                ].map((e) => (
                  <FieldTasacion {...e} {...{valor: fields[e.cod]}}{...{actualizarDato: (v)=>handleField(e.cod,v)}} />
                )
                )
              }
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="mt-6 flex items-center justify-end gap-x-6 mr-2 mb-2">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={btnCancelar}
            >
              Cancelar
            </button>
            {
              estaCompleto
            ?
              <button
                type="submit"
                onClick={handleTasar}
                className="rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Tasar
              </button>
            :
              <button
                type="submit"
                disabled
                onClick={handleTasar}
                className="disabled rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Tasar
              </button>
            }
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default CargaDatos;
