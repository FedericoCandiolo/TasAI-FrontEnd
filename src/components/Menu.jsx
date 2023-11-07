"use-client";
import { React, useState, useEffect } from "react";

function Menu({ setPagepart, user, setUser }) {
  const [data, setData] = useState([]);
  if (user.origen === "login") {
    useEffect(() => {
      // URL de la API que deseas consultar

      const apiUrl = "http://localhost:8000/inicio-sesion/";

      const property = {
        //Modificar proceso carga para que corresponda 1 a 1
        username: user.username,
        password: user.pwd,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      };

      //window.alert('por fetch')
      console.log(JSON.stringify(property));
      //Realizar una solicitud GET a la API utilizando fetch() //ERROR CORS
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.non_field_errors) {
            window.alert(data.non_field_errors[0]);
            setPagepart("login");
          } else {
            setData(data); // Actualizar el estado con los datos recibidos de la API
            //window.alert(data);
            //console.log(data);
            setUser({
              ...user,
              status: "ok",
              id_usuario: data.id_usuario,
              id_plan: data.id_plan,
            });
            console.log(user);
          }
        })
        .catch((error) => {
          window.alert("error");
          console.error("Error al obtener los datos:", error);
        });
    }, []); // Ejecuta esto solo una vez al montar el componente
    ////FIN FETCH
  } else if (user.origen === "register") {
    useEffect(() => {
      const apiUrl = "http://localhost:8000/registro/";

      const property = {
        //Modificar proceso carga para que corresponda 1 a 1
        username: user.username,
        email: user.email,
        password: user.pwd,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      };

      //window.alert('por fetch')
      console.log(JSON.stringify(property));
      //Realizar una solicitud GET a la API utilizando fetch() //ERROR CORS
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.non_field_errors) {
            window.alert(data.non_field_errors[0]);
            setPagepart("register");
          } else {
            setData(data); // Actualizar el estado con los datos recibidos de la API
            //window.alert(data);
            //console.log(data);
            setUser({
              ...user,
              status: "ok",
              id_usuario: data.user_id,
              id_plan: 1,
            }); /// EL id_plan default es 1
            console.log(user);
          }
        })
        .catch((error) => {
          window.alert("error");
          console.error("Error al obtener los datos:", error);
        });
    }, []); // Ejecuta esto solo una vez al montar el componente
    ////FIN FETCH
  } else setPagepart("login");

  return (
    <div className="fondocaece">
      <div className=" stickleft">
        {/* <div className='centerinpage stickleft'> */}
        {user.id_usuario ? (
          <>
            <button
              type="submit"
              className="buttonspace block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
              onClick={() => setPagepart("carga")}
            >
              Tasar nueva propiedad
            </button>
            <button
              type="submit"
              className="buttonspace block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
              onClick={() => setPagepart("login")}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Menu;
