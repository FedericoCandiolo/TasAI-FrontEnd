"use client";

import { useState, React } from "react";
import SingleForm from "./SingleForm";
// import RootLayout from "@/app/layout";
import FieldTasacion from "./FieldTasacion";

function CargaDatos({ btnsubmit }) {
  const [pagepart, setPagePart] = useState("nuevaTasacion");
  const [mensaje, setMensaje] = useState("");

  const handleTasar = () => {
    window.alert("La propiedad será tasada.");
    btnsubmit();
  };

  const pages_structure = {
    nuevaTasacion: {
      title: "Nueva Tasación",
      fields: [
        {
          fieldtype: "string",
          field: "direccion",
          ph: "calle falsa 123",
          tt: "Ingrese la dirección del inmueble",
        },
        { fieldtype: "string", field: "m2Cubiertos", ph: "10" },
        { fieldtype: "string", field: "m2Descubiertos", ph: "5" },
        { fieldtype: "string", field: "ambientes", ph: "1" },
        { fieldtype: "string", field: "banios", ph: "1" },
        { fieldtype: "string", field: "parrilla", ph: "No" },
        { fieldtype: "string", field: "cochera", ph: "No" },
        { fieldtype: "string", field: "cantPlantas", ph: "1" },
        { fieldtype: "string", field: "toilettes", ph: "0" },
      ],
    },
  };

  return (
    <div class="flex items-centrer justify-center h-screen bg-gradient-to-b from-teal-50 to-teal-800">
      <form class="bg-white rounded-2xl ml-2 h-fit mt-20">
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12 DivWithScroll">
            <h2 class="text-base font-semibold leading-7 text-gray-900 ml-2">
              Nueva tasación
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600 ml-2">
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

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ml-2 mr-2">
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
                  ph: 0,
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
                <FieldTasacion {...e} />
              ))}
            </div>
          </div>
        </div>

        {/* Botones */}
        <div class="mt-6 flex items-center justify-end gap-x-6 mr-2 mb-2">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleTasar}
            class="rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Tasar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CargaDatos;
