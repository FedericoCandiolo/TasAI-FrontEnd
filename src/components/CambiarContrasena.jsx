"use client";
import { useState, React, useEffect } from "react";
import LeerMas from "./LeerMas";

export default function CambiarContrasena({
  btnCambiarContrasena,
  user,
  leermas,
  toggleLeerMas,
}) {
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState({
    pwdActual: "",
    pwdNueva: "",
    confirm_pwd: "",
  });

  useEffect(() => {
    //setNewPassword({ pwdActual: user.password });
    setPassword(user.pwd);
  }, []);

  // API Cambiar contraseña
  const cambiarContrasenaAPI = () => {
    const API_URL = `http://localhost:8000/cambiar-contraseña/${user.id_usuario}/`;
    const passwords = {
      contraseña_actual: newPassword.pwdActual,
      nueva_contraseña: newPassword.pwdNueva,
      confirmar_contraseña: newPassword.confirm_pwd,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwords),
    };

    fetch(API_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        window.alert("Contraseña cambiada con éxito");
        btnCambiarContrasena(newPassword.pwdActual);
      })
      .catch((error) => {
        //window.alert("error");
        window.alert("Contraseña incorrecta.")
        console.error("Error al obtener los datos:", error);
      });
  };

  const handleChange = (e) => {
    //console.log(e)
    newPassword[e.target.id] = e.target.value;
    //newuser[e.target.getAttribute('id')] = e.target.value;
    setNewPassword({ ...newPassword });
  };

  const handleCambioContrasena = (e) => {
    e.preventDefault();
    //console.log(user);

    if (newPassword.pwdNueva === newPassword.confirm_pwd ) {
      if (newPassword.pwdActual === user.pwd ) {
        cambiarContrasenaAPI();
        // btnCambiarContrasena();
      } else {
        window.alert("La contraseña actual no es correcta.");
      }
    } else {
      window.alert("La contraseña nueva y la confirmación no coinciden.");
    }
  };

  return (
    <>
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
              Cambio de contraseña
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Ingrese contraseña actual y la nueva contraseña
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
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
                id="pwdActual"
                placeholder="Contraseña actual"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
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
                id="pwdNueva"
                placeholder="Contraseña"
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
                id="confirm_pwd"
                placeholder="Confirmar Contraseña"
                onChange={handleChange}
              />
            </div>
            <button
              className="block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
              onClick={handleCambioContrasena}
            >
              Cambiar Contraseña
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
