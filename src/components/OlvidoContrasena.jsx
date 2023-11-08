"use client";

import { useState } from "react";
import LeerMas from "./LeerMas";

export default function OlvidoContrasena({
  btnRecuperarContrasena,
  leermas,
  toggleLeerMas,
}) {
  const [userName, setUserName] = useState();
  const [data, setData] = useState();

  const recuperarContrasenaAPI = () => {
    const API_URL = `http://localhost:8000/contraseña-mail/${userName.username}/`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch(API_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        //window.alert(data);
        window.alert("Se ha enviado la nueva contraseña al correo asociado.")
      })
      .catch((error) => {
        //window.alert("error");
        console.error("Error al obtener los datos:", error);
      });
  };
  const handleChange = (e) => {
    const userName = {};
    //console.log(e)
    userName[e.target.id] = e.target.value;
    //newuser[e.target.getAttribute('id')] = e.target.value;
    setUserName({ ...userName });
    console.log(userName);
  };

  const handleRecuperarContrasena = (e) => {
    e.preventDefault();
    recuperarContrasenaAPI();
    //window.alert(data);
    btnRecuperarContrasena();
  };

  const handleVolver = (e) => {
    e.preventDefault();
    btnRecuperarContrasena();
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-3/4 bg-gradient-to-b from-teal-50 to-teal-800 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">TasAI</h1>
          <p className="text-white mt-1"> El tasador del futuro</p>
          {leermas && <LeerMas />}
          <button
            //type="submit"
            className="block w-28 bg-white text-sky-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            onClick={toggleLeerMas}
          >
            {leermas ? "Leer Menos" : "Leer Más"}
          </button>
        </div>
      </div>
      <div className="flex w-1/4 justify-center items-center bg-gradient-to-b ">
        <form className="bg-white align-middle">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Recuperar contraseña
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Ingrese el usuario
          </p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 fill-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id="username"
              placeholder="Nombre de usuario"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-sky-800 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onClick={handleRecuperarContrasena}
          >
            Recuperar Contraseña
          </button>
          <button
            type="submit"
            className="block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
            onClick={handleVolver}
          >
            Volver a Inicio Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
