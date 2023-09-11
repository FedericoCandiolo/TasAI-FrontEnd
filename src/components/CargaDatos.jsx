"use client";

import { useState, React } from "react";
import SingleForm from "./SingleForm";
// import RootLayout from "@/app/layout";
import FieldTasacion from './FieldTasacion';

function CargaDatos() {
  const [pagepart, setPagePart] = useState("nuevaTasacion");
  const [mensaje, setMensaje] = useState("");

  const pages_structure = {
    nuevaTasacion: {
      title: "Nueva Tasación",
      fields: [
        { fieldtype: "string", field: "direccion", ph: "calle falsa 123", tt: "Ingrese la dirección del inmueble" },
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

  const handleClick = () => {
    setMensaje("Propiedad Tasada");
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
            
            <FieldTasacion {...{fieldtype: 'string', classes: 'sm:col-span-4 ml-2 mr-2 ', cod: 'direccion',labeltext: 'Dirección',ph: 'Calle 123, Ciudad',tt:'Ingrese una dirección en Argentina'}} />

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ml-2 mr-2">
              {
                [
                  {fieldtype: 'number', classes:'sm:col-span-3', cod: 'm2cubiertos',labeltext: 'Metros Cubiertos',ph: 0},
                  {fieldtype: 'number', classes:'sm:col-span-3', cod: 'm2descubiertos',labeltext: 'Metros Descubiertos',ph: 0},
                  {fieldtype: 'number', classes:'sm:col-span-3', cod: 'banios',labeltext: 'Baños',ph: 0},
                  {fieldtype: 'number', classes:'sm:col-span-3', cod: 'toilettes',labeltext: 'Toilettes',ph: 0},
                  {fieldtype: 'number', classes:'sm:col-span-3', cod: 'ambientes',labeltext: 'Ambientes',ph: 0},
                  {fieldtype: 'number', classes:'sm:col-span-3', cod: 'plantas',labeltext: 'Plantas',ph: 0},
                  {fieldtype: 'boolean', classes:'sm:col-span-3', cod: 'parrilla',labeltext: 'Parrilla', tt: 'Tiene parrilla propia'},
                  {fieldtype: 'boolean', classes:'sm:col-span-3', cod: 'cochera',labeltext: 'Cochera', tt: 'Tiene cochera propia'},
                ].map(e=><FieldTasacion {...e}/>)
              }
              {/* <div class="sm:col-span-3">
                <label
                  for="m2cubiertos"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Metros Cubiertos
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="m2cubiertos"
                    id="m2cubiertos"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="m2descubiertos"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Metros descubiertos
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="m2descubiertos"
                    id="m2descubiertos"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="banios"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Baños
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="banios"
                    id="banios"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="toilettes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Toilettes
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="toilettes"
                    id="toilettes"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="ambientes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cantidad de Ambientes
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="ambientes"
                    id="ambientes"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="plantas"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cantidad de Plantas
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="plantas"
                    id="plantas"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}
              {/* debatible*/}
              {/* <div class="sm:col-span-3">
                <div>
                  <label
                    for="plantas"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Parrilla
                  </label>
                </div>
                <label class="relative inline-flex cursor-pointer items-center">
                  <input id="switch-3" type="checkbox" class="peer sr-only" />
                  <label for="switch-3 hidden"></label>
                  <div class="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-800 peer-checked:after:translate-x-full peer-focus:ring-sky-800"></div>
                </label>
              </div>
              <div class="sm:col-span-3">
                <div>
                  <label
                    for="cochera"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cochera
                  </label>
                </div>
                <label class="relative inline-flex cursor-pointer items-center">
                  <input id="switch-3" type="checkbox" class="peer sr-only" />
                  <label for="switch-3 hidden"></label>
                  <div class="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-800 peer-checked:after:translate-x-full peer-focus:ring-sky-800"></div>
                </label>
              </div> */}
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
