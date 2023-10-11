"use client";

import { useState, React,useEffect } from "react";

function Register({ btnRegister,user, setUser  }) {
  useEffect(()=>{
    setUser({origen:'register'});
  },[])  

  const handleChange = (e) => {
    const newuser = {...user};
    //console.log(e)
    newuser[e.target.id] = e.target.value;
    //newuser[e.target.getAttribute('id')] = e.target.value;
    setUser({...newuser})
    console.log(user)
  }

  const handleRegister = () => {
    window.alert("Registrado");    
    console.log(user);
    if(user.pwd === user.confirm_pwd){
      btnRegister();
    }
    else{
      window.alert("Las contraseñas no coinciden.");
    }
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
              id="username"
              placeholder="Nombre de Usuario"
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
              id="pwd"
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
