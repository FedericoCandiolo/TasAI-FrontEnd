"use client";

import { useState, React } from "react";

function Register({ btnRegister }) {

  //CARGA REGISTER
  /* const [data, setData] = useState([]);

  useEffect(() => {
  // URL de la API que deseas consultar
  const apiUrl = "http://localhost:8000/registro/";
  
  const body = { //Modificar proceso carga para que corresponda 1 a 1
    username,
    email,
    password,
      calle: propiedad.direccion,
      numero: propiedad.direccion.match(/(\d+)/)[0],
      habitaciones: propiedad.ambientes,
      baños: propiedad.banios,
      toilets: propiedad.toilletes,
      dormitorios: propiedad.ambientes,
      pisos: propiedad.plantas,
      pileta: true,
      parrilla: propiedad.parrilla || false,
      jardin: true,
      //latitud: "20", //desconocida
      //longitud: "20",
      id_usuario: 1,
    };
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

  // Realizar una solicitud GET a la API utilizando fetch()
  fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
      setData(data); // Actualizar el estado con los datos recibidos de la API
      window.alert(data);
      console.log(data);
      setUser({...data})
      })
      .catch((error) => {
          console.error('Error al obtener los datos:', error);
      });
  }, []); // Ejecuta esto solo una vez al montar el componente
  ////FIN FETCH */

  const handleRegister = () => {
    window.alert("Registrado");
    btnRegister();
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-3/4 bg-gradient-to-b from-teal-50 to-teal-800 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">TasAI</h1>
          <p className="text-white mt-1"> El tasador del futuro</p>
          <button
            type="submit"
            className="block w-28 bg-white text-sky-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
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
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id=""
              placeholder="Dirección Email"
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
              id=""
              placeholder="Contraseña"
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
              id=""
              placeholder="Confirmar Contraseña"
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
            onClick={handleRegister}
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
