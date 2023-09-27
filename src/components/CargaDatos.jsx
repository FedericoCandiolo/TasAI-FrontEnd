"use client";

import { useState, React } from "react";
import SingleForm from "./SingleForm";
// import RootLayout from "@/app/layout";
import FieldTasacion from "./FieldTasacion";

function CargaDatos({ btnsubmit , fields, setFields}) {
  const [pagepart, setPagePart] = useState("nuevaTasacion");
  const [mensaje, setMensaje] = useState("");
  

  const handleField = (cod_item, val_item) => {
    const new_fields = fields;
    fields[cod_item] = val_item;
    setFields({
      ...new_fields,
    })
  };

  const handleTasar = () => {
    window.alert("La propiedad será tasada.");
    console.log(fields);
    btnsubmit();
  };

 

  return (
    <div className="flex items-centrer justify-center h-screen bg-gradient-to-b from-teal-50 to-teal-800">
      <form className="bg-white rounded-2xl ml-2 h-fit mt-20">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 DivWithScroll">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-2">
              Nueva tasación
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 ml-2">
              Ingrese los datos de la propiedad a tasar
            </p>

            <FieldTasacion
              {...{
                fieldtype: "string",
                classes: "sm:col-span-4 ml-2 mr-2 ",
                cod: "direccion",
                labeltext: "Dirección",
                ph: "Calle 123, Ciudad",
                tt: "Ingrese una dirección en Argentina",
              }}
            />

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ml-2 mr-2">
              {[
                {
                  fieldtype: "number",
                  classes: "sm:col-span-3",
                  cod: "m2cubiertos",
                  labeltext: "Metros Cubiertos",
                  ph: 0,
                  tt: "Cantidad de metros cubiertos",
                },
                {
                  fieldtype: "number",
                  classes: "sm:col-span-3",
                  cod: "m2descubiertos",
                  labeltext: "Metros Descubiertos",
                  ph: 1,
                  tt: "Cantidad de metros descubiertos",
                },
                {
                  fieldtype: "number",
                  classes: "sm:col-span-3",
                  cod: "ambientes",
                  labeltext: "Ambientes",
                  ph: 0,
                  tt: "Cantidad de ambientes",
                },
                {
                  fieldtype: "number",
                  classes: "sm:col-span-3",
                  cod: "plantas",
                  labeltext: "Plantas",
                  ph: 0,
                  tt: "Cantidad de plantas",
                },
                {
                  fieldtype: "number",
                  classes: "sm:col-span-3",
                  cod: "banios",
                  labeltext: "Baños",
                  ph: 0,
                  tt: "Cantidad de baños",
                },
                {
                  fieldtype: "number",
                  classes: "sm:col-span-3",
                  cod: "toilettes",
                  labeltext: "Toilettes",
                  ph: 0,
                  tt: "Cantidad de toilettes",
                },
                {
                  fieldtype: "boolean",
                  classes: "sm:col-span-3",
                  cod: "parrilla",
                  labeltext: "Parrilla",
                  tt: "Tiene parrilla propia",
                },
                {
                  fieldtype: "boolean",
                  classes: "sm:col-span-3",
                  cod: "cochera",
                  labeltext: "Cochera",
                  tt: "Tiene cochera propia",
                },
              ].map((e) => (
                <FieldTasacion {...e} {...{valor: fields[e.cod]}}{...{actualizarDato: (v)=>handleField(e.cod,v)}} />
              )
              )}
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex items-center justify-end gap-x-6 mr-2 mb-2">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleTasar}
            className="rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Tasar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CargaDatos;
