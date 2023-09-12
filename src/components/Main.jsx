"use client";

import { useState, React } from "react";
import SingleForm from "./SingleForm";
import RootLayout from "@/app/layout";
import CargaDatos from "./CargaDatos";
import Resultados from "./Resultados";

export default function TestLogin() {
  const [pagepart, setPagepart] = useState("login");

  const handleRegister = () => {
    window.alert("doing");
    setPagepart("register");
  };

  const handleLogIn = () => {
    window.alert("Nuevo Componente");
    setPagepart("carga");
  };

  return (
    <>
      {pagepart === "login" ? (
        <div class="h-screen flex">
          <div class="flex w-3/4 bg-gradient-to-b from-teal-50 to-teal-800 i justify-around items-center">
            <div>
              <h1 class="text-white font-bold text-4xl font-sans">TasAI</h1>
              <p class="text-white mt-1"> El tasador del futuro</p>
              <button
                type="submit"
                class="block w-28 bg-white text-sky-800 mt-4 py-2 rounded-2xl font-bold mb-2"
              >
                Read More
              </button>
            </div>
          </div>
          <div class="flex w-1/4 justify-center items-center bg-gradient-to-b ">
            <form class="bg-white align-middle">
              <h1 class="text-gray-800 font-bold text-2xl mb-1">Hola!</h1>
              <p class="text-sm font-normal text-gray-600 mb-7">Bienvenido/a</p>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Dirección Email"
                />
              </div>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  class="pl-2 outline-none border-none"
                  type="password"
                  name=""
                  id=""
                  placeholder="Contraseña"
                />
              </div>
              <button
                type="submit"
                class="block w-full bg-sky-800 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                onClick={handleLogIn}
              >
                Iniciar Sesión
              </button>
              <button
                type="submit"
                class="block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
              >
                Registrarme
              </button>
              <p class="text-md text-center text-sky-500 hover:text-black-500 cursor-pointer">
                <span>Olvidé mi contraseña</span>
              </p>
            </form>
          </div>
        </div>
      ) : pagepart === "carga" ? (
        <CargaDatos {...{btnsubmit: ()=>setPagepart('resultados')}}/>
      ) : pagepart === "resultados" ? (
        <Resultados {...{resultados:{direccion: 'Av. de Mayo 866', ambientes: 3, banios: 1, toilletes: 0, cochera: false, parrilla: true, plantas: 1, m2cubiertos: 120, m2descubiertos: 80}}}/>
        
      ) : (
        <p>Not Found</p>
      )}
    </>
  );
}
