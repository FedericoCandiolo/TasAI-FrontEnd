"use client";

import { useState, React, useEffect } from "react";
import LeerMas from "./LeerMas";
// import RootLayout from "@/app/layout";

function Login({
  btnLogin,
  btnRegister,
  user,
  setUser,
  leermas,
  toggleLeerMas,
  btnOlvideContrasena,
  windowDialog,
}) {
  useEffect(() => {
    setUser({ origen: "login" });
  }, []);

  const handleLogIn = () => {
    window.alert("Iniciando sesión."); //// ACA CAMBIO A DIALOG
    //windowDialog('Iniciando sesión.');
    //console.log(user);
    btnLogin();
    //console.log(user);
  };

  const handleChange = (e) => {
    const newuser = { ...user };
    //console.log(e)
    newuser[e.target.id] = e.target.value;
    //newuser[e.target.getAttribute('id')] = e.target.value;
    setUser({ ...newuser });
    //console.log(user)
  };

  const handleRegister = () => {
    // window.alert("Register");
    btnRegister();
  };

  const handleOlvideContrasena = () => {
    btnOlvideContrasena();
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
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hola!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Bienvenido/a</p>
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
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name=""
              id="pwd"
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>
          <button
            //type="submit"
            className="block w-full bg-sky-800 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onClick={handleLogIn}
          >
            Iniciar Sesión
          </button>
          <button
            type="submit"
            className="block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
            onClick={handleRegister}
          >
            Registrarme
          </button>
          <p className="text-md text-center text-sky-500 hover:text-black-500 cursor-pointer">
            <span onClick={handleOlvideContrasena}>Olvidé mi contraseña</span>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
